import "server-only";

import { Resend } from "resend";

let cachedResend: Resend | null = null;

export function getResend(apiKey: string) {
  if (cachedResend) {
    return cachedResend;
  }

  cachedResend = new Resend(apiKey);
  return cachedResend;
}
