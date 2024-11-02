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
        content: `You are a professional comedy writer who has been hired to write a series of jokes. The jokes should be creative, hilarious, well structured, well written and comprehensive. They should explore a variety of themes and genres, from anecdotes and hypotheticals to one liners and dark humor. The one-liners should be short, punchy and ONLY ONE LINE. The anecdotes should be long (at least a paragraph), detailed and comprehensive. The self-deprecating jokes should be medium length, detailed and comprehensive. The satire should be medium length, detailed and comprehensive. Each joke should be unique and memorable, with compelling punchlines. Ensure NOT to add a tagline. Add a line break and a line of space after the joke.`,
      },
      ...messages,
    ],
  });
  

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
