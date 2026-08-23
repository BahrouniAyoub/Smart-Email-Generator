import type {
  EmailGenerateRequest,
  GeneratedEmail,
  RewriteEmailRequest,
} from "../types/email";


import { buildEmailPrompt, buildRewritePrompt } from "../prompts/emailPrompt";
import { callLLM } from "./aiServices";


function parseGeneratedEmail(
  response: string
): GeneratedEmail {
  const subjectMatch =
    response.match(/SUBJECT:\s*(.+)/i);

  const bodyMatch =
    response.match(/BODY:\s*([\s\S]+)/i);

  if (!subjectMatch || !bodyMatch) {
    throw new Error(
      "Invalid AI response format"
    );
  }

  return {
    subject: subjectMatch[1].trim(),
    body: bodyMatch[1].trim(),
  };
}


export async function generateEmailWithAi(
  data: EmailGenerateRequest
): Promise<GeneratedEmail> {
  const prompt = buildEmailPrompt(data);

  const result = await callLLM([
    {
      role: "system",
      content: "You are a helpful assistant that writes professional emails.",
    },
    {
      role: "user",
      content: prompt,
    }
  ]); 

  return parseGeneratedEmail(result);
}


export function generateFakeEmail(
  data: EmailGenerateRequest
): GeneratedEmail {
  return {
    subject: `Regarding: ${data.purpose}`,
    body: `Hello ${data.recipient},

This is a fake ${data.tone.toLowerCase()} email.

Context:
${data.context}

Language: ${data.language}
Length: ${data.length}

Best regards,
Ayoub`,
  };
}


export async function rewriteEmailWithAi(data: RewriteEmailRequest): Promise<GeneratedEmail> {
  const prompt = buildRewritePrompt(data);
  const response = await callLLM([
    {
      role: "system",
      content: "You are a helpful assistant that rewrites emails.",
    },
    {
      role: "user",
      content: prompt,
    }
  ]);
  return JSON.parse(response) as GeneratedEmail;
}