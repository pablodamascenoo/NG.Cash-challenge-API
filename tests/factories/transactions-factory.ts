import { User } from "@prisma/client";
import prisma from "../../src/config/database.js";
import { createUser } from "./users-factory.js";

export async function createTransaction(value: number, user?: User) {
  const firstUser = user || (await createUser());
  const secondUser = await createUser();

  const transaction = await prisma.$transaction([
    prisma.account.update({
      where: { id: firstUser.accountId },
      data: { balance: { decrement: value } },
    }),
    prisma.account.update({
      where: {
        id: secondUser.accountId,
      },
      data: {
        balance: {
          increment: value,
        },
      },
    }),
    prisma.transaction.create({
      data: {
        debitedAccountId: firstUser.accountId,
        creditedAccountId: secondUser.accountId,
        value,
      },
    }),
  ]);

  return transaction;
}
