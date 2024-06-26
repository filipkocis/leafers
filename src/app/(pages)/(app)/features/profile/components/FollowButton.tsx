"use client"

import { followUser, unfollowUser } from "@app/actions/getFollower";
import { LucideCheck, LucidePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { NoPropagationButton } from "@components/NoPropagationButton";

export default function FollowButton({ targetId, isFollowing }: { targetId: string, isFollowing: boolean }) {
  const router = useRouter()
  
  const handleClick = async () => {
    if (isFollowing) await unfollowUser(targetId)
    else await followUser(targetId)

    router.refresh()
  }

  return (
    <NoPropagationButton 
      onClick={handleClick} 
      variant={isFollowing ? "secondary" : "default"} 
      className="px-3 py-2 h-auto transition-all"
    >
      <div className="flex gap-1 items-center">
        {isFollowing ? 
          <LucideCheck className="w-5 h-5" /> :
          <LucidePlus className="w-5 h-5" />
        }
        {isFollowing ? "Following" : "Follow"}
      </div>
    </NoPropagationButton>
  )
}
