import createClient from "@/app/services/supabase/server";
import { getUser } from "@/app/utils/server/auth";

export async function getProfileDataByUsername(username: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  return profile;
}

export async function getProfileData() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  return profile;
}
