import { forwardRef } from "react";
import { AiChatMessage } from "../utils/types";
import ProfilePicture from "@app/components/ProfilePicture";
import { Card } from "@shadcn/components/ui/card";
import { cn } from "@shadcn/lib/utils";

type MessageProps = { className?: string, isSubmitting?: boolean, message?: AiChatMessage, isRef?: boolean }
const Component = forwardRef<HTMLDivElement, MessageProps >(
({ className, message, isRef, isSubmitting }, ref) => {
    if (isRef) {
      if (!isSubmitting) message = { content: "", role: "assistant" };
      else message = { content: "Thinking...", role: "assistant" }
      
    }
    if (!message) return null;
    if (message.role === "system") return null;

    const isAssistant = message.role === "assistant"

    return (
      <div className={cn("flex flex-col gap-2 sm:w-[90%] overflow-hidden", 
        isAssistant ? 'items-start'
        : 'items-end self-end',
        isRef && !isSubmitting && "opacity-0 invisible",
        className
      )}>
        <div className={cn("flex gap-2 items-center", isAssistant && "flex-row-reverse")}> 
          <p className="font-bold">{isAssistant ? "Capybara" : "You"}</p>
          <ProfilePicture className={cn(isAssistant ? "self-start" : "self-end")} src={null} size={32} />
        </div>
        <Card 
          ref={ref} 
          style={{ wordBreak: 'break-word' }} 
          className={cn("prose whitespace-pre-wrap px-3 py-2 text-[0.95rem]", isAssistant && "bg-accent")}
        >{message.content}</Card>
      </div>
    )
  }
)
Component.displayName = "Message";

export const Message = Component;
