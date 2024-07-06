"use client"

import * as React from "react"

import { Button } from "@shadcn/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import { cn } from "@shadcn/lib/utils"
import { Settings } from "lucide-react"

export function ModelToggle({ className, model, setModel }: { className?: string, model: string, setModel?: (model: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn(className)} variant="outline" size="icon">
          <Settings className="absolute h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change model</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setModel && setModel("gpt-3.5-turbo")}>
          GPT 3.5 Turbo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setModel && setModel("gpt-4-turbo")}>
          GPT 4 Turbo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setModel && setModel("gpt-4o")}>
          GPT 4 Omni
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
