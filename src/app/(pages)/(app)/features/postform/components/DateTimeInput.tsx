"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@shadcn/lib/utils"
import { Button } from "@shadcn/components/ui/button"
import { Calendar } from "@shadcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcn/components/ui/popover"
import { FormControl, FormField, FormItem, FormMessage } from "@shadcn/components/ui/form"
import { useFormContext } from "react-hook-form"

export default function DateTimeInput({ defaultValue, className }: { defaultValue: Date, className?: string }) {
  const form = useFormContext()

  const handleSelect = (value: Date | undefined, onChange: (...event: any[]) => void) => {
    onChange(value || defaultValue)
  }

  return (
  <FormField
    control={form.control}
    defaultValue={defaultValue}
    name="timestamp"
    render={({ field }) => (
      <FormItem className="grid">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "px-3 py-2 text-left text-[1rem] h-10 font-normal",
                  !field.value && "text-muted-foreground",
                  className
                )}
              >
                {field.value ? (
                  format(field.value, "PPp")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
            
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(e) => handleSelect(e, field.onChange)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <FormMessage />
      </FormItem>
    )}
  />
  )
}

