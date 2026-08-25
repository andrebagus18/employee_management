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
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import {
  createJobLevel,
  getJobLevel,
  updateJobLevel,
  deleteJobLevel,
} from "../controllers/joblevel.controller.js";
import {
  createPosition,
  getPosition,
  updatePosition,
  deletePosition,
} from "../controllers/position.controller.js";
import {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} from "../controllers/permission.controller.js";

// route login
router.post("/auth/login", userLogin);

// route employee
router.post(
  "/employees/create",
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

// route department
router.post(
  "/departments/create",
  authMiddleware,
  permissionMiddleware("department.create"),
  createDepartment,
);
router.get(
  "/departments",
  authMiddleware,
  permissionMiddleware("department.view"),
  getDepartments,
);
router.put(
  "/departments/:id/update",
  authMiddleware,
  permissionMiddleware("department.update"),
  updateDepartment,
);
router.delete(
  "/departments/:id/delete",
  authMiddleware,
  permissionMiddleware("department.delete"),
  deleteDepartment,
);

// router jovlevel
router.post(
  "/joblevels/create",
  authMiddleware,
  permissionMiddleware("joblevel.create"),
  createJobLevel,
);
router.get(
  "/joblevels",
  authMiddleware,
  permissionMiddleware("joblevel.view"),
  getJobLevel,
);
router.put(
  "/joblevels/:id/update",
  authMiddleware,
  permissionMiddleware("joblevel.update"),
  updateJobLevel,
);
router.delete(
  "/joblevels/:id/delete",
  authMiddleware,
  permissionMiddleware("joblevel.delete"),
  deleteJobLevel,
);

// route position
router.post(
  "/positions/create",
  authMiddleware,
  permissionMiddleware("position.create"),
  createPosition,
);
router.get(
  "/positions",
  authMiddleware,
  permissionMiddleware("position.view"),
  getPosition,
);
router.put(
  "/positions/:id/update",
  authMiddleware,
  permissionMiddleware("position.update"),
  updatePosition,
);
router.delete(
  "/positions/:id/delete",
  authMiddleware,
  permissionMiddleware("position.delete"),
  deletePosition,
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

// route permission
router.post(
  "/permissions/create",
  authMiddleware,
  permissionMiddleware("permission.create"),
  createPermission,
);
router.get(
  "/permissions",
  authMiddleware,
  permissionMiddleware("permission.view"),
  getPermissions,
);
router.put(
  "/permissions/:id/update",
  authMiddleware,
  permissionMiddleware("permission.update"),
  updatePermission,
);
router.delete(
  "/permissions/:id/delete",
  authMiddleware,
  permissionMiddleware("permission.delete"),
  deletePermission,
);

export default router;
