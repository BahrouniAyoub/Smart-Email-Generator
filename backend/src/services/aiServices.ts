import { env } from "../config/env";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

const model = "openai/gpt-oss-20b"


interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callLLM(
  messages: GroqMessage[]
): Promise<string> {
  const apiKey = env.groqApiKey;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured"
    );
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages,
        temperature: 0.7,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Groq API error: ${response.status}`
    );
  }

  const data = await response.json();

  return data.choices[0].message.content;
}