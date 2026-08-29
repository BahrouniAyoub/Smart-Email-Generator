import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body ?? {}

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const user = await registerUser(name, email, password)
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to register user." });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const result = await loginUser(email, password)
        return res.status(200).json(result)
    } catch (error) {
        if (
            error instanceof Error &&
            error.message ===
            "INVALID_CREDENTIALS"
        ) {
            return res.status(401).json({
                error:
                    "Invalid email or password.",
            });
        }

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            error: "Login failed.",
        });
    }
}
