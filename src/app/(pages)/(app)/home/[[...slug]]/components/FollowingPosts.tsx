import { getFollowedPosts } from "@app/utils/server/getPosts"
import Post from "@app/components/post/Post"
import Error from "@app/components/Error"
import Link from "next/link"

export default async function FollowingPosts() {
  const posts = await getFollowedPosts()

  if (posts.error) return <Error message={posts.error.message} />

  return (
    <div className="grid">
      {posts.data.map((post => (
         <Link href={`/post/${post.id}`} key={post.id}>
          <Post post={post} />
        </Link>
      )))}
    </div>
  )
}
