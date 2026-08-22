import express from "express";
const router = express.Router();

import { create } from "../controllers/department.controller.js";

router.post("/create", create);

export default router;
