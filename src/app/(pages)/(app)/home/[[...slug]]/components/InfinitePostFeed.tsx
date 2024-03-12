"use client"

import { PostWithProfile } from "@app/utils/types";
import { useEffect, useRef, useState } from "react";
import { getPaginatedPosts } from "@app/utils/client/getPosts";
import LinkPost from "@app/features/post/LinkPost";
import CenteredLoader from "@app/components/CenteredLoader";
import { toast } from "sonner";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function InfinitePostFeed({ defaultPosts }: { defaultPosts: PostWithProfile[] }) {
  const [posts, setPosts] = useState(defaultPosts)
  const [loading, setLoading] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)
  const [intersecting, setIntersecting] = useState(false)

  const ref = useRef<HTMLDivElement>(null);
  const { unobserve: intersectionUnobserve } = useIntersectionObserver({ ref, cb: setIntersecting });

  async function handleLoadMore() {
    if (endOfFeed || loading) return
    setLoading(true)

    const { data, error } = await getPaginatedPosts({ limit: 10, offset: posts.length })

    if (error) toast.error(error.message)
    else if (data.length) setPosts([...posts, ...data])
    else {
      setEndOfFeed(true)
      intersectionUnobserve()
    }

    setLoading(false)
  }

  useEffect(() => {
    if (intersecting) handleLoadMore() 
  }, [intersecting])


  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <LinkPost key={post.id} post={post} />
      ))}

      <div ref={ref} className="!h-0 invisible" />

      {loading && <CenteredLoader className="m-4" />}
    </div>
  )
}
