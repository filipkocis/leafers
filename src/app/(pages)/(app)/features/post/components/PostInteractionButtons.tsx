"use client"

import { LucideHeart, LucideReplyAll, LucideShare } from "lucide-react";
import { NoPropagationButton } from "@components/NoPropagationButton";
import { checkIfLiked, handlePostLike } from "../utils/likePost";
import { useEffect, useState } from "react";
import { cn } from "@shadcn/lib/utils";
import { useRouter } from "next/navigation";
import { useProfile } from "@app/contexts/profileContext";

export default function PostInteractionButtons({ id, likes, replies, reposts }: { id: string, likes: number, replies: number, reposts: number }) {
  const [isLiked, setIsLiked] = useState<undefined | boolean>(undefined)
  const [isLoadingLike, setLoadingLike] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const router = useRouter()
  const profile = useProfile()
  const profileId = profile ? profile.id : null;

  useEffect(() => {
    async function checkLiked() {
      const result = await checkIfLiked(id, profileId) 
      if (result.error) return;
      setIsLiked(result.data.liked)
    }

    checkLiked()
  })

  const handleLike = async () => {
    if (isLiked === undefined) return;

    const result = await handlePostLike(id, profileId) 
    if (result.error) return;

    if (result.data) {
      const liked = result.data.liked
      setIsLiked(liked)
      setLikeCount(c => c + (liked ? 1 : -1))
    }
  }

  return (
    <div className="col-span-2 grid grid-cols-3 place-items-center"> 
      <ButtonWrapper
        onClick={() => { 
          setLoadingLike(true)
          handleLike().then(_ => setLoadingLike(false))
        }}
        disabled={isLoadingLike}
      >
        <div 
          className={cn(
            "hover:text-red-500",
            isLoadingLike && "animate-pulse !text-red-300"
          )}
        >
          <div className="p-1 rounded-full group-hover:bg-red-500/25 group-hover:shadow-[0_0_0_0.2rem_rgb(239_68_68_/_0.25)]">
            <LucideHeart 
              size={16} 
              className={cn(
                isLiked && "fill-red-500 text-red-500",
                isLoadingLike && "fill-red-300 text-red-300"
              )}
            />
          </div>
          <p>{likeCount}</p>
        </div>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => router.push(`/post?parent=${id}`)}>
        <div className="hover:text-primary">
          <div className="p-1 rounded-full group-hover:bg-primary/25 group-hover:shadow-[0_0_0_0.2rem_hsl(var(--primary)_/_25%)]">
            <LucideReplyAll size={16} />
          </div>
          <p>{replies}</p>
        </div>
      </ButtonWrapper>
      <ButtonWrapper disabled>
        <div className="hover:text-primary">
          <div className="p-1 rounded-full group-hover:bg-primary/25 group-hover:shadow-[0_0_0_0.2rem_hsl(var(--primary)_/_25%)]">
            <LucideShare size={16} />
          </div>
          <p>{reposts}</p>
        </div>
      </ButtonWrapper>
    </div>
  )
}

function ButtonWrapper({ children, onClick, disabled }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean }) {
  return (
    <NoPropagationButton 
      variant="ghost" 
      className={cn(
        "cursor-pointer h-auto transition-all p-0 hover:bg-transparent group flex gap-1",
        disabled && "cursor-not-allowed"
      )} 
      asChild 
      onClick={() => {
        if (onClick && !disabled) onClick()
      }}
      disabled={disabled}
    >
      {children}
    </NoPropagationButton>
  )
}
