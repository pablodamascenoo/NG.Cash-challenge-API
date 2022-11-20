import app from "../../src/app.js";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers.js";
import { createUser } from "../factories/users-factory.js";
import { faker } from "@faker-js/faker";
import { createTransaction } from "../factories/transactions-factory.js";

beforeAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /transaction", () => {
  it("should respond 401 on no token", async () => {
    const response = await server.post("/transaction");
    expect(response.status).toEqual(401);
  });
  it("should respond 422 on invalid body", async () => {
    const token = await generateValidToken();
    const response = await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(422);
  });
  it("should respond 404 on not found user", async () => {
    const token = await generateValidToken();
    const response = await server
      .post("/transaction")
      .send({ username: faker.name.firstName(), value: 50 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(404);
  });
  it("should respond 401 on sending to yourself", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const response = await server
      .post("/transaction")
      .send({ username: user.username, value: 50 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(401);
  });
  it("should respond 401 on insufficient funds", async () => {
    const user = await createUser();
    const secondUser = await createUser();
    const token = await generateValidToken(user);
    const response = await server
      .post("/transaction")
      .send({ username: secondUser.username, value: 50000 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(401);
  });
  it("should respond 200 on success transaction", async () => {
    const user = await createUser();
    const secondUser = await createUser();
    const token = await generateValidToken(user);
    const response = await server
      .post("/transaction")
      .send({ username: secondUser.username, value: 5000 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});

describe("GET /transactions", () => {
  it("should respond 401 on no token", async () => {
    const response = await server.get("/transactions");
    expect(response.status).toEqual(401);
  });
  it("should respond 200 on valid token", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const transaction = await createTransaction(1000, user);
    const response = await server
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(typeof response.body[0]).toEqual("object");
  });
});
