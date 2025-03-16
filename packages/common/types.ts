import { z } from "zod"

export const messageScehma = z.object({
    message : z.string(),
    messageId : z.string()
})

