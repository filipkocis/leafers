import { cn } from "@shadcn/lib/utils";
import { Loader2 } from "lucide-react";

export default function CenteredLoader({ className, size = 28 }: { className?: string, size?: string | number }) {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 
        width={size} 
        height={size} 
        className={cn("animate-spin fade-in rounded-full text-muted-foreground", className)} 
      />
    </div>
  )
}
