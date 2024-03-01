import { Card } from "@shadcn/components/ui/card";
import { cn } from "@shadcn/lib/utils";

export default function PostContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <Card className={cn("px-4 py-3   rounded-none bg-transparent", className)}>
      {children}
    </Card>
  )
}
