import { Router } from "express";
import { deleteEmail, generateEmail, getEmail, getEmailByIdController, rewriteEmail } from "../controllers/emailController";
import { requireAuth } from "../middleWare/authMiddleWare";

const route = Router()

route.get("/",requireAuth, getEmail)
route.get("/:id",requireAuth, getEmailByIdController)

route.post("/generate",requireAuth,  generateEmail);
route.post("/rewrite", rewriteEmail);

route.delete("/:id",requireAuth, deleteEmail)

export default route;