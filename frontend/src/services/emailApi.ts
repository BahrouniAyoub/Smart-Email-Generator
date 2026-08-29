import type {
  EmailFormData,
  EmailHistoryItem,
  GeneratedEmailData,
  RewriteEmailRequest,
} from "../types/email";

const API_URL = "http://localhost:3000";


export async function getEmails(
  token: string
): Promise<EmailHistoryItem[]> {
  const response = await fetch(
    `${API_URL}/api/emails`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.error ||
        "Failed to load email history."
    );
  }

  const result: EmailHistoryItem[] =
    await response.json();

  return result;
}


export async function deleteEmail(
  id: number,
  token: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/emails/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.error ||
        "Failed to delete email."
    );
  }
}


export async function generateEmail(
  data: EmailFormData,
  token: string
): Promise<GeneratedEmailData> {
  const response = await fetch(
    `${API_URL}/api/emails/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.error ||
        "Failed to generate email."
    );
  }

  const result: GeneratedEmailData =
    await response.json();

  return result;
}


export async function rewriteEmail(
  data: RewriteEmailRequest,
  token: string
): Promise<GeneratedEmailData> {
  const response = await fetch(
    `${API_URL}/api/emails/rewrite`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.error ||
        "Failed to rewrite email."
    );
  }

  const result: GeneratedEmailData =
    await response.json();

  return result;
}