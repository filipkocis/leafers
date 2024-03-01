import { RedirectType, redirect } from "next/navigation";
import { getProfileDataByUsername } from "@app/utils/server/getProfile";
import { getOwnProfileData } from "@app/utils/server/getProfile";
import ProfileContentSection from "./components/ProfileContentSection";
import ProfileHeaderSection from "./components/ProfileHeaderSection";

export default async function Profile({ params: { slug } }: { params: { slug?: string[] } }) {
  if (slug && slug.length > 2) {
    redirect("/404", RedirectType.replace)
  }

  if (!slug || slug.length === 0) {
    const profile = await getOwnProfileData();
    if (profile.error) redirect("/login", RedirectType.replace)

    const username = profile.data.username
    redirect(`/profile/${username}`, RedirectType.replace)
  }

  const [username, page] = slug

  const profile = await getProfileDataByUsername(username);
  if (profile.error) redirect("/404", RedirectType.replace)

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeaderSection profile={profile.data} />
      <ProfileContentSection profile={profile.data} page={page} />
    </div>
  )
}
