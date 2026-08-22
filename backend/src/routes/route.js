import express from "express";
const router = express.Router();

import { createEmployee, userLogin } from "../controllers/auth.controller.js";
import { create } from "../controllers/department.controller.js";

router.post("/create-employee", createEmployee);
router.post("/login", userLogin);
router.post("/create", create);

export default router;
