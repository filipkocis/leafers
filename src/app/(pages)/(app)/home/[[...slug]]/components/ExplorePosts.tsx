import { getPaginatedPosts } from "@app/actions/posts"
import Error from "@app/components/Error"
import LinkPost from "@app/features/post/LinkPost"

export default async function ExplorePosts() {
  const { data: posts, error } = await getPaginatedPosts({ limit: 10, offset: 0 })

  if (error) return <Error message={error.message} />

  return (
    <div className="grid">
      {posts.map((post => (
        <LinkPost post={post} key={post.id} /> 
      )))}
    </div>
  )
}
