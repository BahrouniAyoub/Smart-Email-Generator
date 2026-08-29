import type {
  EmailGenerateRequest,
  GeneratedEmail,
  RewriteEmailRequest,
} from "../types/email";

import {
  buildEmailPrompt,
  buildRewritePrompt,
} from "../prompts/emailPrompt";

import { callLLM } from "./aiServices";
import { prisma } from "../lib/prisma";

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

export async function getUserEmails(
  userId: number
) {
  return prisma.email.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserEmailById(
  id: number,
  userId: number
) {
  return prisma.email.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function deleteEmailById(
  id: number,
  userId: number
) {
  return prisma.email.deleteMany({
    where: {
      id,
      userId,
    },
  });
}

export async function generateEmailWithAi(
  data: EmailGenerateRequest,
  userId: number
): Promise<GeneratedEmail> {
  const prompt =
    buildEmailPrompt(data);

  const result = await callLLM([
    {
      role: "system",
      content:
        "You are a helpful assistant that writes professional emails.",
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  const generatedEmail =
    parseGeneratedEmail(result);

  const savedEmail =
    await prisma.email.create({
      data: {
        subject:
          generatedEmail.subject,

        body:
          generatedEmail.body,

        purpose:
          data.purpose,

        recipient:
          data.recipient,

        tone:
          data.tone,

        language:
          data.language,

        length:
          data.length,

        userId,
      },
    });

  return savedEmail;
}

export async function rewriteEmailWithAi(
  data: RewriteEmailRequest
): Promise<GeneratedEmail> {
  const prompt =
    buildRewritePrompt(data);

  const response =
    await callLLM([
      {
        role: "system",
        content:
          "You are a helpful assistant that rewrites emails.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

  return JSON.parse(
    response
  ) as GeneratedEmail;
}