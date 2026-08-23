import { EmailGenerateRequest, RewriteEmailRequest } from "../types/email";
import { Request, Response } from "express";
import { generateEmailWithAi, generateFakeEmail, rewriteEmailWithAi } from "../services/emailService";
import { ValidateEmailRequest } from "../utils/validateEmailRequest";

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
        res.status(500).json({error: "Failed to generate email."});
    }
}

export async function rewriteEmail(req:Request, res:Response) {
    const data = req.body as RewriteEmailRequest;

    try{
        const rewrittenEmail = await rewriteEmailWithAi(data);
        res.status(200).json(rewrittenEmail);
    }catch(error){
        res.status(500).json({error: "Failed to rewrite email."});
    }
}