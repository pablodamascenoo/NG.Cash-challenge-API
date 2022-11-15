import { Request, Response } from "express";
import authService from "../services/authService.js";

async function signUp(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } =
    req.body;

  await authService.createUser({ username, password });
  return res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } =
    req.body;

  const token = await authService.signIn({ username, password });
  return res.send({ token });
}

const authController = {
  signUp,
  signIn,
};

export default authController;
