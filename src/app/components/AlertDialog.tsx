"use client"

import { cn } from "@shadcn/lib/utils"
import {
  AlertDialog as AlertDialogShadcn,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shadcn/components/ui/alert-dialog"
import { Button, ButtonProps } from "@shadcn/components/ui/button"
import { NoPropagationButton } from "@components/NoPropagationButton"

interface AlertDialogProps {
  children?: React.ReactNode,
  variant?: ButtonProps["variant"],
  actionVariant?: ButtonProps["variant"],
  className?: string,
  title?: string,
  description?: string,
  cancel?: string,
  action?: string,
  onCancel?: () => void,
  onAction?: () => void,
}

export default function AlertDialog({ children, variant, actionVariant, className, title, description, cancel, action, onCancel, onAction }: AlertDialogProps) {
  return (
    <AlertDialogShadcn>
      <AlertDialogTrigger asChild>
        <NoPropagationButton className={cn("h-auto p-0 m-0 w-full cursor-default", className)} variant={variant ?? "ghost"}>{children}</NoPropagationButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancel ?? "Cancel"}</AlertDialogCancel>
          <Button variant={actionVariant ?? "default"} asChild>
            <AlertDialogAction onClick={onAction}>{action ?? "Continue"}</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogShadcn>
  )
}
