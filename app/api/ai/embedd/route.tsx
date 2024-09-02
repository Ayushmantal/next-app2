import openai from "@/lib/openai/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const embedding = await openai.embeddings.create({
    //default for 3 small is 1536 dimensions
    model: "text-embedding-3-small", //default is
    //dimensions:
    input: "health snack",
  });

  console.log(embedding.data[0].embedding.length);

  return NextResponse.json(embedding.data[0].embedding, { status: 201 });
}
