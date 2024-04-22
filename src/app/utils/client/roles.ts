"use client"

import createClient from "@services/supabase/client"

export async function isAdmin() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("check_admin_role").select("*").single() 
    if (error) throw error

    return true
  } catch (error) {
    return false
  }
}

export async function hasRole(role: string) {
  try {
    const supabase = createClient()

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
