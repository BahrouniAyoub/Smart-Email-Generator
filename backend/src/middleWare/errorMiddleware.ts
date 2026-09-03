import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

function getErrorCode(statusCode: number) {
    if (statusCode === 400) {
        return "BAD_REQUEST";
    }

    if (statusCode === 401) {
        return "UNAUTHORIZED";
    }

    if (statusCode === 403) {
        return "FORBIDDEN";
    }

    if (statusCode === 404) {
        return "NOT_FOUND";
    }

    if (statusCode === 429) {
        return "RATE_LIMIT_EXCEEDED";
    }

    return "INTERNAL_SERVER_ERROR";
}

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
                code: error.code ?? getErrorCode(error.statusCode),
            },
        });
    }

    console.error({
        timestamp: new Date().toISOString(),
        message: error.message,
        method: req.method,
        path: req.originalUrl,
        stack: error.stack,
    });

    return res.status(500).json({
        error: {
            message: "Internal server error.",
            code: "INTERNAL_SERVER_ERROR",
        },
    });
}
