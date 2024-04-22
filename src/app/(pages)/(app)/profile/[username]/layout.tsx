import { getProfileDataByUsername } from "@app/utils/server/getProfile";
import ProfileHeader from "../components/ProfileHeader";
import { RedirectType, redirect } from "next/navigation";
import ProfileNav from "../components/ProfileNav";
import { hasRole } from "@utils/server/roles";

export default async function Profile({ params: { username }, children } : { children: React.ReactNode, params: { username: string } }) {
  const { data: profile, error } = await getProfileDataByUsername(username);
  if (error) redirect("/404", RedirectType.replace)

  const isLeafer = await hasRole("leafer")

  return (
    <div className="flex flex-col">
      <ProfileHeader isLeafer={isLeafer} profile={profile} />
      <ProfileNav isLeafer={isLeafer} username={profile.username} />

      {children}
    </div>
  )
}
