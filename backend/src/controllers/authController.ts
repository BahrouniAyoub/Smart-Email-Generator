import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";
import { validateLoginInput, validateRegisterInput } from "../utils/validateAuthRequest";
import { AppError } from "../utils/AppError";

export async function register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body ?? {}


    try {
        const validationError =
            validateRegisterInput(req.body);

        if (validationError) {
            return next(new AppError(
                validationError,
                400,
                "INVALID_REGISTRATION_INPUT"
            ));
        }

        const user = await registerUser(name, email, password)
        return res.status(200).json(user)
    } catch (error) {
        return next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body ?? {}
    try {
        const validationError =
            validateLoginInput(req.body);

        if (validationError) {
            return next(new AppError(
                validationError,
                400,
                "INVALID_LOGIN_INPUT"
            ));
        }

        const trimEmail = email.trim().toLowerCase();

        const result = await loginUser(trimEmail, password)
        return res.status(200).json(result)
    } catch (error) {
        return next(error);
    }
}
