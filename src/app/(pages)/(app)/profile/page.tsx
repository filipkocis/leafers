import { RedirectType, redirect } from "next/navigation";
import Error from "@app/components/Error";
import { getOwnProfileData } from "@app/utils/server/getProfile";

export default async function ProfilePage() {
  const { data: profile, error } = await getOwnProfileData();
  if (error) return <Error message={error.message} />;

  redirect(`/profile/${profile.username}`, RedirectType.replace)
}
