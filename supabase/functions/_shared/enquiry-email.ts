export type LeadEnquiryRecord = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  estimated_loan_amount: number | null;
  message: string | null;
  consent: boolean;
  source_page: string | null;
  form_name: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
  user_agent: string | null;
  ip_address: string | null;
  notification_email_sent_at?: string | null;
  customer_confirmation_sent_at?: string | null;
  email_delivery_error?: string | null;
};

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

function formatCurrency(value?: number | null): string {
  if (typeof value !== "number") {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildInternalNotificationEmail(
  enquiry: LeadEnquiryRecord,
  submittedAt: string,
) {
  const safeMessage = enquiry.message
    ? escapeHtml(enquiry.message).replace(/\n/g, "<br />")
    : "Not provided";

  return {
    subject: `New KM Financing Enquiry: ${enquiry.enquiry_type}`,
    html: `
      <div>
        <h1>New KM Financing Enquiry</h1>
        <p><strong>Full name:</strong> ${escapeHtml(enquiry.full_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
        <p><strong>Enquiry type:</strong> ${escapeHtml(enquiry.enquiry_type)}</p>
        <p><strong>Estimated loan amount:</strong> ${escapeHtml(formatCurrency(enquiry.estimated_loan_amount))}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
        <p><strong>Form name:</strong> ${escapeHtml(enquiry.form_name ?? "Not provided")}</p>
        <p><strong>Source page:</strong> ${escapeHtml(enquiry.source_page ?? "Not provided")}</p>
        <p><strong>UTM source:</strong> ${escapeHtml(enquiry.utm_source ?? "Not provided")}</p>
        <p><strong>UTM medium:</strong> ${escapeHtml(enquiry.utm_medium ?? "Not provided")}</p>
        <p><strong>UTM campaign:</strong> ${escapeHtml(enquiry.utm_campaign ?? "Not provided")}</p>
        <p><strong>Date/time submitted:</strong> ${escapeHtml(submittedAt)}</p>
      </div>
    `,
    text: [
      "New KM Financing Enquiry",
      `Full name: ${enquiry.full_name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Enquiry type: ${enquiry.enquiry_type}`,
      `Estimated loan amount: ${formatCurrency(enquiry.estimated_loan_amount)}`,
      `Message: ${enquiry.message ?? "Not provided"}`,
      `Form name: ${enquiry.form_name ?? "Not provided"}`,
      `Source page: ${enquiry.source_page ?? "Not provided"}`,
      `UTM source: ${enquiry.utm_source ?? "Not provided"}`,
      `UTM medium: ${enquiry.utm_medium ?? "Not provided"}`,
      `UTM campaign: ${enquiry.utm_campaign ?? "Not provided"}`,
      `Date/time submitted: ${submittedAt}`,
    ].join("\n"),
  };
}

export function buildCustomerConfirmationEmail(enquiry: LeadEnquiryRecord) {
  const firstName = getFirstName(enquiry.full_name);

  return {
    subject: "Thanks for contacting KM Financing",
    html: `
      <div>
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Thanks for reaching out to KM Financing. We've received your enquiry and will be in touch shortly.</p>
        <p><strong>Your enquiry type:</strong> ${escapeHtml(enquiry.enquiry_type)}</p>
        <p>Kind regards,<br />KM Financing</p>
      </div>
    `,
    text: [
      `Hi ${firstName},`,
      "",
      "Thanks for reaching out to KM Financing. We've received your enquiry and will be in touch shortly.",
      `Your enquiry type: ${enquiry.enquiry_type}`,
      "",
      "Kind regards,",
      "KM Financing",
    ].join("\n"),
  };
}
