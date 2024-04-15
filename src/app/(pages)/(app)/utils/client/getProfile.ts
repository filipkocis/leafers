"use client"

import createClient from "@services/supabase/client";
import { getUser } from "@utils/client/auth";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getOwnProfileId() {
  try {
    const supabase = createClient();
    const user = await getUser();

    if (!user) throw new Error("User not found");

    const { data: profile, error } = await supabase
      .schema("public")
      .from("profiles")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (error) throw error
    if (!profile) throw new Error("Profile not found")

    return dataNonNull(profile.id);
  } catch (error) {
    return errorMessage(error, "Could not get profile id")
  }
}

export async function getProfileDataByUsername(username: string) {
  try {
    const supabase = createClient();

    const { data: profile, error } = await supabase
      .schema("public")
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;
    if (!profile) throw new Error("Profile not found")

    return dataNonNull(profile);
  } catch (error) {
    return errorMessage(error, "Could not get profile data")
  }
}
