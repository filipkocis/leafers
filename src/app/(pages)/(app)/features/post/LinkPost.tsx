"use client"

import Post from "@app/features/post/Post";
import React from "react";
import { useRouter } from "next/navigation";

const LinkPost = React.memo(({ post, className }: { post: any, className?: string }) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/post/${post.id}`)} className="cursor-pointer hover:bg-muted/30">
      <Post post={post} className={className} />
    </div>
  )
})

export default LinkPost
