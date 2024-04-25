"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@shadcn/components/ui/form";
import { Input } from "@shadcn/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { combinedSchema } from "../utils/newPostSchema";
import { z } from "zod";
import DateTimeInput from "./DateTimeInput";
import UnitSelectInput from "./UnitSelectInput";

export function FormLog({ form, disabled }: { form: UseFormReturn<z.infer<typeof combinedSchema>>, disabled?: boolean }) {
  
  function handleNumberInput(value: string, onChange: (...event: any[]) => void) {
    if (value === "") onChange(undefined);
    else onChange(value)
  }

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
            <FormMessage />
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
                  onChange={(e) => handleNumberInput(e.currentTarget.value, field.onChange)}
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <DateTimeInput disabled={disabled} defaultValue={new Date()} />      
    </div>
  )
}
