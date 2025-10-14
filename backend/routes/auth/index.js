import { Router } from "express";
import { createUser, loginUser } from "../../controller/auth";

const router = Router();

router.route("/").post(createUser);
router.post("/login",loginUser);

export {router};