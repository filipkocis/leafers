import { z } from "zod"

const formSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address." })
    .max(64, { message: "Invalid email address." })
    .min(10, { message: "Invalid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be less than 100 characters." })
})

export default formSchema
