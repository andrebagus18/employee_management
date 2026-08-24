import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { use } from "react";

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

export const updateEmployeeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee, user } = req.body;
    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findEmployee) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    const findUser = await prisma.user.findUnique({
      where: {
        employeeId: Number(id),
      },
    });
    if (!findUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    // validasi employee
    const existingEmployeeFields = ["positionId", "departmentId", "jobLevelId"];
    for (const field of existingEmployeeFields) {
      if (employee[field] === undefined || employee[field] === null) {
        return res.status(400).json({
          msg: `field ${field} is required`,
        });
      }
    }
    const existingNik = await prisma.employee.findFirst({
      where: {
        nik: employee.nik,
        NOT: {
          id: Number(id),
        },
      },
    });
    if (existingNik) {
      return res.status(409).json({
        msg: "NIK already exists",
      });
    }
    // validasi user
    const existingUserFields = ["roleId"];
    for (const field of existingUserFields) {
      if (user[field] === undefined || user[field] === null) {
        return res.status(400).json({
          mgs: `field ${field} is required`,
        });
      }
    }
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: user.email,
        NOT: {
          id: findUser.id,
        },
      },
    });
    if (existingEmail) {
      return res.status(409).json({
        msg: "Email already exists",
      });
    }
    // update after data valid
    const result = await prisma.$transaction(async (tx) => {
      // data employee
      const employeeData = {
        ...employee,
        hire_date: new Date(employee.hire_date),
      };
      const updateEmployee = await tx.employee.update({
        where: {
          id: Number(id),
        },
        data: {
          ...employeeData,
        },
      });
      // data user
      const userData = {
        email: user.email,
        roleId: user.roleId,
      };
      if (user.password) {
        userData.password = await bcrypt.hash(user.password, 10);
      }
      const updateUser = await tx.user.update({
        where: {
          id: findUser.id,
        },
        data: userData,
      });
      return { updateEmployee, updateUser };
    });
    return res.status(200).json({
      msg: "Employee uodated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deleteEmployeeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const findEmployeeId = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findEmployeeId) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    const findUserId = await prisma.user.findUnique({
      where: {
        employeeId: Number(id),
      },
    });
    if (!findUserId) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    // delete
    await prisma.$transaction(async (tx) => {
      const deleteUser = await tx.user.delete({
        where: {
          id: findUserId.id,
        },
      });
      const deleteEmployee = await tx.employee.delete({
        where: {
          id: Number(id),
        },
      });
    });
    return res.status(200).json({
      msg: "Delete employee successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
