"use client"

import createClient from "@services/supabase/client";

export async function getSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}

export async function getUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}
