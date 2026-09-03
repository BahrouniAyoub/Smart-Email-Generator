import { Router } from "express";
import { deleteEmail, generateEmail, getEmail, getEmailByIdController, rewriteEmail } from "../controllers/emailController";
import { requireAuth } from "../middleWare/authMiddleWare";
import { aiLimiter } from "../middleWare/rateLimitMiddleware";

const route = Router()

route.get("/",requireAuth, getEmail)
route.get("/:id",requireAuth, getEmailByIdController)

route.post("/generate",requireAuth, aiLimiter,  generateEmail);
route.post("/rewrite",requireAuth, aiLimiter, rewriteEmail);

route.delete("/:id",requireAuth, deleteEmail)

export default route;