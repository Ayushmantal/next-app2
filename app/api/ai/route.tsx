import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //organization: "org-0u3patGzQVcOO5TNRKrSAOsL",
  //project: "proj_5Y83hA6ctR6EeYdeZeuxFj73",
});

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json(),
    response_format = { type: "json_object" };
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Tell me about eggs in 10 words",
      },
    ],
  });

  const desc = await completion.choices[0].message;

  const newDesc = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      provider: desc.content,
    },
  });

  return NextResponse.json(newDesc, { status: 201 });

  //return NextResponse.json(completion.choices[0].message.content);
}
