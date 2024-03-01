import createClient from "@services/supabase/server";
import { getUser } from "@utils/server/auth";
import { dataNonNull, dataSomeNonNull, errorMessage } from "@utils/returnObjects";

export async function getOwnProfileData() {
  try {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) throw new Error("User not found");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (error) throw error
    if (!profile) throw new Error("Profile not found");

    return dataNonNull(profile);
  } catch (error) {
    return errorMessage(error, "Could not get profile data");
  }
}

export async function getOwnProfileId() {
  try {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) throw new Error("User not found");

    const { data: profile, error } = await supabase
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
    const supabase = await createClient();

    const { data: profile, error } = await supabase
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

export async function getOwnProfileAvatar() {
  try {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) throw new Error("User not found");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("auth_user_id", user.id)
      .single();

    if (error) throw error
    if (!profile) throw new Error("Profile not found");

    return dataSomeNonNull(profile.avatar_url, "/tree1.png");
  } catch (error) {
    return errorMessage(error, "Could not get profile avatar");
  }
}