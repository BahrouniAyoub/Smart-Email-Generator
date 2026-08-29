import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";

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
    return res.status(401).json({
      error:
        "Authentication required.",
    });
  }

  const [type, token] =
    authHeader.split(" ");

  if (
    type !== "Bearer" ||
    !token
  ) {
    return res.status(401).json({
      error:
        "Invalid authorization header.",
    });
  }

  const secret =
    process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      error:
        "JWT secret not configured.",
    });
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
    return res.status(401).json({
      error:
        "Invalid or expired token.",
    });
  }
}