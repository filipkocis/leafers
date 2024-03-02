import { getPosts } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import LinkPost from "@app/features/post/LinkPost"

export default async function ExplorePosts() {
  const posts = await getPosts()

  if (posts.error) return <Error message={posts.error.message} />

  return (
    <div className="grid">
      {posts.data.map((post => (
        <LinkPost href={`/post/${post.id}`} post={post} key={post.id} /> 
      )))}
    </div>
  )
}
