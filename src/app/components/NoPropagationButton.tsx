"use client"

import { Button, ButtonProps } from "@shadcn/components/ui/button"
import { forwardRef } from "react"

export const NoPropagationButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) onClick(e)
        }}
        {...props}
      />
    )
  }
)
