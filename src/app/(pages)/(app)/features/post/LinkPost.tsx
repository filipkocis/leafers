"use client"

import Link from "next/link";
import Post from "@app/features/post/Post";

export default function LinkPost({ post, className }: { post: any, className?: string }) {
  return (
    <Link href={`/post/${post.id}`} className="hover:bg-muted/30">
      <Post post={post} className={className} />
    </Link>
  )
}
