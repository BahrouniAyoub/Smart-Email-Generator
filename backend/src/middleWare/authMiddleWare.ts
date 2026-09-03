import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest
  extends Request {
  user?: JwtPayload;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return next(new AppError(
      "Authentication required.",
      401,
      "AUTHENTICATION_REQUIRED"
    ));
  }

  const [type, token] =
    authHeader.split(" ");

  if (
    type !== "Bearer" ||
    !token
  ) {
    return next(new AppError(
      "Invalid authorization header.",
      401,
      "INVALID_AUTHORIZATION_HEADER"
    ));
  }

  const secret =
    env.jwtSecret;

  if (!secret) {
    return next(new Error(
      "JWT_SECRET is not configured"
    ));
  }

  try {
    const payload =
      jwt.verify(
        token,
        secret
      ) as {
        userId: number;
        email: string;
      };

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch {
    return next(new AppError(
      "Your session has expired. Please log in again.",
      401,
      "INVALID_OR_EXPIRED_TOKEN"
    ));
  }
}
