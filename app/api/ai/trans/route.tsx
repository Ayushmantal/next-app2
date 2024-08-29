import { createReadStream, writeFile, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_API_KEY,
  project: process.env.OPENAI_PROJECT_API_KEY,
});

export async function POST(request: NextRequest, response: NextResponse) {
  const readFilePath = process.cwd() + "/public/audio/emotions.mp3";
  const readFile = createReadStream(readFilePath);

  const transcription = await openai.audio.transcriptions.create({
    file: readFile,
    model: "whisper-1",
    response_format: "json",
  });

  const transcribedText = transcription.text;
  const writeFilePath = process.cwd() + "/public/text/emotions.txt";
  writeFileSync(writeFilePath, transcribedText);

  return NextResponse.json(transcription, { status: 201 });
}
