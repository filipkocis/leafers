"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@shadcn/lib/utils";

export default function ProfileCardLinkWrapper({ 
  username, className, children 
}: { 
  username: string, className?: string, children: React.ReactNode 
}) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/profile/${username}`)} className={cn("cursor-pointer hover:bg-muted/30", className)}>
      {children}
    </div>
  )
}
