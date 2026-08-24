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
  updateEmployeeUser,
  deleteEmployeeUser,
} from "../controllers/employee.controller.js";
import { create } from "../controllers/department.controller.js";

// route login
router.post("/auth/login", userLogin);

// route employee
router.post(
  "/employees/create-employee",
  authMiddleware,
  permissionMiddleware("employee.create"),
  createEmployee,
);
router.get(
  "/employees",
  authMiddleware,
  permissionMiddleware("employee.view"),
  getEmployees,
);
router.put(
  "/employees/:id/update",
  authMiddleware,
  permissionMiddleware("employee.update"),
  updateEmployeeUser,
);
router.delete(
  "/employees/:id/delete",
  authMiddleware,
  permissionMiddleware("employee.delete"),
  deleteEmployeeUser,
);

// route role
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

router.post("/create", create);

export default router;
