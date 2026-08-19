export interface EmailFormData {
    purpose : string;
    recipient: string;
    context: string;
    tone: string;
    language: string;
    length: string
}

export interface GeneratedEmailData {
    subject : string;
    body: string;
}