import openai from "@/lib/openai/client";
import prisma from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json(),
    response_format = { type: "json_object" };

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",

    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Tell me about ${body.name} in 20 words`,
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
