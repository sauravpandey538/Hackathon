import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

const signupSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
    name: z.string().min(3, {message: "Name must be at least 3 characters long"}),
})

export {loginSchema,signupSchema};