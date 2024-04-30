"use client"

import { FormControl, FormField, FormItem, FormLabel } from "@shadcn/components/ui/form";
import { Input } from "@shadcn/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { combinedSchema } from "../utils/newPostSchema";
import { z } from "zod";
import DateTimeInput from "./DateTimeInput";
import UnitSelectInput from "./UnitSelectInput";
import { Checkbox } from "@shadcn/components/ui/checkbox";

export function FormLog({ form, disabled }: { form: UseFormReturn<z.infer<typeof combinedSchema>>, disabled?: boolean }) {
  return (
    <div className="grid gap-2">
      <FormField
        disabled={disabled}
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input 
                maxLength={64}
                autoComplete="on"
                type="text"
                className="placeholder:text-sm px-3 py-2 text-[1rem]" 
                placeholder="Activity or Substance name" 
                {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid gap-x-2 grid-cols-[1fr_auto]">
        <FormField
          disabled={disabled}
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  autoComplete="on" 
                  type="number"
                  step={0.0000000001}
                  min={0.001}
                  className="placeholder:text-sm px-3 py-2 text-[1rem]" 
                  placeholder="Amount" 
                  {...field}
                  />
              </FormControl>
            </FormItem>
          )}
        />
        
        <UnitSelectInput disabled={disabled} />
      </div>

      <div className="grid gap-2 grid-cols-2">
        <FormField
          disabled={disabled}
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  maxLength={64}
                  autoComplete="on"
                  type="text"
                  className="placeholder:text-sm px-3 py-2 text-[1rem]" 
                  placeholder="Variant" 
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          disabled={disabled}
          control={form.control}
          name="appearance"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  maxLength={64}
                  autoComplete="on"
                  type="text"
                  className="placeholder:text-sm px-3 py-2 text-[1rem]" 
                  placeholder="Color or appearance" 
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <DateTimeInput disabled={disabled} defaultValue={new Date()} />      

      {!disabled &&
        <FormField
          disabled={disabled}
          control={form.control}
          name="leaf"
          render={({ field }) => (
            <FormItem className="space-y-0 pt-1 flex items-center gap-2 leading-none">
              <FormControl>
                <Checkbox
                  className="border-border h-5 w-5"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Count as Leaf</FormLabel>
            </FormItem>
          )}
        />
      }
    </div>
  )
}
