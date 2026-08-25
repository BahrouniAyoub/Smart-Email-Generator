import { EmailGenerateRequest, RewriteEmailRequest } from "../types/email";
import { Request, Response } from "express";
import { deleteEmailById, generateEmailWithAi, getUserEmailById, getUserEmails, rewriteEmailWithAi } from "../services/emailService";
import { ValidateEmailRequest } from "../utils/validateEmailRequest";
import { prisma } from "../lib/prisma";



export async function getEmail(req: Request, res: Response) {
    try {
        const emails = await getUserEmails(2)
        return res.status(200).json(emails)
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: "Failed to load history." });
    }
}

export async function getEmailByIdController(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid email id" });
    }
    try {
        const email = await getUserEmailById(id);
        return res.status(200).json(email);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to load email." });
    }
}

export async function deleteEmail(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid email id" });
    }
    try {
        const email = await deleteEmailById(id);
        return res.status(200).json(email);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete email." });
    }
}
export async function generateEmail(
    req: Request,
    res: Response
) {
    const data = req.body as EmailGenerateRequest;

    const validationError = ValidateEmailRequest(data);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }


    try {
        const generatedEmail = await generateEmailWithAi(data);

        console.log("Generated Email:", generatedEmail);
        res.status(200).json(generatedEmail);
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

export async function rewriteEmail(req: Request, res: Response) {
    const data = req.body as RewriteEmailRequest;

    try {
        const rewrittenEmail = await rewriteEmailWithAi(data);
        res.status(200).json(rewrittenEmail);
    } catch (error) {
        res.status(500).json({ error: "Failed to rewrite email." });
    }
}