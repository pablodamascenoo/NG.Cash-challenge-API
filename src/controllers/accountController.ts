import { Request, Response } from "express";
import accountService from "../services/accountService.js";

async function getBalance(req: Request, res: Response) {
  const { accountId } = res.locals.user;
  const balance = await accountService.getBalance(accountId);
  return res.send({ balance });
}

const accountController = {
  getBalance,
};

export default accountController;
