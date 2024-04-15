"use client";

import { createBrowserClient } from '@supabase/ssr'
import { Database } from "@utils/types/supabase"
import NEXT_PUBLIC_SUPABASE_SCHEMA from '@/supabase_schema';

export default function createClient() {
  return createSupabaseClient().schema(NEXT_PUBLIC_SUPABASE_SCHEMA)
}

export function createSupabaseClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return supabase
}
