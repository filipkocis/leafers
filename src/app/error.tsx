'use client'

import { Button } from "@shadcn/components/ui/button"
import { toast } from "sonner"
import { wait } from "./utils/wait"
import { useEffect } from "react"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    let flag = { ignore: false }
    toast.info('Reloading in 1 second', { duration: 750 })

    async function reload() {
      await wait(1000)
      if (flag.ignore) return

      if (window.location.pathname === '/home') {
        const hash = window.location.hash

        if (hash && hash !== '#') {
          const count = parseInt(hash.slice(1))
          if (count <= 5) window.location.hash = `#${count + 1}`
          else {
            toast.error('Failed to reload automatically', { duration: 1000 })
            return
          }
        } else {
          window.location.hash = '#1'
        }

        reset(); 
        window.location.reload();
      }
    }
    reload()

    return () => {
      flag.ignore = true
    }
  })

  return (
    <div className="px-3 py-2 flex gap-2 flex-col items-center">
      <h2 className="text-xl">Something went wrong!</h2>
      <Button onClick={() => { reset(); window.location.reload() }}>Try again</Button>
    </div>
  )
}
