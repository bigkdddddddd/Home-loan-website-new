import "server-only";

import { Resend } from "resend";

import { serverEnv } from "./env";

export const resend = new Resend(serverEnv.resendApiKey);
