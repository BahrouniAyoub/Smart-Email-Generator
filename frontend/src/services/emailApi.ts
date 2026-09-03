import type {
  EmailFormData,
  EmailHistoryItem,
  GeneratedEmailData,
  RewriteEmailRequest,
} from "../types/email";

import { apiFetch } from "./apiFetch";
import { getApiErrorMessage } from "./getApiErrorMessage";

const API_URL = import.meta.env.VITE_API_URL;


export async function getEmails(
  token: string
): Promise<EmailHistoryItem[]> {
  let response: Response;

  try {
    response = await apiFetch(
      `${API_URL}/api/emails`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch {
    throw new Error(
      "Failed to load email history."
    );
  }

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(
        response,
        "Failed to load email history."
      )
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
  let response: Response;

  try {
    response = await apiFetch(
      `${API_URL}/api/emails/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch {
    throw new Error(
      "Unable to delete email."
    );
  }

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(
        response,
        "Unable to delete email."
      )
    );
  }
}


export async function generateEmail(
  data: EmailFormData,
  token: string
): Promise<GeneratedEmailData> {
  let response: Response;

  try {
    response = await apiFetch(
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
  } catch {
    throw new Error(
      "We couldn't generate your email. Please try again."
    );
  }

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(
        response,
        "We couldn't generate your email. Please try again."
      )
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
  let response: Response;

  try {
    response = await apiFetch(
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
  } catch {
    throw new Error(
      "We couldn't rewrite your email. Please try again."
    );
  }

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(
        response,
        "We couldn't rewrite your email. Please try again."
      )
    );
  }

  const result: GeneratedEmailData =
    await response.json();

  return result;
}
