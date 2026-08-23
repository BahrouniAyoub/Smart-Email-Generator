export interface EmailGenerateRequest {
  purpose: string;
  recipient: string;
  context: string;
  tone: string;
  language: string;
  length: string;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
}

export type allowedActions = "shorten" | "expand" | "formal" | "friendly" | "grammar"

export interface RewriteEmailRequest {
    subject: string;
    body: string;
    action: allowedActions;
}