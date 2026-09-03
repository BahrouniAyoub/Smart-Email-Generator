interface ApiErrorResponse {
  error?: {
    message?: unknown;
    code?: unknown;
  };
}

export async function getApiErrorMessage(
  response: Response | undefined,
  fallbackMessage: string
): Promise<string> {
  if (!response) {
    return fallbackMessage;
  }

  try {
    const data =
      (await response.json()) as ApiErrorResponse;

    const message = data.error?.message;
    const code = data.error?.code;

    if (code === "INTERNAL_SERVER_ERROR") {
      return fallbackMessage;
    }

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  } catch {
    return fallbackMessage;
  }

  return fallbackMessage;
}
