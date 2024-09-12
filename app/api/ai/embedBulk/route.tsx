import openai from "@/lib/openai/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import csv from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";

const filePath = process.cwd() + "/public/data/amazon.csv";

export async function POST(request: NextRequest, response: NextResponse) {
  // Read the CSV and extract the texts
  const texts = await readCSV(filePath);

  // Get embeddings for the texts
  const embeddings = await getEmbeddings(texts);

  // Write embeddings back to the CSV
  const success = await writeEmbeddingsToFile(filePath, texts, embeddings);
  //const success = "last function done";

  return NextResponse.json({ success }, { status: 201 });
}

async function readCSV(filePath: string): Promise<string[]> {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data.input)) // Assuming 'input' is the column with texts
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
    console.log("first function running");
  });
}

async function getEmbeddings(texts: string[]) {
  const embeddings = [];
  for (let text of texts) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    embeddings.push(embedding.data[0].embedding);
    console.log("embedding " + text);
  }
  console.log("embedding running");
  return embeddings;
}

async function writeEmbeddingsToFile(
  filePath: string,
  texts: string[],
  embeddings: number[][]
): Promise<boolean> {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "input", title: "Input" },
      { id: "values", title: "Values" },
    ],
    append: false, // Set to false to rewrite the file
  });

  const records = texts.map((text, index) => ({
    input: text,
    values: JSON.stringify(embeddings[index]),
  }));

  await csvWriter.writeRecords(records);
  return true;
}
