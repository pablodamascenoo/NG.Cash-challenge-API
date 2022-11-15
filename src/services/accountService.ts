import accountRepository from "../repositories/accountRepository.js";

async function getBalance(accountId: number) {
  const account = await accountRepository.getById(accountId);
  return account.balance;
}

const accountService = {
  getBalance,
};

export default accountService;
