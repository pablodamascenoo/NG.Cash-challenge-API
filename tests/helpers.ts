import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "../src/config/database.js";
import { createUser } from "./factories/users-factory.js";

export async function cleanDb() {
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const data = { username: incomingUser.username };
  const config = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(data, process.env.JWT_SECRET, config);
  return token;
}
