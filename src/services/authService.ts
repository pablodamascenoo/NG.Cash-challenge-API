import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import accountRepository from "../repositories/accountRepository.js";
import userRepository, {
  UserSchemaSignIn,
} from "../repositories/userRepository.js";

async function createUser(data: UserSchemaSignIn) {
  const foundUser = await userRepository.findByUsername(data.username);
  if (foundUser) throw { status: 409, message: "username already registered" };

  const cryptedPassword = cryptPassword(data.password);

  const account = await accountRepository.createAccount();
  await userRepository.insert(
    { username: data.username, password: cryptedPassword },
    account.id
  );
}

async function signIn(data: UserSchemaSignIn) {
  const foundUser = await userRepository.findByUsername(data.username);
  if (!foundUser) throw { status: 401, message: "invalid user/password" };

  comparePassword(data.password, foundUser.password);
  const token = genToken(data.username);
  return { username: data.username, token };
}

function cryptPassword(password: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
}

function comparePassword(password: string, cryptedPassword: string) {
  if (!bcrypt.compareSync(password, cryptedPassword))
    throw { status: 401, message: "invalid user/password" };
}

function genToken(username: string) {
  const data = { username };
  const config = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(data, process.env.JWT_SECRET, config);
  return token;
}

const authService = {
  createUser,
  signIn,
};

export default authService;
