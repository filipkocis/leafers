"use client"

import createClient from "@services/supabase/client";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getProfileBadgesArray(profile_id: string) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("roles")
      .select("role")
      .eq("profile_id", profile_id);

    if (error) throw error;

    const badges = data.map(badge => badge.role);

    return dataNonNull(badges)
  } catch (error) {
    return errorMessage(error);
  }
}
