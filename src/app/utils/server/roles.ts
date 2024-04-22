import createClient from "@services/supabase/server"

export async function isAdmin() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc("check_admin_role").select("*").single() 
    if (error) throw error

    return true
  } catch (error) {
    return false
  }
}
