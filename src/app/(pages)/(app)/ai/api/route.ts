import { NextResponse } from "next/server";
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { dataNonNull, errorObject } from "@utils/returnObjects";
import { isAdmin } from "@utils/server/roles";
import { getUser } from "@utils/server/auth";

export const dynamic = 'force-dynamic';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
 
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const admin = await isAdmin()
    const user = await getUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { data: props, error } = await getBodyProps(body, admin) 
    if (error) return new NextResponse(error.message, { status: error.status })

    if (!validateMessages(props.messages, admin)) return new NextResponse("Maximum message length exceeded", { status: 400 })
    
    const response = await openai.chat.completions.create({
      model: props.model,
      stream: true,
      messages: props.messages,
      user: user.id,
      n: 1,
      max_tokens: admin ? undefined : 2048,
    })
   
    const stream = OpenAIStream(response)
   
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log(error)
    return new NextResponse("Unknown error occured", { status: 500 })
  }
}

async function getBodyProps(body: any, admin: boolean) {
  try {
    if (!Object.hasOwn(body, 'messages')) return errorObject({ message: "no messages", status: 400 })
    const messages = body.messages;
    if (!Array.isArray(messages)) return errorObject({ message: "no message array", status: 400 })

    const props = {
      model: 'gpt-3.5-turbo',
      messages,
    }

    if (Object.hasOwn(body, 'uselatest') && body.uselatest === true) {
      if (!admin) return errorObject({ message: "Cannot change model", status: 401 })
      else props.model = 'gpt-4-turbo'
    }

    return dataNonNull(props)
  } catch (error) {
    return errorObject({ message: "Unknown error occured", status: 500 })
  }
}

function validateMessages(messages: any[], admin: boolean) {
  try {
    if (admin) return true;

    if (messages.length > 100) return false; 
    if (messages.at(-1).role !== 'user') return false; 
    if (messages.at(-1).length > 5_000) return false; 

    const totalLength = messages.reduce((acc, message) => acc + message.length, 0)
    if (totalLength > 10_000) return false;

    return true;
  } catch (error) {
    return false;
  }
}
