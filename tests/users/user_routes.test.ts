import request from "supertest";
import app from "../../src/app";

describe("Users routes", () => {
  it("should return the list of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
  });
});

describe("User Controller", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: " Test User",
      email: "test.user@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201);
  });
});
