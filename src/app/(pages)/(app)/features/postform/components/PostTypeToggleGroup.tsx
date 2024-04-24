"use client"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@shadcn/components/ui/toggle-group"
import Tooltip from "@components/Tooltip"
import { PostTypeEnum } from "@app/utils/types"
import { LucideCalendar, LucideIcon, LucideLeaf, LucideLink, LucideText, LucideVideo, LucideVote } from "lucide-react"

export default function PostTypeToggleGroup({ setType, type, defaultValue }: { defaultValue: PostTypeEnum, type: PostTypeEnum, setType?: (type: PostTypeEnum) => void }) {
  const handleChange = (value: PostTypeEnum) => {
    setType && setType(value ? value : defaultValue)
  }
  
  return (
    <ToggleGroup value={type} defaultValue={defaultValue} type="single" onValueChange={handleChange}>
      {TOGGLE_ITEMS.map(item => (
        <GroupItem key={item.type} {...item} />
      ))}
    </ToggleGroup>
  )
}

const TOGGLE_ITEMS: { disabled?: boolean, type: PostTypeEnum, tooltip: string, Icon: LucideIcon }[]= [
  { type: "text", tooltip: "Text", Icon: LucideText },
  { type: "log", tooltip: "Log", Icon: LucideLeaf },
  { disabled: true, type: "media", tooltip: "Media", Icon: LucideVideo },
  { disabled: true, type: "link", tooltip: "Link", Icon: LucideLink },
  { disabled: true, type: "poll", tooltip: "Poll", Icon: LucideVote },
  { disabled: true, type: "event", tooltip: "Event", Icon: LucideCalendar },
]

function GroupItem({ disabled, type, tooltip, Icon }: { disabled?: boolean, type: PostTypeEnum, tooltip: string, Icon: LucideIcon }) {
  return (
    <ToggleGroupItem disabled={disabled} className="p-0 h-auto" value={type} aria-label={`Toggle ${type}`}>
      <Tooltip text={tooltip}>
        <div className="sm:p-3 p-2"> 
          <Icon className="sm:h-4 sm:w-4 h-3.5 w-3.5" />
        </div>
      </Tooltip>
    </ToggleGroupItem>
  )
}
