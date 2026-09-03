import jwt from "jsonwebtoken";

export function createAuthToken(userId = 123) {
  return jwt.sign(
    {
      userId,
      email: "test@example.com",
    },
    process.env.JWT_SECRET ?? "test-jwt-secret"
  );
}

export const createTestToken = createAuthToken;
