import { Router } from "express";
import { pdfPrompt } from "prompt/prompts/pdfPrompt"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authMiddleware } from "../../middleware";
import prisma from "db";

export const pdfRouter = Router()
const apiKey = process.env.GEMINI_API_KEY

pdfRouter.post("/pdf" , authMiddleware,   async (req, res) => {
    try {
     const userId = req.userId!
     const { pdfUrl } = req.body;
  
     const genAI = new GoogleGenerativeAI(apiKey as string);
     const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
 
     console.log(pdfUrl)
     const pdfResp = await fetch(pdfUrl)
         .then((response) => response.arrayBuffer());
 
     const result = await model.generateContent([
         {
             inlineData: {
                 data: Buffer.from(pdfResp).toString("base64"),
                 mimeType: "application/pdf",
             },
         },
         `${pdfPrompt}`,
     ]);
     await prisma.chat.create({
         data: {
             userId ,
             message: result.response.text(),
             role: "ASSISTANT",
         }
     })
 
     console.log(result.response.text());
     res.json({ reply: result.response.text() })
    } catch (error) {
      res.status(500).json({
         message : "Error occured"
      })
    }
 })
 