import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getServerEnv } from "./env";

let cachedSupabaseAdmin:
  | ReturnType<typeof createClient>
  | null = null;

// This client must stay on the server because it uses the service role key.
export function getSupabaseAdmin() {
  if (cachedSupabaseAdmin) {
    return cachedSupabaseAdmin;
  }

  const serverEnv = getServerEnv();

  cachedSupabaseAdmin = createClient(
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
