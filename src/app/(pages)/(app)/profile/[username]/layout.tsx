import { getProfileDataByUsername } from "@app/utils/server/getProfile";
import ProfileHeader from "../components/ProfileHeader";
import { RedirectType, redirect } from "next/navigation";
import ProfileNav from "../components/ProfileNav";

export default async function Profile({ params: { username }, children } : { children: React.ReactNode, params: { username: string } }) {
  const { data: profile, error } = await getProfileDataByUsername(username);
  if (error) redirect("/404", RedirectType.replace)

  return (
    <div className="flex flex-col">
      <ProfileHeader profile={profile} />
      <ProfileNav username={profile.username} />

      {children}
    </div>
  )
}
