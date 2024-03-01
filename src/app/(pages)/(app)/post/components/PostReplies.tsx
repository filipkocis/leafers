import Error from "@app/components/Error";
import { getPostReplies } from "@app/utils/server/getPosts";
import LinkPost from "../../home/[[...slug]]/components/LinkPost";

export default async function PostReplies({ id }: { id: string }) {
  const replies = await getPostReplies(id)

  if (replies.error) return <Error message={replies.error.message} />

  return (
    <div className="flex flex-col">
      {replies.data.map((reply) => (
        <LinkPost href={`/post/${reply.id}`} key={reply.id} post={reply} />
      ))}
    </div>
  )
}
