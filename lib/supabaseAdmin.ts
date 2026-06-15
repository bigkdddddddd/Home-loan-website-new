import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import { getServerEnv } from "./env";
import type { Database } from "./supabase.types";

let cachedSupabaseAdmin: SupabaseClient<Database> | null = null;

function createServerFetch(supabaseKey: string): typeof fetch | undefined {
  if (!supabaseKey.startsWith("sb_secret_")) {
    return undefined;
  }

  return async (input, init) => {
    const headers = new Headers(init?.headers);

    // Supabase secret keys must be sent via `apikey` only.
    headers.set("apikey", supabaseKey);
    headers.delete("Authorization");

    return fetch(input, {
      ...init,
      headers,
    });
  };
}

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
      global: {
        fetch: createServerFetch(serverEnv.supabaseServiceRoleKey),
      },
    },
  );

  return cachedSupabaseAdmin;
}
