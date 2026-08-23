import { EmailGenerateRequest } from "../types/email";


const MAX_CONTEXT_LENGTH = 1500;

export function ValidateEmailRequest(data: EmailGenerateRequest): string | null {
    if(!data.purpose?.trim()) {
        return "Purpose is required.";
    }
    if(!data.recipient?.trim()) {
        return "Recipient is required.";
    }
    if(!data.context?.trim()) {
        return "Context is required.";
    }
    if(data.context.length > MAX_CONTEXT_LENGTH) {
        return `Context is too long. Maximum length is ${MAX_CONTEXT_LENGTH} characters.`;
    }
    return null;
}