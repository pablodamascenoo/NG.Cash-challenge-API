import prisma from "../config/database.js";

async function createAccount() {
  const account = await prisma.account.create({
    data: {},
  });

  return account;
}

const accountRepository = {
  createAccount,
};

export default accountRepository;
