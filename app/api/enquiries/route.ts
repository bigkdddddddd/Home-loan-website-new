import { NextResponse } from "next/server";

import {
  leadEnquirySchema,
  type LeadEnquiryInput,
} from "../../../lib/enquiry-schema";
import { getServerEnv, type ServerEnv } from "../../../lib/env";
import { getResend } from "../../../lib/resend";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const SUCCESS_MESSAGE =
  "Thanks for contacting KM Financing. We've received your enquiry and will be in touch shortly.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || "there";
}

function formatCurrency(value?: number): string {
  if (typeof value !== "number") {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return headers.get("x-real-ip");
}

function buildInternalNotificationEmail(
  enquiry: LeadEnquiryInput,
  submittedAt: string,
) {
  const safeMessage = enquiry.message
    ? escapeHtml(enquiry.message).replace(/\n/g, "<br />")
    : "Not provided";

  return {
    subject: `New KM Financing Enquiry: ${enquiry.enquiryType}`,
    html: `
      <div>
        <h1>New KM Financing Enquiry</h1>
        <p><strong>Full name:</strong> ${escapeHtml(enquiry.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
        <p><strong>Enquiry type:</strong> ${escapeHtml(enquiry.enquiryType)}</p>
        <p><strong>Estimated loan amount:</strong> ${escapeHtml(formatCurrency(enquiry.estimatedLoanAmount))}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
        <p><strong>Form name:</strong> ${escapeHtml(enquiry.formName)}</p>
        <p><strong>Source page:</strong> ${escapeHtml(enquiry.sourcePage)}</p>
        <p><strong>UTM source:</strong> ${escapeHtml(enquiry.utmSource ?? "Not provided")}</p>
        <p><strong>UTM medium:</strong> ${escapeHtml(enquiry.utmMedium ?? "Not provided")}</p>
        <p><strong>UTM campaign:</strong> ${escapeHtml(enquiry.utmCampaign ?? "Not provided")}</p>
        <p><strong>Date/time submitted:</strong> ${escapeHtml(submittedAt)}</p>
      </div>
    `,
    text: [
      "New KM Financing Enquiry",
      `Full name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Enquiry type: ${enquiry.enquiryType}`,
      `Estimated loan amount: ${formatCurrency(enquiry.estimatedLoanAmount)}`,
      `Message: ${enquiry.message ?? "Not provided"}`,
      `Form name: ${enquiry.formName}`,
      `Source page: ${enquiry.sourcePage}`,
      `UTM source: ${enquiry.utmSource ?? "Not provided"}`,
      `UTM medium: ${enquiry.utmMedium ?? "Not provided"}`,
      `UTM campaign: ${enquiry.utmCampaign ?? "Not provided"}`,
      `Date/time submitted: ${submittedAt}`,
    ].join("\n"),
  };
}

function buildCustomerConfirmationEmail(enquiry: LeadEnquiryInput) {
  const firstName = getFirstName(enquiry.fullName);

  return {
    subject: "Thanks for contacting KM Financing",
    html: `
      <div>
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Thanks for reaching out to KM Financing. We've received your enquiry and will be in touch shortly.</p>
        <p><strong>Your enquiry type:</strong> ${escapeHtml(enquiry.enquiryType)}</p>
        <p>Kind regards,<br />KM Financing</p>
      </div>
    `,
    text: [
      `Hi ${firstName},`,
      "",
      "Thanks for reaching out to KM Financing. We've received your enquiry and will be in touch shortly.",
      `Your enquiry type: ${enquiry.enquiryType}`,
      "",
      "Kind regards,",
      "KM Financing",
    ].join("\n"),
  };
}

async function sendInternalNotificationEmail(
  enquiry: LeadEnquiryInput,
  submittedAt: string,
  serverEnv: ServerEnv,
) {
  const email = buildInternalNotificationEmail(enquiry, submittedAt);
  const { error } = await getResend().emails.send({
    from: serverEnv.resendFromEmail,
    to: [serverEnv.kmFinancingNotificationEmail],
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendCustomerConfirmationEmail(
  enquiry: LeadEnquiryInput,
  serverEnv: ServerEnv,
) {
  const email = buildCustomerConfirmationEmail(enquiry);
  const { error } = await getResend().emails.send({
    from: serverEnv.resendFromEmail,
    to: [enquiry.email],
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  try {
    let requestBody: unknown;

    try {
      requestBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const parsedEnquiry = leadEnquirySchema.safeParse(requestBody);

    if (!parsedEnquiry.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form details and try again.",
          errors: parsedEnquiry.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const enquiry = parsedEnquiry.data;

    // Do not signal to bots that the honeypot was triggered.
    if (enquiry.website) {
      return NextResponse.json({
        success: true,
        message: SUCCESS_MESSAGE,
      });
    }

    const serverEnv = getServerEnv();
    const supabaseAdmin = getSupabaseAdmin();
    const submittedAt = new Date().toISOString();
    const { data: insertedLead, error: insertError } = await supabaseAdmin
      .from("lead_enquiries")
      .insert({
        full_name: enquiry.fullName,
        email: enquiry.email,
        phone: enquiry.phone,
        enquiry_type: enquiry.enquiryType,
        estimated_loan_amount: enquiry.estimatedLoanAmount ?? null,
        message: enquiry.message ?? null,
        consent: enquiry.consent,
        source_page: enquiry.sourcePage,
        form_name: enquiry.formName,
        utm_source: enquiry.utmSource ?? null,
        utm_medium: enquiry.utmMedium ?? null,
        utm_campaign: enquiry.utmCampaign ?? null,
        status: "new",
        user_agent: request.headers.get("user-agent"),
        ip_address: getClientIp(request.headers),
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to insert lead enquiry into Supabase.", insertError);

      return NextResponse.json(
        {
          success: false,
          message:
            "We couldn't submit your enquiry right now. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    try {
      await sendInternalNotificationEmail(enquiry, submittedAt, serverEnv);
    } catch (error) {
      console.error("Failed to send internal enquiry notification.", {
        leadId: insertedLead?.id ?? null,
        error,
      });
    }

    try {
      await sendCustomerConfirmationEmail(enquiry, serverEnv);
    } catch (error) {
      console.error("Failed to send customer confirmation email.", {
        leadId: insertedLead?.id ?? null,
        error,
      });
    }

    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error("Unexpected enquiry submission error.", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your enquiry right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
