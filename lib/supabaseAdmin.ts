import "server-only";

import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "./env";

// This client must stay on the server because it uses the service role key.
export const supabaseAdmin = createClient(
  serverEnv.supabaseUrl,
  serverEnv.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
