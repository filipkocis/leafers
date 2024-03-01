'use client'

import { Button } from "@/app/lib/shadcn/components/ui/button"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="px-3 py-2 flex gap-2 flex-col items-center">
      <h2 className="text-xl">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
