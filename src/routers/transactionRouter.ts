import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import verifyToken from "../middlewares/tokenValidator.js";
import { transactionSchema } from "../schemas/transactionSchema.js";

const transactionRouter = Router();

transactionRouter
  .post(
    "/transaction",
    verifyToken,
    schemaValidator(transactionSchema),
    transactionController.createTransaction
  )
  .get("/transactions", verifyToken, transactionController.getTransactions);

export default transactionRouter;
