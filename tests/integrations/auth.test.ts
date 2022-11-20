import app from "../../src/app.js";
import supertest from "supertest";
import { createValidBody } from "../factories/users-factory.js";
import { cleanDb } from "../helpers.js";

beforeAll(async () => {
  await cleanDb();
});

const server = supertest(app);
const validBody = createValidBody();

describe("POST /sign-up", () => {
  it("should respond 422 on no body", async () => {
    const response = await server.post("/auth/sign-up");
    expect(response.status).toEqual(422);
  });
  it("should respond 422 on invalid body", async () => {
    const invalidBody = { username: "", password: "", confirmPassword: "" };
    const response = await server.post("/auth/sign-up").send(invalidBody);
    expect(response.status).toEqual(422);
  });
  it("should respond 201 on valid body", async () => {
    const response = await server.post("/auth/sign-up").send(validBody);
    expect(response.status).toEqual(201);
  });
  it("should respond 409 on same username", async () => {
    const response = await server.post("/auth/sign-up").send(validBody);
    expect(response.status).toEqual(409);
  });
});

describe("POST /sign-up", () => {
  const { username, password } = validBody;

  it("should respond 422 on no body", async () => {
    const response = await server.post("/auth/sign-in");
    expect(response.status).toEqual(422);
  });
  it("should respond 200 on valid body", async () => {
    const response = await server
      .post("/auth/sign-in")
      .send({ username, password });
    expect(response.status).toEqual(200);
    expect(typeof response.body.token).toEqual("string");
  });
  it("should respond 422 on invalid body", async () => {
    const response = await server.post("/auth/sign-in").send({ username });
    expect(response.status).toEqual(422);
  });
  it("should respond 404 on invalid user", async () => {
    const response = await server
      .post("/auth/sign-in")
      .send({ username: "JohnDoe", password });
    expect(response.status).toEqual(401);
  });
});
