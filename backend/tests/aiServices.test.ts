import { beforeEach, describe, expect, it, vi } from "vitest";

describe("callLLM", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
    process.env.GROQ_API_KEY = "test-groq-key";
    process.env.JWT_SECRET = "test-jwt-secret";
    process.env.FRONTEND_URL = "http://localhost:5173";
  });

  it("returns Groq message content and sends the expected POST request", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: "SUBJECT: Test Subject\nBODY: Test Body",
            },
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { callLLM } = await import("../src/services/aiServices");

    const content = await callLLM([
      {
        role: "user",
        content: "Write a test email",
      },
    ]);

    expect(content).toBe("SUBJECT: Test Subject\nBODY: Test Body");
    expect(fetchMock).toHaveBeenCalledOnce();

    const [, options] = fetchMock.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(options.headers.Authorization).toMatch(/^Bearer /);
  });

  it("throws when Groq returns a failed response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const { callLLM } = await import("../src/services/aiServices");

    await expect(
      callLLM([
        {
          role: "user",
          content: "Write a test email",
        },
      ])
    ).rejects.toThrow("Groq API error: 500");
  });
});
