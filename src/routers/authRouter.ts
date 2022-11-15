import { Router } from "express";
import authController from "../controllers/authController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter
  .post("/auth/sign-up", schemaValidator(signUpSchema), authController.signUp)
  .post("/auth/sign-in", schemaValidator(signInSchema), authController.signIn);

export default authRouter;
