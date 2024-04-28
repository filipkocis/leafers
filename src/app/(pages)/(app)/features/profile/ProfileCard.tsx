"use client"

import React from "react";
import { ProfileFull } from "@app/utils/types";
import { cn } from "@shadcn/lib/utils";
import PostContainer from "@app/features/post/components/PostContainer";
import ProfilePicture from "@app/components/ProfilePicture";
import { Button } from "@shadcn/components/ui/button";
import { ProfileUsernameAndCheckmarks } from "./components/ProfileUsernameAndCheckmarks";

export default function ProfileCard({ profile, className }: { profile: ProfileFull, className?: string }) {
  return (
    <PostContainer className={cn("grid grid-cols-[auto_1fr] gap-2 border-0 border-b shadow-none", className)} >
      <ProfilePicture className="self-start" src={profile.avatar_url} alt={profile.username} size={48} />      
      <div className="flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-2 justify-between">
          <ProfileUsernameAndCheckmarks className="flex-col" profile={profile} />
          <Button variant="secondary" className="rounded-full">Follow</Button>
        </div>
        <div>some stats perhaps</div>
     </div>
    </PostContainer>
  )
}
