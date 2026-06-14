import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import { getServerEnv } from "./env";
import type { Database } from "./supabase.types";

let cachedSupabaseAdmin: SupabaseClient<Database> | null = null;

// This client must stay on the server because it uses the service role key.
export function getSupabaseAdmin() {
  if (cachedSupabaseAdmin) {
    return cachedSupabaseAdmin;
  }

  const serverEnv = getServerEnv();

  cachedSupabaseAdmin = createClient<Database>(
    serverEnv.supabaseUrl,
    serverEnv.supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return cachedSupabaseAdmin;
}
