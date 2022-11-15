import Joi from "joi";
import { TransactionInsertData } from "../repositories/transactionRepository.js";

export const transactionSchema = Joi.object<TransactionInsertData>({
  username: Joi.string().min(3).required(),
  value: Joi.number().min(1).required(),
});
