import { formatAmount, formatPostDate } from "@utils/format";
import { capitalize } from "@utils/string";
import { getLogPostData } from "@app/utils/server/getPosts"
import PostContainer from "./PostContainer";
import Error from "@app/components/Error";
import { formatUnit } from "@utils/format";
import { cn } from "@/app/lib/shadcn/lib/utils";

export default async function PostData({ post }) {
  let content;

  if (post.type === "text") return null;
  
  if (post.type === "log") {
    content = <LogPostData postId={post.id} />
  } else if (post.type === "repost") {

  } else return null;

  return (
    <PostContainer className="overflow-auto rounded-lg bg-card">
      {content}
    </PostContainer>
  )
}

const ellipsisText = "[&>*]:overflow-hidden [&>*]:text-ellipsis whitespace-nowrap" 

async function LogPostData({ postId }: { postId: string }) {
  const log = await getLogPostData(postId)

  if (log.error) return <Error message={log.error.message} />

  return (
    <div className="grid grid-cols-[1fr,_auto] items-center gap-2">
      <div className="flex flex-col overflow-hidden">
        <div className={cn("flex flex-wrap gap-1 items-center text-sm", ellipsisText)}> 
          {!!log.data.name && <p className="text-xl">{capitalize(log.data.name)}</p> }
          <div className="flex gap-1">
            <p className="text-muted-foreground">•</p>
            <p className="text-muted-foreground">{formatPostDate(log.data.timestamp)}</p>
          </div>
        </div>

        {(!!log.data.appearance || !!log.data.variant) &&
          <div className={cn("flex flex-wrap gap-1 font-light", ellipsisText)}>
            {!!log.data.appearance && (
              <div className={cn("flex gap-1", ellipsisText)}>
                <p>{capitalize(log.data.appearance)}</p>
                {!!log.data.variant && <p>-</p> }
              </div>
            )}
            {!!log.data.variant && <p>{capitalize(log.data.variant)}</p> }
          </div>
        }
      </div>
      
      {(log.data.amount != undefined || !!log.data.unit) &&
        <div className="flex items-center gap-1">
          {log.data.amount != undefined && <p className="text-2xl">{formatAmount(log.data.amount)}</p> }
          {!!log.data.unit && <p className="text-lg">{formatUnit(log.data.unit)}</p> }
        </div>
      }
    </div>
  )
}
