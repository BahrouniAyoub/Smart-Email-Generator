import { EmailGenerateRequest } from "../types/email";


const MAX_CONTEXT_LENGTH = 1500;
const SUPPORTED_TONES = [
    "Professional",
    "Format",
    "Friendly",
    "Casual",
    "Persuasive",
];
const SUPPORTED_LANGUAGES = [
    "English",
    "French",
    "Arabic",
];
const SUPPORTED_LENGTHS = [
    "Short",
    "Medium",
    "Long",
];

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
    if(!SUPPORTED_TONES.includes(data.tone)) {
        return "Unsupported tone.";
    }
    if(!SUPPORTED_LANGUAGES.includes(data.language)) {
        return "Unsupported language.";
    }
    if(!SUPPORTED_LENGTHS.includes(data.length)) {
        return "Unsupported length.";
    }
    return null;
}
