"use client"

import { createSupabaseClient } from "@services/supabase/client";
import { dataNone, errorMessage } from "@utils/returnObjects";

export async function getSession() {
  const supabase = createSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}

export async function getUser() {
  const supabase = createSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

export async function logout() {
  try {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();

    return dataNone()
  } catch (error) {
    return errorMessage(error)
  }
}
