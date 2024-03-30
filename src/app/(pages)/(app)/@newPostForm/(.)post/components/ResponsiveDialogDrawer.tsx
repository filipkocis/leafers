"use client"

import { Button } from "@shadcn/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@shadcn/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@shadcn/components/ui/drawer"
import NewPostForm from "@app/post/components/NewPostForm"
import { useRouter } from "next/navigation"
import { useWindowSize } from "@hooks/useWindowSize"
import Error from "@app/components/Error"

export default function ResponsiveDrawerDialog({ parent, username, error }: { parent?: string, username?: string, error?: string }) {
  const router = useRouter();
  const windowSize = useWindowSize()
  const isDesktop = (windowSize.width || 0) > 768

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="sm:max-w-[500px]">
          {error ? <Error message={error} /> : <>
            <ReplyingTo username={username} />
            <NewPostForm parent={parent} />
          </>}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={(open) => {
      if (!open) router.back()
    }}>
      <DrawerContent>
        {error ? <Error message={error} /> : <>
          <ReplyingTo username={username} />
          <NewPostForm parent={parent} />
        </>}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="self-center">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ReplyingTo({ username }: { username?: string }) {
  if (!username) return null;

  return (
    <div className="flex gap-2 items-center text-[0.85rem]">
      <span className="font-semibold text-muted-foreground">Replying to</span>
      <span className="text-primary font-bold">@{username}</span>
    </div>
  )
}
