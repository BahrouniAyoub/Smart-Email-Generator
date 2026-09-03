import type {
  EmailGenerateRequest,
  RewriteEmailRequest,
} from "../types/email";

import type { Response } from "express";
import type { NextFunction } from "express";

import {
  deleteEmailById,
  generateEmailWithAi,
  getUserEmailById,
  getUserEmails,
  rewriteEmailWithAi,
} from "../services/emailService";

import { ValidateEmailRequest } from "../utils/validateEmailRequest";
import { AppError } from "../utils/AppError";

import type {
  AuthenticatedRequest,
} from "../middleWare/authMiddleWare";

export async function getEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.userId;

    const emails =
      await getUserEmails(userId);

    return res
      .status(200)
      .json(emails);
  } catch (error) {
    return next(error);
  }
}

export async function getEmailByIdController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError(
      "Invalid email id.",
      400,
      "INVALID_EMAIL_ID"
    ));
  }

  const userId = req.user!.userId;

  try {
    const email =
      await getUserEmailById(
        id,
        userId
      );

    if (!email) {
      return next(new AppError(
        "Email not found.",
        404,
        "EMAIL_NOT_FOUND"
      ));
    }

    return res
      .status(200)
      .json(email);
  } catch (error) {
    return next(error);
  }
}

export async function deleteEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(new AppError(
      "Invalid email id.",
      400,
      "INVALID_EMAIL_ID"
    ));
  }

  const userId = req.user!.userId;

  try {
    const result =
      await deleteEmailById(
        id,
        userId
      );

    if (result.count === 0) {
      return next(new AppError(
        "Email not found.",
        404,
        "EMAIL_NOT_FOUND"
      ));
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

export async function generateEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const data =
    req.body as EmailGenerateRequest;

  const validationError =
    ValidateEmailRequest(data);

  if (validationError) {
    return next(new AppError(
      validationError,
      400,
      "INVALID_EMAIL_INPUT"
    ));
  }

   if (!req.user) {
    return next(new AppError(
      "Authentication required.",
      401,
      "AUTHENTICATION_REQUIRED"
    ));
  }

  const userId = req.user!.userId;

  try {
    const generatedEmail =
      await generateEmailWithAi(
        data,
        userId
      );

    return res
      .status(200)
      .json(generatedEmail);
  } catch (error) {
    return next(error);
  }
}

export async function rewriteEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const data =
    req.body as RewriteEmailRequest;

  try {
    const rewrittenEmail =
      await rewriteEmailWithAi(data);

    return res
      .status(200)
      .json(rewrittenEmail);
  } catch (error) {
    return next(error);
  }
}
