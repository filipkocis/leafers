import { Button } from "@shadcn/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@shadcn/components/ui/sheet"
import { LucideMenu } from "lucide-react"

export function LayoutHeaderSheet({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-1.5 m-0 h-auto">
          <LucideMenu height={32} width={32} /> 
        </Button>
      </SheetTrigger>

      <SheetContent className="p-3" side="left">
        {children}    
      </SheetContent>
    </Sheet>
  )
}
