import { z } from "zod"
import { zodUnitEnum } from "@app/utils/types"

const basePostSchema = z.object({
  content: z.string()
    .max(280, { message: "Message is too long." })
    .optional(),
  parent: z.string()
    .uuid({ message: "Invalid parent ID" })
    .optional(),
})

export const textPostSchema = basePostSchema.extend({
  type: z.literal("text"),
  content: z.string()
    .min(1, { message: "Message is too short." })
    .max(280, { message: "Message is too long." })
})

export const logPostSchema = basePostSchema.extend({
  type: z.literal("log"),
  name: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  amount: z.string()
    .transform((value) => (value === '' ? undefined : Number(value)))
    .refine((value) => (value === undefined) || (typeof value === 'number' && value > 0), {
      message: 'Amount must be a positive number',
    })
    .optional(),
  unit: z.string()
    .transform((value) => (value === 'none' ? undefined : value))
    .refine((value) => value === undefined || (zodUnitEnum as any as string[]).includes(value), {
        message: 'Invalid unit',
    })
    .optional(),
  variant: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  appearance: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  timestamp: z.date({ required_error: "Date is required" }),
  leaf: z.boolean(),
})

export const combinedSchema = z.union([
  textPostSchema,
  logPostSchema,
]);
