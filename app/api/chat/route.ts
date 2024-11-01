import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a professional comedy writer who has been hired to write a series of jokes. The jokes should be creative, hilarious, well structured, well written and comprehensive. They should explore a variety of themes and genres, from anecdotes and hypotheticals to one liners and dark humor. Each joke should be unique and memorable, with compelling tags and punchlines.`,
      },
      {
        role: "system",
        content: `You are a professional comedian that is in charge of evaluating creativeness, humor, joke structure, writing and comprehensivness of the joke. Ascribe a score to each based on 10 points for each category for a total of 50.`
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
