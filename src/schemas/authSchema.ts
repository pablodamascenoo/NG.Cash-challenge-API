import Joi from "joi";
import {
  UserSchemaSignIn,
  UserSchemaSignUp,
} from "../repositories/userRepository.js";

export const signUpSchema = Joi.object<UserSchemaSignUp>({
  username: Joi.string().min(3).required(),
  password: Joi.string()
    .min(8)
    .pattern(/(?=.*\d)(?=.*[A-Z])/)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.required": "passwords must match" }),
});

export const signInSchema = Joi.object<UserSchemaSignIn>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
