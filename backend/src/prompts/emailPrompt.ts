import { EmailGenerateRequest, RewriteEmailRequest } from '../types/email';

export function buildEmailPrompt(
    data: EmailGenerateRequest
): string {
    return `
Write a professional email using the following information.

Purpose: ${data.purpose}
Recipient: ${data.recipient}
Context: ${data.context}
Tone: ${data.tone}
Language: ${data.language}
Length: ${data.length}

Return exactly this format:

SUBJECT: <email subject>

BODY:
<email body>

Do not invent personal information that was not provided.
    
    `;
}




export function buildRewritePrompt(
  data: RewriteEmailRequest
): string {
  const instructions = {
    shorten:
      "Make the email shorter while preserving the important meaning.",

    expand:
      "Expand the email with useful detail without inventing information.",

    formal:
      "Rewrite the email in a more formal and professional tone.",

    friendly:
      "Rewrite the email in a warmer and friendlier tone while remaining professional.",

    grammar:
      "Correct grammar, spelling and awkward phrasing without changing the meaning.",
  };

  return `
Rewrite the following email.

Action:
${instructions[data.action]}

Subject:
${data.subject}

Body:
${data.body}

Important rules:
- Do not invent personal facts.
- Preserve the original intent.
- Preserve the original language unless necessary.
- Return valid JSON only.

Return exactly:

{
  "subject": "...",
  "body": "..."
}
`;
}