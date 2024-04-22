import { Button } from "@shadcn/components/ui/button";
import { LucideArrowLeft, LucideSettings } from "lucide-react";
import Image from "next/image";
import ProfileBadge from "./ProfileBadge";
import { getProfileBadges } from "../utils/server/getBadges";
import { ProfileFull } from "@app/utils/types";
import FollowButton from "./FollowButton";
import { getFollowStatus } from "@app/actions/getFollower";
import ProfileStats from "./ProfileStats";

export default async function ProfileHeader({ profile }: { profile: ProfileFull }) {
  const { data: badges, error: badgesError } = await getProfileBadges(profile) 
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

      <div className="grid items-center grid-cols-[1fr,auto,1fr] gap-6">
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {badges?.map((badge, i) => <ProfileBadge key={badge.role} role={badge.role} index={i} />)}
        </div> 
        <div className="rounded-xl bg-green-500/25 p-4 before-bg-fill outline-4 outline outline-background">
          <Image 
            className="w-[84px] h-[84px]" 
            src="/tree1.png" 
            alt="profile picture" 
            height={84} width={84} />
        </div>
        <div className="m-auto">
          <FollowButton isFollowing={isFollowing} targetId={profile.id} />
        </div> 
      </div>

      <p className="justify-self-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-primary via-40% to-lime-500">
        @{profile.username}
      </p>

      <ProfileStats profileId={profile.id} />      
    </div>
  )
}
