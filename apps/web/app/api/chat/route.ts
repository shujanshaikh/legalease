import prisma from "db";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { SYSTEM_PROMPT } from "prompt/systemPrompt"


const apiKey = process.env.GEMINI_API_KEY

export async function POST(req: NextRequest) {
    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });


    const body = await req.json();
    const { message } = body;
    // const session = await getServerSession(authoptions);
    // const userId = session?.user?.id;    

    const userId = "123";

    if (!message) {
        NextResponse.json({
            message: "Invalid Data"
        })
        return
    }
    await prisma.chat.create({
        data: {
            userId,
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
   console.log("reached here")
   console.log(convo)
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages : convo
    });
 
    console.log(response)
    const reply = response.choices[0]?.message.content;

    await prisma.chat.create({
        data: {
            userId,
            role: "ASSISTANT",
            message: reply || ""
        }
    });

    return NextResponse.json({ reply });
}




