import type { EmailFormData, GeneratedEmailData, RewriteEmailRequest } from "../types/email";

export async function generateEmail( data: EmailFormData): Promise<GeneratedEmailData> {
    const API_URL = "http://localhost:3000";
    const response = await fetch(`${API_URL}/api/emails/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate email.")
    }
    const result: GeneratedEmailData = await response.json();
    return result 
}

export async function rewriteEmail( data: RewriteEmailRequest): Promise<GeneratedEmailData> {
    const API_URL = "http://localhost:3000";
    const response = await fetch(`${API_URL}/api/emails/rewrite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to rewrite email.")
    }
    const result: GeneratedEmailData = await response.json();
    return result 
}