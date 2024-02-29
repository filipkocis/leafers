"use client";

import { createBrowserClient } from '@supabase/ssr'
import { Database } from "@types/supabase"

export default function createClient() {
  const supabase = createBrowserClient<Database, "public", any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabase
}
