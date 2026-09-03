import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createAuthToken } from "./helpers/auth";

const emailServiceMock = vi.hoisted(() => {
  process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
  process.env.GROQ_API_KEY = "test-groq-key";
  process.env.JWT_SECRET = "test-jwt-secret";
  process.env.FRONTEND_URL = "http://localhost:5173";

  return {
    deleteEmailById: vi.fn(),
    generateEmailWithAi: vi.fn(),
    getUserEmailById: vi.fn(),
    getUserEmails: vi.fn(),
    rewriteEmailWithAi: vi.fn(),
  };
});

vi.mock("../src/services/emailService", () => emailServiceMock);

import { app } from "../src/app";

const validGenerateRequest = {
  purpose: "Follow up after a meeting",
  recipient: "Sam",
  context: "Thank Sam for their time and ask about next steps.",
  tone: "Professional",
  language: "English",
  length: "Short",
};

describe("email routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a consistent 401 error for unauthenticated email history requests", async () => {
    const response = await request(app).get("/api/emails");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        message: "Authentication required.",
        code: "AUTHENTICATION_REQUIRED",
      },
    });
    expect(emailServiceMock.getUserEmails).not.toHaveBeenCalled();
  });

  it("returns 400 and does not call AI when required generation fields are missing", async () => {
    const response = await request(app)
      .post("/api/emails/generate")
      .set("Authorization", `Bearer ${createAuthToken()}`)
      .send({
        ...validGenerateRequest,
        purpose: "",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: "Purpose is required.",
        code: "INVALID_EMAIL_INPUT",
      },
    });
    expect(emailServiceMock.generateEmailWithAi).not.toHaveBeenCalled();
  });

  it("returns 400 and does not call AI for an unsupported tone", async () => {
    const response = await request(app)
      .post("/api/emails/generate")
      .set("Authorization", `Bearer ${createAuthToken()}`)
      .send({
        ...validGenerateRequest,
        tone: "Pirate",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: "Unsupported tone.",
        code: "INVALID_EMAIL_INPUT",
      },
    });
    expect(emailServiceMock.generateEmailWithAi).not.toHaveBeenCalled();
  });

  it("returns 400 and does not call AI for an unsupported language", async () => {
    const response = await request(app)
      .post("/api/emails/generate")
      .set("Authorization", `Bearer ${createAuthToken()}`)
      .send({
        ...validGenerateRequest,
        language: "Klingon",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: "Unsupported language.",
        code: "INVALID_EMAIL_INPUT",
      },
    });
    expect(emailServiceMock.generateEmailWithAi).not.toHaveBeenCalled();
  });

  it("returns generated subject and body for a valid authenticated generation request", async () => {
    emailServiceMock.generateEmailWithAi.mockResolvedValue({
      subject: "Test Subject",
      body: "Test Body",
    });

    const response = await request(app)
      .post("/api/emails/generate")
      .set("Authorization", `Bearer ${createAuthToken(456)}`)
      .send(validGenerateRequest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      subject: "Test Subject",
      body: "Test Body",
    });
    expect(emailServiceMock.generateEmailWithAi).toHaveBeenCalledWith(
      validGenerateRequest,
      456
    );
  });

  it("returns a safe server error when generation fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    emailServiceMock.generateEmailWithAi.mockRejectedValue(
      new Error("Groq API error: 500 secret-token")
    );

    const response = await request(app)
      .post("/api/emails/generate")
      .set("Authorization", `Bearer ${createAuthToken()}`)
      .send(validGenerateRequest);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: {
        message: "Internal server error.",
        code: "INTERNAL_SERVER_ERROR",
      },
    });
    expect(JSON.stringify(response.body)).not.toContain("Groq API error");
    expect(JSON.stringify(response.body)).not.toContain("secret-token");
    expect(JSON.stringify(response.body)).not.toContain("stack");
  });
});
