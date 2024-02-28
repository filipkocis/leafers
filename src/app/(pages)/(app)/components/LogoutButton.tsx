import { Button } from "@/shadcn/components/ui/button"
import { LucideLogOut } from "lucide-react"

export default function LogoutButton() {
  return (
    <Button variant="outline" className="self-center bg-transparent hover:bg-muted text-red-500 hover:text-red-600 m-2 p-2 h-auto rounded-full fixed bottom-0">
      <LucideLogOut className="m-0 p-0" width={24} height={24} />
    </Button>
  )
}
