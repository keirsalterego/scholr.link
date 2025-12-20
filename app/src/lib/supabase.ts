import { createClient } from "@supabase/supabase-js";
import { optionalEnv, requiredEnv } from "./env";

const SUPABASE_URL = optionalEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = optionalEnv("SUPABASE_SERVICE_ROLE_KEY");

// Admin client for server-side use only. Do not import in client components.
export function getAdminSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars are not set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Helper to fetch an optional admin client without throwing, for soft-degraded paths.
export function tryGetAdminSupabase() {
  try {
    return getAdminSupabase();
  } catch {
    return null;
  }
}
