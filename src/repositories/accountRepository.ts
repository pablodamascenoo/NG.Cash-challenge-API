import prisma from "../config/database.js";

async function createAccount() {
  const account = await prisma.account.create({
    data: {},
  });

  return account;
}

async function getById(id: number) {
  const account = await prisma.account.findFirst({
    where: {
      id,
    },
  });

  return account;
}

const accountRepository = {
  getById,
  createAccount,
};

export default accountRepository;
