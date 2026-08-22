import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/auth.middleware.js";
import { userLogin } from "../controllers/auth.controller.js";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employee.controller.js";
import { create } from "../controllers/department.controller.js";

// route login
router.post("/auth/login", userLogin);

// route employee
router.post("/employees/create-employee", authMiddleware, createEmployee);
router.get("/employees", authMiddleware, getEmployees);

router.post("/create", create);

export default router;
