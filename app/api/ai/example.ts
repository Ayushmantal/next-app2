import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //organization: "org-0u3patGzQVcOO5TNRKrSAOsL",
  //project: "proj_5Y83hA6ctR6EeYdeZeuxFj73",
});




export default async function main(req: NextApiRequest, res: NextApiResponse) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });
//return res.json(completion)
  console.log(completion.choices[0].message);
}
