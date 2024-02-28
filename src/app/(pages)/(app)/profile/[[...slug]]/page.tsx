import { RedirectType, redirect } from "next/navigation";
import { getProfileData, getProfileDataByUsername } from "./utils/getProfileData";
import ProfileContentSection from "./components/ProfileContentSection";
import ProfileHeaderSection from "./components/ProfileHeaderSection";

export default async function Profile({ params: { slug } }: { params: { slug: string[] } }) {
  if (!slug || slug.length === 0) {
    const profileSelf = await getProfileData(); // TODO: rename
    if (!profileSelf) redirect("/login", RedirectType.replace)

    const username = profileSelf.username
    redirect(`/profile/${username}`, RedirectType.replace)
  }

  const [username, page] = slug

  const profile = await getProfileDataByUsername(username); // TODO: rename

  if (!profile) {
    redirect("/explore", RedirectType.replace)
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeaderSection profile={profile} />
      <ProfileContentSection profile={profile} page={page} />
    </div>
  )
}
