import { Router } from "express";
import { deleteEmail, generateEmail, getEmail, getEmailByIdController, rewriteEmail } from "../controllers/emailController";

const route = Router()

route.get("/", getEmail)
route.get("/:id", getEmailByIdController)

route.post("/generate", generateEmail);
route.post("/rewrite", rewriteEmail);

route.delete("/:id", deleteEmail)

export default route;