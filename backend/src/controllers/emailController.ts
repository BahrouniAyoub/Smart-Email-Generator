import type {
  EmailGenerateRequest,
  RewriteEmailRequest,
} from "../types/email";

import type { Response } from "express";

import {
  deleteEmailById,
  generateEmailWithAi,
  getUserEmailById,
  getUserEmails,
  rewriteEmailWithAi,
} from "../services/emailService";

import { ValidateEmailRequest } from "../utils/validateEmailRequest";

import type {
  AuthenticatedRequest,
} from "../middleWare/authMiddleWare";

export async function getEmail(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const userId = req.user!.userId;

    const emails =
      await getUserEmails(userId);

    return res
      .status(200)
      .json(emails);
  } catch (error) {
    console.error(
      "Get emails error:",
      error
    );

    return res.status(500).json({
      error: "Failed to load history.",
    });
  }
}

export async function getEmailByIdController(
  req: AuthenticatedRequest,
  res: Response
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid email id.",
    });
  }

  const userId = req.user!.userId;

  try {
    const email =
      await getUserEmailById(
        id,
        userId
      );

    if (!email) {
      return res.status(404).json({
        error: "Email not found.",
      });
    }

    return res
      .status(200)
      .json(email);
  } catch (error) {
    console.error(
      "Get email error:",
      error
    );

    return res.status(500).json({
      error: "Failed to load email.",
    });
  }
}

export async function deleteEmail(
  req: AuthenticatedRequest,
  res: Response
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid email id.",
    });
  }

  const userId = req.user!.userId;

  try {
    const result =
      await deleteEmailById(
        id,
        userId
      );

    if (result.count === 0) {
      return res.status(404).json({
        error: "Email not found.",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(
      "Delete email error:",
      error
    );

    return res.status(500).json({
      error: "Failed to delete email.",
    });
  }
}

export async function generateEmail(
  req: AuthenticatedRequest,
  res: Response
) {
  const data =
    req.body as EmailGenerateRequest;

  const validationError =
    ValidateEmailRequest(data);

  if (validationError) {
    return res.status(400).json({
      error: validationError,
    });
  }

   if (!req.user) {
    return res.status(401).json({
      error: "Authentication required.",
    });
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
    console.error(
      "Generate email error:",
      error
    );

    return res.status(500).json({
      error: "Failed to generate email.",
    });
  }
}

export async function rewriteEmail(
  req: AuthenticatedRequest,
  res: Response
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
    console.error(
      "Rewrite email error:",
      error
    );

    return res.status(500).json({
      error: "Failed to rewrite email.",
    });
  }
}