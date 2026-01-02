import { authMiddleware } from './../middlewares/auth.niddleware';
import { Router } from "express";
import { loginUser, logout, registerUser } from "../controllers/user.controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authMiddleware,logout);


export default router;