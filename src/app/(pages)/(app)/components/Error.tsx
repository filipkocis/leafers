import { cn } from "@shadcn/lib/utils"

export default function Error({ message, className }: { message: string, className?: string }) {
  return (
    <div style={{ wordBreak: "break-word" }} className={cn("text-center flex items-center justify-center px-8 py-6", className)}>
      {message}
    </div>
  )
}
