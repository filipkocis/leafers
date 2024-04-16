import { getPostById } from "../utils/server/getPostById"
import Error from "@app/components/Error"
import NewPostForm from "../components/NewPostForm"
import Post from "@app/features/post/Post"
import ServerFeedWrapper from "@app/components/ServerFeedWrapper"

export default async function PostPage({ params: { id } }: { params: { id: string }}) {
  const { data: post, error } = await getPostById(id)

  if (error) return <Error message={error.message} />

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b">
        <Post className="border-none shadow-none" post={post} />  
      </div>

      <div className="border-b p-3">
        <NewPostForm tabs="bottom" parent={post.id} />
      </div>

      <ServerFeedWrapper parentId={id} />
    </div>
  )
}
