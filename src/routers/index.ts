import { Router } from "express";
import accountRouter from "./accountRouter.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use(authRouter).use(accountRouter);

export default router;
