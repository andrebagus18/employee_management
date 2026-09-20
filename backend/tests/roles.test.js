import request from "supertest";
import app from "../src/app.js";

describe("EMPLOYEE PERMISSION", () => {
  test("Employee", async () => {
    const employee = request.agent(app);
    const login = await employee.post("/api/auth/login").send({
      email: "andi.staff@example.com",
      password: "password123",
    });
    expect(login.statusCode).toBe(200);
    const response = await employee.get("/api/roles");
    expect(response.statusCode).toBe(403);
  });

  // test("Login get me", async () => {
  // })
});
