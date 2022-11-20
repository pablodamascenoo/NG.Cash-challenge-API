import { UserSchemaSignUp } from "../../src/repositories/userRepository.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import prisma from "../../src/config/database.js";
import { User } from "@prisma/client";

export function createValidBody() {
  const password = faker.internet.password();
  const username = faker.name.firstName();

  const data: UserSchemaSignUp = {
    username,
    password,
    confirmPassword: password,
  };

  return data;
}

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(8);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  const account = await prisma.account.create({ data: {} });

  return prisma.user.create({
    data: {
      username: params.username || faker.name.firstName(),
      password: hashedPassword,
      accountId: account.id,
    },
  });
}
