import "server-only";

export type SupabaseEnv = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
};

export type EmailEnv = {
  resendApiKey: string;
  resendFromEmail: string;
  kmFinancingNotificationEmail: string;
};

export type ServerEnv = SupabaseEnv & {
  siteUrl: string | null;
};

let cachedServerEnv: ServerEnv | null = null;
let cachedEmailEnv: EmailEnv | null | undefined;

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function readOptionalEnv(name: string): string | null {
  return process.env[name]?.trim() || null;
}

function readSupabaseUrl(): string {
  const publicUrl = readOptionalEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serverUrl = readOptionalEnv("SUPABASE_URL");

  if (publicUrl) {
    return publicUrl;
  }

  if (serverUrl) {
    return serverUrl;
  }

  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL",
  );
}

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  cachedServerEnv = Object.freeze({
    supabaseUrl: readSupabaseUrl(),
    supabaseServiceRoleKey: readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || null,
  });

  return cachedServerEnv;
}

export function getEmailEnv(): EmailEnv | null {
  if (cachedEmailEnv !== undefined) {
    return cachedEmailEnv;
  }

  const resendApiKey = readOptionalEnv("RESEND_API_KEY");
  const resendFromEmail = readOptionalEnv("RESEND_FROM_EMAIL");
  const kmFinancingNotificationEmail = readOptionalEnv(
    "KM_FINANCING_NOTIFICATION_EMAIL",
  );

  if (
    !resendApiKey &&
    !resendFromEmail &&
    !kmFinancingNotificationEmail
  ) {
    cachedEmailEnv = null;
    return cachedEmailEnv;
  }

  if (
    !resendApiKey ||
    !resendFromEmail ||
    !kmFinancingNotificationEmail
  ) {
    const missingVariables = [
      !resendApiKey ? "RESEND_API_KEY" : null,
      !resendFromEmail ? "RESEND_FROM_EMAIL" : null,
      !kmFinancingNotificationEmail ? "KM_FINANCING_NOTIFICATION_EMAIL" : null,
    ].filter(Boolean);

    console.warn(
      "Resend email configuration is incomplete. Lead enquiries will still be stored, but email sending is disabled until all variables are set.",
      { missingVariables },
    );

    cachedEmailEnv = null;
    return cachedEmailEnv;
  }

  cachedEmailEnv = Object.freeze({
    resendApiKey,
    resendFromEmail,
    kmFinancingNotificationEmail,
  });

  return cachedEmailEnv;
}
