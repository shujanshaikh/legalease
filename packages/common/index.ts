import { z } from "zod"

export const messageScehma = z.object({
    message : z.string(),
    messageId : z.string()
})

export const SIgnupSchema = z.object({
    email : z.string().email(),
    password : z.string()
})

export const SigninSchema = z.object({
    email : z.string().email(),
    password : z.string()
})