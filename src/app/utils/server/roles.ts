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

export async function hasRole(role: string) {
  try {
    const supabase = await createClient()

    const { count, error } = await supabase
      .from("roles")
      .select("*", { head: true, count: "exact" })
      .eq("role", role)
      .single() 

    if (error || !count) throw error

    return count > 0
  } catch (error) {
    return false
  }
}
