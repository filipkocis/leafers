"use client"

import createClient from "@services/supabase/client"

export async function isAdmin() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("check_admin_role").select("*").single() 
    if (error) throw error

    return data
  } catch (error) {
    return false
  }
}

export async function hasRole(role: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.rpc("check_role", { role }).select("*").single() 
    if (error) throw error

    return data
  } catch (error) {
    return false
  }
}
