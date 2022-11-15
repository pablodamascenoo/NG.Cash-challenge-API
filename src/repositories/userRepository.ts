import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type UserSchemaSignIn = Omit<User, "id" | "accountId">;
export type UserSchemaSignUp = UserSchemaSignIn & { confirmPassword: string };

async function insert(userData: UserSchemaSignIn, accountId: number) {
  await prisma.user.create({
    data: {
      username: userData.username,
      password: userData.password,
      accountId,
    },
  });
}

async function findByUsername(username: string) {
  const findUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  return findUser;
}

const userRepository = {
  insert,
  findByUsername,
};

export default userRepository;
