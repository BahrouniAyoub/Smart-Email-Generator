import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../src/app";
import { createTestToken } from "./helpers/auth";

describe("Email routes", () => {
    it("returns 401 when email history is requested without authentication", async () => {
        const response = await request(app)
            .get("/api/emails");

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            error: {
                message: "Authentication required.",
                code: expect.any(String),
            },
        });
    });

    it("returns 401 when generation is attempted without authentication", async () => {
        const token = createTestToken()

        const response = await request(app)
            .post("/api/emails/generate")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                purpose: "",
                recipient: "",
                context: "",
                
            });

        expect(response.status).toBe(400);
    });


});