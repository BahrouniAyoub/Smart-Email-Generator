import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,

  message: {
    error: {
      message: "Too many authentication attempts. Please try again later.",
      code: "AUTH_RATE_LIMIT_EXCEEDED",
    },
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,

  message: {
    error: {
      message: "Too many AI requests. Please wait a moment and try again.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },

  standardHeaders: true,
  legacyHeaders: false,
});
