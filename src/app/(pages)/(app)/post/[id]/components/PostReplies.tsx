import Error from "@app/components/Error";
import { getPaginatedPosts } from "@app/utils/server/getPosts";
import LinkPost from "@app/features/post/LinkPost";

export default async function PostReplies({ id }: { id: string }) {
  const { data: replies, error } = await getPaginatedPosts({ parent_id: id })

  if (error) return <Error message={error.message} />

  return (
    <div className="flex flex-col">
      {replies.map((reply) => (
        <LinkPost key={reply.id} post={reply} />
      ))}
    </div>
  )
}
