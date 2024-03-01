import { z } from "zod"
import { unitEnum } from "@app/utils/post";

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
})

export const logPostSchema = basePostSchema.extend({
  type: z.literal("log"),
  name: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  amount: z.coerce.number()
    .positive({ message: "Amount must be positive" })
    .optional(),
  unit: z.enum(unitEnum)
    .optional(),
  variant: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  appearance: z.string()
    .max(64, { message: "Value is too long" })
    .optional(),
  timestamp: z.date({ required_error: "Date is required" }),
})

export const combinedSchema = z.union([
  textPostSchema,
  logPostSchema,
]);
