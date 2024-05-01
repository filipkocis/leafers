import React from "react";
import { ProfileFull } from "@app/utils/types";
import { cn } from "@shadcn/lib/utils";
import PostContainer from "@app/features/post/components/PostContainer";
import ProfilePicture from "@app/components/ProfilePicture";
import { ProfileUsernameAndCheckmarks } from "./components/ProfileUsernameAndCheckmarks";
import FollowButton from "./components/FollowButton";
import { getFollowStatus } from "@app/actions/getFollower";
import { formatPostDate } from "@utils/format";
import { getProfileLogStats } from "@app/utils/server/getProfile";

export default async function ProfileCard({ profile, className }: { profile: ProfileFull, className?: string }) {
  const { data: isFollowing, error: followingError } = await getFollowStatus(profile.id)
  if (followingError) throw new Error(followingError.message);

  const { data: logStats, error: logStatsError } = await getProfileLogStats(profile.id)
  if (logStatsError) throw new Error(logStatsError.message);

  return (
    <PostContainer className={cn("flex flex-col gap-2 border-0 border-b shadow-none", className)} >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <ProfilePicture className="self-start" src={profile.avatar_url} alt={profile.username} size={48} />      
        <div className="flex gap-2 justify-between items-center overflow-hidden">
          <ProfileUsernameAndCheckmarks className="flex-col" profile={profile} />
          <FollowButton targetId={profile.id} isFollowing={isFollowing} />
        </div>
      </div>

      <div className="text-sm text-muted-foreground flex flex-wrap gap-2 overflow-hidden">
        <p className="">
          Member since {formatPostDate(profile.created_at)}
        </p>
        <div className="flex text-center grow justify-end">
          <p className="border-l px-2">
            {logStats.total ? logStats.total + 'g' : 0} total
          </p>
          <p className="border-l px-2">
            {logStats.month ? logStats.month + 'g' : 0} month
          </p>
          <p className="border-l px-2">
            {logStats.week ? logStats.week + 'g' : 0} week
          </p>
          <p className="border-r border-l px-2">
            {logStats.day ? logStats.day + 'g' : 0} today
          </p>
        </div>
      </div>
    </PostContainer>
  )
}
