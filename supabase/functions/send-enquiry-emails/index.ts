import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import {
  buildCustomerConfirmationEmail,
  buildInternalNotificationEmail,
  type LeadEnquiryRecord,
} from "../_shared/enquiry-email.ts";

type InsertWebhookPayload = {
  type: "INSERT";
  table: string;
  schema: string;
  record: LeadEnquiryRecord | null;
  old_record: null;
};

const RESEND_API_URL = "https://api.resend.com/emails";

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function readOptionalEnv(name: string): string | null {
  return Deno.env.get(name)?.trim() || null;
}

function readRequiredEnv(name: string): string {
  const value = readOptionalEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSupabaseAdminHeaders() {
  const serviceRoleKey =
    readOptionalEnv("SUPABASE_SERVICE_ROLE_KEY") ??
    readOptionalEnv("SUPABASE_SECRET_KEY");

  if (!serviceRoleKey) {
    return null;
  }

  const headers = new Headers({
    apikey: serviceRoleKey,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  });

  if (!serviceRoleKey.startsWith("sb_secret_")) {
    headers.set("Authorization", `Bearer ${serviceRoleKey}`);
  }

  return headers;
}

async function updateLeadDeliveryState(
  leadId: string,
  patch: Record<string, unknown>,
) {
  const supabaseUrl = readOptionalEnv("SUPABASE_URL");
  const headers = getSupabaseAdminHeaders();

  if (!supabaseUrl || !headers) {
    console.warn(
      "Skipping lead delivery state update because Supabase admin credentials are not available inside the Edge Function.",
      { leadId, patchKeys: Object.keys(patch) },
    );
    return;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/lead_enquiries?id=eq.${encodeURIComponent(leadId)}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(patch),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to update lead delivery state (${response.status}): ${errorBody}`,
    );
  }
}

async function sendResendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    subject: string;
    html: string;
    text: string;
  },
) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Resend email send failed (${response.status}): ${errorBody}`,
    );
  }

  return response.json();
}

function validateWebhookSecret(request: Request) {
  const configuredSecret = readOptionalEnv("ENQUIRY_WEBHOOK_SECRET");

  if (!configuredSecret) {
    return;
  }

  const receivedSecret = request.headers.get("x-km-webhook-secret");

  if (receivedSecret !== configuredSecret) {
    throw new Error("Invalid webhook secret.");
  }
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") {
    return jsonResponse(405, {
      success: false,
      message: "Method not allowed.",
    });
  }

  let payload: InsertWebhookPayload | null = null;

  try {
    validateWebhookSecret(request);

    payload = (await request.json()) as InsertWebhookPayload;

    if (
      payload.type !== "INSERT" ||
      payload.schema !== "public" ||
      payload.table !== "lead_enquiries" ||
      !payload.record
    ) {
      return jsonResponse(202, {
        success: true,
        message: "Webhook payload ignored.",
      });
    }

    const enquiry = payload.record;

    if (
      enquiry.notification_email_sent_at &&
      enquiry.customer_confirmation_sent_at
    ) {
      return jsonResponse(200, {
        success: true,
        message: "Emails were already sent for this enquiry.",
      });
    }

    const resendApiKey = readRequiredEnv("RESEND_API_KEY");
    const resendFromEmail = readRequiredEnv("RESEND_FROM_EMAIL");
    const notificationEmail = readRequiredEnv(
      "KM_FINANCING_NOTIFICATION_EMAIL",
    );
    const submittedAt = enquiry.created_at || new Date().toISOString();
    const deliveredAt = new Date().toISOString();

    const internalEmail = buildInternalNotificationEmail(
      enquiry,
      submittedAt,
    );
    await sendResendEmail(resendApiKey, {
      from: resendFromEmail,
      to: [notificationEmail],
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
    });

    const customerEmail = buildCustomerConfirmationEmail(enquiry);
    await sendResendEmail(resendApiKey, {
      from: resendFromEmail,
      to: [enquiry.email],
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });

    await updateLeadDeliveryState(enquiry.id, {
      notification_email_sent_at: deliveredAt,
      customer_confirmation_sent_at: deliveredAt,
      email_delivery_error: null,
    });

    return jsonResponse(200, {
      success: true,
      message: "Enquiry emails sent successfully.",
      leadId: enquiry.id,
    });
  } catch (error) {
    console.error("Supabase enquiry email webhook failed.", error);

    try {
      const leadId = payload.record?.id;

      if (leadId) {
        await updateLeadDeliveryState(leadId, {
          email_delivery_error:
            error instanceof Error ? error.message : "Unknown email error",
        });
      }
    } catch (stateError) {
      console.error("Failed to persist enquiry email error state.", stateError);
    }

    return jsonResponse(500, {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unexpected enquiry email delivery error.",
    });
  }
});
