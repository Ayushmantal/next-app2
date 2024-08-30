import openai from "@/lib/openai/client";
import redis from "@/lib/redis/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "hi this is ayush",
  });

  const transcription = await redis.echo("hello");

  const res1 = await redis.hset("video 1", {
    name: "name 1",
    descr: "Descriptin 1",
  });

  //const res2 = await redis.

  const transcription2 = await redis.hgetall("video");

  console.log(transcription + " " + transcription2);

  return NextResponse.json(embedding.data[0].embedding, { status: 201 });
}
