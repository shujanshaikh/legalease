import { Router } from "express"
import { authMiddleware } from "../../middleware";
import prisma from "db";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "prompt/prompts/systemPrompt"


export const chatRouter = Router()
chatRouter.post("/chat", authMiddleware ,  async (req, res) => {
    try {
       const userId = req.userId!
       const openai = new OpenAI({
           apiKey: process.env.GEMINI_API_KEY,
           baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
       });
   
       const { message } = req.body;
   
   
       if (!message) {
           res.json({
               message: "Invalid Data"
           })
           return
       }
       await prisma.chat.create({
           data: {
               userId ,
               role: "USER", message
           }
       })
   
       const previousMessage = await prisma.chat.findMany({
           where: {
               userId 
           }, orderBy: {
               createdAt: "asc"
           }
       })
   
       const convo: ChatCompletionMessageParam[] = [
           { role: "system", content: SYSTEM_PROMPT },
           ...previousMessage.map(p => ({
               role: p.role.toLowerCase() as "user" | "assistant" | "system",
               content: p.message || ""
           })),
           { role: "user", content: message }
       ]
   
       
       const response = await openai.chat.completions.create({
           model: "gemini-2.0-flash",
           messages: convo,
           temperature: 0.3,
           max_tokens: 500
       });
   
       
       const reply = response.choices[0]?.message.content;
   
       await prisma.chat.create({
           data: {
               userId ,
               role: "ASSISTANT",
               message: reply || ""
           }
       });
       res.json({ reply });
       return
    } catch (error) {
       res.status(500).json({message : "Invalid data"})
    }
     
   })