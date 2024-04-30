"use client"

import { useRef } from "react";
import { Textarea, TextareaProps } from "@shadcn/components/ui/textarea";
import { cn } from "@shadcn/lib/utils";

export default function ResizableTextarea({ maxRows = 10, style, onInput, className, ...props }: { maxRows?: number } & TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function onTextareaInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = textareaRef.current
    if (!textarea) return;

    const style = window.getComputedStyle(textarea)
    const lineHeight = parseInt(style.lineHeight)
    const paddingY = parseInt(style.paddingTop) + parseInt(style.paddingBottom)

    textarea.rows = 1
    const height = textarea.scrollHeight
    const realRows = (height - paddingY) / lineHeight

    if (realRows <= maxRows) {
      textarea.rows = realRows
    } else if (realRows > maxRows) {
      textarea.rows = maxRows
    }

    !!onInput && onInput(e)
  }

  return (
    <Textarea 
      ref={textareaRef}
      rows={1}
      onInput={onTextareaInput}
      autoComplete="off"
      className={cn("min-h-0 h-min resize-none px-3 py-2", className)}
      {...props}
    />
  )
}
