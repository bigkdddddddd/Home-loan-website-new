import "server-only";

import { Resend } from "resend";

import { getServerEnv } from "./env";

let cachedResend: Resend | null = null;

export function getResend() {
  if (cachedResend) {
    return cachedResend;
  }

  cachedResend = new Resend(getServerEnv().resendApiKey);
  return cachedResend;
}
