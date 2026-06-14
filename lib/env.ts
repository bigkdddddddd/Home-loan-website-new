import "server-only";

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const serverEnv = Object.freeze({
  supabaseUrl: readRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseServiceRoleKey: readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  resendApiKey: readRequiredEnv("RESEND_API_KEY"),
  resendFromEmail: readRequiredEnv("RESEND_FROM_EMAIL"),
  kmFinancingNotificationEmail: readRequiredEnv(
    "KM_FINANCING_NOTIFICATION_EMAIL",
  ),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || null,
});
