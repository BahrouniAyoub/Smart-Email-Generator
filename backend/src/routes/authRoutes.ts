import { Router } from "express";
import { login, register } from "../controllers/authController";
import { authLimiter } from "../middleWare/rateLimitMiddleware";

const router = Router()


router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);


export default router