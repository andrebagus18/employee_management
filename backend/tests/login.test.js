import request from "supertest";
import app from "../src/app.js";
import { response } from "express";

describe("POST /auth/login", () => {
  test("should login successfully", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin123",
    });
    // console.log("test.login", response.headers);
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe("Login success");
    expect(response.headers).toHaveProperty("set-cookie");
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.headers["set-cookie"][0]).toMatch(/^token=/);
  });

  test("Should reject wrong password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin12345",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.msg).toBe("Wrong email or password");
  });

  test("get current user after login", async () => {
    const agent = request.agent(app);

    const login = await agent.post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    // kirim cookie ke auth/me
    const response = await agent.get("/api/auth/me");
    expect(response.statusCode).toBe(200);
  });

  test("should logout successfully", async () => {
    const agent = request.agent(app);
    const login = await agent.post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    const response = await agent.post("/api/auth/logout");
    expect(response.statusCode).toBe(200);
  });

  test("should reject unautheticated user", async () => {
    const response = await request(app).get("/api/auth/me");
    expect(response.statusCode).toBe(401);
  });

  test("admin login and permission", async () => {
    const admin = request.agent(app);
    const login = await admin.post("/api/auth/login").send({
      email: "admin@gmail.com",
      password: "admin123",
    });
    expect(login.statusCode).toBe(200);
    // kirim cookie ke auth/me
    const response = await admin.get("/api/employees");
    expect(response.statusCode).toBe(200);
  });
});
