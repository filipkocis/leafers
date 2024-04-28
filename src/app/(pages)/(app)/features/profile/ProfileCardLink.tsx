import ProfileCard from "./ProfileCard";
import React from "react";
import { ProfileFull } from "@app/utils/types";
import ProfileCardLinkWrapper from "./components/ProfileCardLink";

const ProfileCardLink = React.memo(({ profile, className }: { profile: ProfileFull, className?: string }) => {
  return (
    <ProfileCardLinkWrapper username={profile.username}>
      <ProfileCard profile={profile} className={className} />
    </ProfileCardLinkWrapper>
  )
})
ProfileCardLink.displayName = "ProfileCardLink"

export default ProfileCardLink
