import { getPosts } from "@app/utils/server/getPosts"
import Post from "@app/components/post/Post"
import Link from "next/link"
import Error from "@app/components/Error"

export default async function ExplorePosts() {
  const posts = await getPosts()

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
