"use client"

import Link, { LinkProps } from "next/link"
import { forwardRef } from "react"

type LinkType = LinkProps & {
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Component = forwardRef<HTMLAnchorElement, LinkType>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) onClick(e)
        }}
        {...props}
      >
        {children}
      </Link>
    )
  }
)
Component.displayName = "NoPropagationLink";

export const NoPropagationLink = Component;
