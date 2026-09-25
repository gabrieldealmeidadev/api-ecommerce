import request from "supertest";
import app from "../../src/app";

describe("E2E - User CRUD", () => {
  let userId: string;

  it("deve criar um usuário", async () => {
    const response = await request(app).post("/users").send({
      name: "E2E User",
      email: "e2e.user@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);

    expect(response.body.user).toHaveProperty("id");

    userId = response.body.user.id;
  });

  it("deve listar os usuários", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.users).toBeInstanceOf(Array);
  });

  it("deve buscar o usuário criado pelo ID", async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe(userId);
  });

  it("deve atualizar o usuário", async () => {
    const response = await request(app).put(`/users/${userId}`).send({
      name: "E2E User Updated",
      email: "e2e.updated@example.com",
      password: "newpassword123",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("E2E User Updated");
    expect(response.body.user.email).toBe("e2e.updated@example.com");
  });

  it("deve excluir o usuário", async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(200);
  });

  it("não deve encontrar o usuário depois de excluído", async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(404);
  });
});
