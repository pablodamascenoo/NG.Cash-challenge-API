import accountRepository from "../repositories/accountRepository.js";
import transactionRepository from "../repositories/transactionRepository.js";
import userRepository from "../repositories/userRepository.js";

async function createTransaction(
  debitedAccountId: number,
  creditedUsername: string,
  value: number
) {
  const foundUser = await userRepository.findByUsername(creditedUsername);
  if (!foundUser) throw { status: 404, message: "user not found" };

  if (debitedAccountId === foundUser.accountId)
    throw { status: 401, message: "cannot transfer to yourself" };

  const debitedAccount = await accountRepository.getById(debitedAccountId);
  if (debitedAccount.balance < value)
    throw { status: 401, message: "insufficient funds" };

  await transactionRepository.createTransaction({
    debitedAccountId,
    creditedAccountId: foundUser.accountId,
    value,
  });
}

async function getTransactions(userId: number, date: string, type: string) {
  const transactions = await transactionRepository.getTransactions(
    userId,
    date,
    type
  );

  return transactions;
}

const transactionService = {
  createTransaction,
  getTransactions,
};

export default transactionService;
