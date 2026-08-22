import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        roleId: true,
        employeeId: true,
      },
    });
    console.log("USER", users);

    if (!users) {
      return res.status(401).json({
        msg: "Wrong Email or password",
      });
    }
    console.log("psw:", password);
    console.log("pswdb", users.password);
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Wrong email or password",
      });
    }
    const token = jwt.sign(
      {
        userId: users.id,
        roleId: users.roleId,
        employeeId: users.employeeId,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      msg: "Login success",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
