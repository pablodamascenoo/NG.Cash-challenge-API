import { Request, Response } from "express";
import transactionService from "../services/transactionService.js";

async function createTransaction(req: Request, res: Response) {
  const { accountId } = res.locals.user;
  const { username, value } = req.body;

  await transactionService.createTransaction(accountId, username, value);
  return res.sendStatus(201);
}

async function getTransactions(req: Request, res: Response) {
  const { type, date } = req.query;
  const { id } = res.locals.user;

  const transactions = await transactionService.getTransactions(
    id,
    date?.toString(),
    type?.toString()
  );

  return res.send(transactions);
}

const transactionController = {
  createTransaction,
  getTransactions,
};

export default transactionController;
