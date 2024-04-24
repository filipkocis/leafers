"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/components/ui/select"
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@shadcn/components/ui/form";
import { zodUnitEnum } from "@app/utils/types";

export default function UnitSelectInput({ className }: { className?: string }) {
  const form = useFormContext()

  function handleUnitChange(value: string, onChange: (...event: any[]) => void) {
    if ((zodUnitEnum as any as string[]).includes(value)) onChange(value)
    else onChange(undefined)
  }
  
  return (
    <FormField
      control={form.control}
      defaultValue="gram"
      name="unit"
      render={({ field }) => (
        <FormItem className="grid">
          <Select onValueChange={(value) => handleUnitChange(value, field.onChange)} defaultValue={field.value}>
            <SelectTrigger className={className}>
              <FormControl> 
                <SelectValue placeholder="Unit" />
              </FormControl>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gram">g</SelectItem>
              <SelectItem value="miligram">mg</SelectItem>
              <SelectItem value="hour">h</SelectItem>
              <SelectItem value="null">None</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
