import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      gender,
      nik,
      phone,
      address,
      hire_date,
      termination_date,
      status,
      departmentId,
      positionId,
      jobLevelId,
      managerId,
      email,
      password,
      roleId,
    } = req.body;

    if (
      !name ||
      !gender ||
      !nik ||
      !phone ||
      !address ||
      !hire_date ||
      !status ||
      !departmentId ||
      !positionId ||
      !jobLevelId ||
      !email ||
      !password ||
      !roleId
    ) {
      return res.status(400).json({
        msg: "Required fields are missing",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const employees = await prisma.employee.create({
      data: {
        name: name,
        gender,
        gender,
        nik: nik,
        phone: phone,
        address: address,
        hire_date: new Date(hire_date),
        termination_date: termination_date,
        status: status,
        departmentId: departmentId,
        positionId: positionId,
        jobLevelId: jobLevelId,
        managerId: managerId,
      },
    });
    const users = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        employee: {
          connect: {
            id: employees.id,
          },
        },
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return res.status(201).json({
      employees,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    if (employees.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
