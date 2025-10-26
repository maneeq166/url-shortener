import { Router } from "express";
import { createUser, getUser, loginUser } from "../../controller/auth/index.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/",createUser);
authRouter.post("/login",loginUser);
authRouter.get("/",authMiddleware,getUser);

export default authRouter;