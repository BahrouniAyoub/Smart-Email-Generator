import { Router } from "express";
import { generateEmail, rewriteEmail } from "../controllers/emailController";

const route = Router()

route.post("/generate", generateEmail);
route.post("/rewrite", rewriteEmail);

export default route;