import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "@utils/types/supabase"
import NEXT_PUBLIC_SUPABASE_SCHEMA from "@/supabase_schema"

export default async function createClient() {
  const cookieStore = cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: NEXT_PUBLIC_SUPABASE_SCHEMA },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  return supabase
}
