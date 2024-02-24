// "use server"

// supabase-js because we do not care about the user's session, service key doesn't need ssr
import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

export default async function createServiceClient() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY!, {
	    auth: {
		    persistSession: false,
	      autoRefreshToken: false,
	      detectSessionInUrl: false
	    }
    }
  )

  return supabase
}
