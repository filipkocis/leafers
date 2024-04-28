import { Button } from "@shadcn/components/ui/button";
import { LucideArrowLeft, LucideSettings } from "lucide-react";
import Image from "next/image";
import Badge from "@app/features/badges/Badge";
import { getProfileBadgesOrdered } from "@app/features/badges/utils/server/getBadges";
import { ProfileFull } from "@app/utils/types";
import FollowButton from "./FollowButton";
import { getFollowStatus } from "@app/actions/getFollower";
import ProfileStats from "./ProfileStats";
import ProfilePicture from "@app/components/ProfilePicture";

export default async function ProfileHeader({ isLeafer, profile }: { isLeafer: boolean, profile: ProfileFull }) {
  const { data: badges, error: badgesError } = await getProfileBadgesOrdered(profile) 
  if (badgesError) throw badgesError;

  const { data: isFollowing, error: followingError } = await getFollowStatus(profile.id)
  if (followingError) throw followingError;

  return (
    <div className="relative grid gap-6 p-3">
      <div className="absolute inset-0 -z-10">
        <Image 
          style={{
            maskImage: "linear-gradient(to bottom, rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 0%) 100%)"
          }}
          src="/trees-bg.jpg" 
          alt="profile background" 
          className="object-cover"
          fill={true}
        /> 
      </div>

      <div className="flex justify-between w-full">
        <Button variant="ghost"><LucideArrowLeft /></Button>
        <Button variant="ghost"><LucideSettings /></Button> 
      </div>

      <div className="grid items-center max-sm:grid-rows-[auto,auto] sm:grid-cols-[1fr,auto,1fr] gap-6">
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {badges.map((badge, i) => <Badge key={badge.role} role={badge.role} index={i} />)}
        </div> 
        <ProfilePicture 
          className="place-self-center rounded-xl p-4 outline-4 outline outline-background" 
          src={profile.avatar_url} 
          size={84} 
        />
        <div className="max-sm:hidden m-auto">
          <FollowButton isFollowing={isFollowing} targetId={profile.id} />
        </div> 
      </div>

      <div className="flex gap-4 flex-wrap items-center justify-center">
        <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-primary via-40% to-lime-500">
          @{profile.username}
        </p>
        <div className="sm:hidden">
          <FollowButton isFollowing={isFollowing} targetId={profile.id} />
        </div>
      </div>

      <ProfileStats isLeafer={isLeafer} profileId={profile.id} />      
    </div>
  )
}
