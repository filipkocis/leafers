"use client"

import { formatAmount, formatPostDate } from "@utils/format";
import { capitalize } from "@utils/string";
import { getLogPostData } from "../actions/getPostData"
import PostContainer from "./PostContainer";
import Error from "@app/components/Error";
import { formatUnit } from "@utils/format";
import { cn } from "@shadcn/lib/utils";
import { PostTypeEnum } from "@app/utils/types";
import { useAwaitData } from "@app/hooks/useAwait";
import CenteredLoader from "@app/components/CenteredLoader";

export default function PostData({ id, type }: { id: string, type: PostTypeEnum }) {
  let content;

  if (type === "text") return null;
  
  if (type === "log") {
    content = <LogPostData id={id} />
  } else if (type === "repost") {

  } else return null;

  return (
    <PostContainer className="overflow-auto rounded-lg bg-card">
      {content}
    </PostContainer>
  )
}

const ellipsisText = "[&>*]:overflow-hidden [&>*]:text-ellipsis whitespace-nowrap" 

function LogPostData({ id }: { id: string }) {
  const { data: log, error, loading } = useAwaitData(getLogPostData, id)

  if (loading) return <CenteredLoader />;
  if (error != null) return <Error message={error} />;

  return (
    <div className="grid grid-cols-[1fr,_auto] items-center gap-2">
      <div className="flex flex-col overflow-hidden">
        <div className={cn("flex flex-wrap gap-1 items-center text-sm", ellipsisText)}> 
          {!!log.name && <p className="text-xl">{capitalize(log.name)}</p> }
          <div className="flex gap-1">
            <p className="text-muted-foreground">•</p>
            <p className="text-muted-foreground">{formatPostDate(log.timestamp)}</p>
          </div>
        </div>

        {(!!log.appearance || !!log.variant) &&
          <div className={cn("flex flex-wrap gap-1 font-light", ellipsisText)}>
            {!!log.appearance && (
              <div className={cn("flex gap-1", ellipsisText)}>
                <p>{capitalize(log.appearance)}</p>
                {!!log.variant && <p>-</p> }
              </div>
            )}
            {!!log.variant && <p>{capitalize(log.variant)}</p> }
          </div>
        }
      </div>
      
      {(log.amount != undefined || !!log.unit) &&
        <div className="flex items-center gap-1">
          {log.amount != undefined && <p className="text-2xl">{formatAmount(log.amount)}</p> }
          {!!log.unit && <p className="text-lg">{formatUnit(log.unit)}</p> }
        </div>
      }
    </div>
  )
}
