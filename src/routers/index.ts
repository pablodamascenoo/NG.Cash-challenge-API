import { Router } from "express";
import accountRouter from "./accountRouter.js";
import authRouter from "./authRouter.js";
import transactionRouter from "./transactionRouter.js";

const router = Router();

router.use(authRouter).use(accountRouter).use(transactionRouter);

export default router;
