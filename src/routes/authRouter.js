import { signIn, signUp } from "../controllers/authController.js";
import { Router } from "express";
import validateSignUpSchema from "../middlewares/validateSignUpSchema.js";
import validateSignInSchema from "../middlewares/validateSignInSchema.js";

const router = Router();

router.post("/sign-up", validateSignUpSchema, signUp);
router.post("/sign-in", validateSignInSchema, signIn);

export default router;
