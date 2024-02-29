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

export default function ResponsiveDrawerDialog() {
  const router = useRouter();
  const windowSize = useWindowSize()
  const isDesktop = (windowSize.width || 0) > 768

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="sm:max-w-[500px]">
          <NewPostForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={true} onOpenChange={(open) => {
      if (!open) router.back()
    }}>
      <DrawerContent>
        <NewPostForm />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="self-center">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
