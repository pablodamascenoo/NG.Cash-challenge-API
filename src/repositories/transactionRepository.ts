import prisma from "../config/database.js";
import { Transaction } from "@prisma/client";
import dayjs from "dayjs";

type TransactionData = Omit<Transaction, "id" | "createdAt">;
export type TransactionInsertData = { username: string; value: number };

async function createTransaction(data: TransactionData) {
  await prisma.$transaction([
    prisma.account.update({
      where: { id: data.debitedAccountId },
      data: { balance: { decrement: data.value } },
    }),
    prisma.account.update({
      where: {
        id: data.creditedAccountId,
      },
      data: {
        balance: {
          increment: data.value,
        },
      },
    }),
    prisma.transaction.create({
      data,
    }),
  ]);
}

async function getTransactions(userId: number, date: string, type: string) {
  const filters: any = {
    where: {},
  };

  type === "cash-in"
    ? (filters.where.creditedAccountId = userId)
    : type === "cash-out"
    ? (filters.where.debitedAccountId = userId)
    : (filters.where.OR = [
        { creditedAccountId: userId },
        { debitedAccountId: userId },
      ]);

  const formatedDate = dayjs(date).format();
  if (formatedDate !== "Invalid Date" && date) {
    const dayAfter = dayjs(formatedDate).add(1, "day").format();

    filters.where.createdAt = { gte: formatedDate, lt: dayAfter };
  }

  const transactions = await prisma.transaction.findMany({
    where: filters.where,
  });

  return transactions;
}

const transactionRepository = {
  createTransaction,
  getTransactions,
};

export default transactionRepository;
