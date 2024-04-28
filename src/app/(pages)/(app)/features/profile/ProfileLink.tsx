import ProfileCard from "@app/features/profilecard/ProfileCard";
import React from "react";
import { ProfileFull } from "@app/utils/types";
import Link from "next/link";

const ProfileLink = React.memo(({ profile, className }: { profile: ProfileFull, className?: string }) => {
  return (
    <Link href={`/profile/${profile.username}`} className="cursor-pointer hover:bg-muted/30">
      <ProfileCard profile={profile} className={className} />
    </Link>
  )
})
ProfileLink.displayName = "ProfileLink"

export default ProfileLink
