"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/components/ui/select"
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@shadcn/components/ui/form";
import { useEffect, useState } from "react";

export default function UnitSelectInput({ disabled, className }: { disabled?: boolean, className?: string }) {
  const form = useFormContext()
  const [isLeaf, setIsLeaf] = useState(disabled ? false : true)

  useEffect(() => {
    const unitValue = form.getValues('unit') as string
    const leafValue = form.getValues('leaf')

    if (leafValue === isLeaf) return;
    if (leafValue && !unitValue.endsWith('gram')) form.setValue('unit', 'gram') 

    setIsLeaf(leafValue)
  }, [form, isLeaf, setIsLeaf])
  
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      defaultValue="gram"
      name="unit"
      render={({ field }) => (
        <FormItem className="grid">
          <Select 
            value={field.value} 
            disabled={disabled} 
            onValueChange={field.onChange} 
            defaultValue={disabled ? 'none' : field.value}
          >
            <SelectTrigger className={className}>
              <FormControl> 
                <SelectValue placeholder="Unit" />
              </FormControl>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gram">g</SelectItem>
              <SelectItem value="miligram">mg</SelectItem>
              <SelectItem disabled={isLeaf} value="second">s</SelectItem>
              <SelectItem disabled={isLeaf} value="hour">h</SelectItem>
              <SelectItem disabled={isLeaf} value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
