import app from "../../src/app.js";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers.js";

beforeAll(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /balance", () => {
  it("should respond with 401 on no token", async () => {
    const response = await server.get("/balance");
    expect(response.status).toEqual(401);
  });
  it("should respond with balance on valid token", async () => {
    const token = await generateValidToken();
    const response = await server
      .get("/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(typeof response.body.balance).toEqual("number");
  });
});
