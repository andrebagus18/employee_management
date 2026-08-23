import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/auth.middleware.js";
import { permissionMiddleware } from "../middleware/permission.middleware.js";
import {
  getRolePermissions,
  assignPermission,
} from "../controllers/rolePermission.controller.js";
import { userLogin } from "../controllers/auth.controller.js";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employee.controller.js";
import { create } from "../controllers/department.controller.js";

// route login
router.post("/auth/login", userLogin);

// route admin
router.post(
  "/employees/create-employee",
  authMiddleware,
  permissionMiddleware("employee.create"),
  createEmployee,
);
router.get(
  "/roles/:roleId/permissions",
  authMiddleware,
  permissionMiddleware("role.view"),
  getRolePermissions,
);
router.post(
  "/roles/:roleId/permissions",
  authMiddleware,
  permissionMiddleware("role.update"),
  assignPermission,
);

// route employee
router.get(
  "/employees",
  authMiddleware,
  permissionMiddleware("employee.view"),
  getEmployees,
);

router.post("/create", create);

export default router;
