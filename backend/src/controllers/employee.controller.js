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
    let manager = null;

    if (managerId) {
      manager = await prisma.employee.findUnique({
        where: {
          id: Number(managerId),
        },
        include: {
          jobLevel: true,
        },
      });

      if (!manager) {
        return res.status(404).json({
          msg: "Manager not found",
        });
      }
      // manager tidak boleh sama
      if (manager.departmentId !== Number(departmentId)) {
        return res.status(400).json({
          msg: "Manager must be in the same department",
        });
      }
      // ambil joblevel employee
      const jobLevelEmployee = await prisma.jobLevel.findUnique({
        where: {
          id: Number(jobLevelId),
        },
      });
      if (manager.departmentId !== Number(departmentId)) {
        return res.status(404).json({
          msg: "Job level not found",
        });
      }
      // manager harus lebih tinggi
      const hierarchy = {
        1: 5, // Operator → Supervisor
        2: 5, // Staff → Supervisor
        3: 5, // Senior Staff → Supervisor
        4: 5, // Foreman → Supervisor
        5: 7, // Supervisor → Manager
        6: 7, // Assistant Manager → Manager
        7: 9, // Manager → Head
        8: 9, // Senior Manager → Head
        9: 10, // Head → Director
        // Director (10) → null
      };
      const expectedRank = hierarchy[jobLevelEmployee.rank];
      if (
        expectedRank !== undefined &&
        manager.jobLevel.rank !== expectedRank
      ) {
        return res.status(400).json({
          msg: "Manager must be the direct higher-level manager",
        });
      }
    }
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }
    const existingNik = await prisma.employee.findUnique({
      where: {
        nik: nik,
      },
    });
    if (existingNik) {
      return res.status(400).json({
        msg: "Nik already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const employees = await tx.employee.create({
        data: {
          name: name,
          gender: gender,
          nik: nik,
          phone: phone,
          address: address,
          hire_date: new Date(hire_date),
          termination_date: termination_date,
          status: status,
          departmentId: Number(departmentId),
          positionId: Number(positionId),
          jobLevelId: Number(jobLevelId),
          managerId: manager ? manager.id : null,
        },
      });
      const users = await tx.user.create({
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
      return { employees, users };
    });
    return res.status(201).json({
      msg: "Employee successfully created",
      data: result,
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
    const managerId = employee.managerId;

    if (managerId) {
      if (!managerId && Number(managerId) === Number(id)) {
        return res.status(400).json({
          msg: "Employee cannot be their own manager",
        });
      }
      const manager = await prisma.employee.findUnique({
        where: {
          id: Number(managerId),
        },
        include: {
          jobLevel: true,
        },
      });
      if (!manager) {
        return res.status(404).json({
          msg: "Manager not found",
        });
      }
      if (manager.departmentId !== findEmployee.departmentId) {
        return res.status(400).json({
          msg: "Manager must be in the same department",
        });
      }
      // cari job level employee yang sedang di update
      const employeeJobLevel = await prisma.jobLevel.findUnique({
        where: {
          id: Number(employee.jobLevelId),
        },
      });
      if (!employeeJobLevel) {
        return res.status(404).json({
          msg: "Employee job level not found",
        });
      }
      // manager harus lebih tinggi
      const hierarchy = {
        1: 5, // Operator → Supervisor
        2: 5, // Staff → Supervisor
        3: 5, // Senior Staff → Supervisor
        4: 5, // Foreman → Supervisor
        5: 7, // Supervisor → Manager
        6: 7, // Assistant Manager → Manager
        7: 9, // Manager → Head
        8: 9, // Senior Manager → Head
        9: 10, // Head → Director
        // Director (10) → null
      };
      const expectedRank = hierarchy[employeeJobLevel.rank];
      if (
        expectedRank !== undefined &&
        manager.jobLevel.rank !== expectedRank
      ) {
        return res.status(400).json({
          msg: "Manager must be the direct higher-level manager",
        });
      }
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
      msg: "Employee updated successfully",
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
      await tx.user.delete({
        where: {
          id: findUserId.id,
        },
      });
      await tx.employee.delete({
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
