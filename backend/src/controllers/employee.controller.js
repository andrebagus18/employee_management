import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      gender,
      nik,
      phone,
      place_birth,
      date_birth,
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
      !place_birth ||
      !date_birth ||
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
      const employee = await tx.employee.create({
        data: {
          name: name,
          gender: gender,
          nik: nik,
          phone: phone,
          place_birth: place_birth,
          date_birth: date_birth,
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
              id: employee.id,
            },
          },
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      });
      await tx.activityLog.create({
        data: {
          userId: req.user.userId,
          action: "CREATE",
          entity: "Employee",
          entityId: employee.id,
          description: `Created employee ${employee.name}`,
        },
      });
      return { employee, users };
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
    const {
      search = "",
      departmentId,
      positionId,
      status,
      page = 1,
      limit = 10,
    } = req.query;
    const where = searchEmployee({
      search,
      departmentId,
      positionId,
      status,
    });
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limitNumber,
        include: {
          department: true,
          position: true,
          jobLevel: true,
          manager: true,
          users: {
            select: {
              email: true,
            },
          },
        },
      }),
      prisma.employee.count({
        where,
      }),
    ]);
    const totalPage = Math.ceil(total / limitNumber);
    if (employees.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      employees,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const searchEmployee = ({
  search = "",
  departmentId,
  positionId,
  status,
  page = 1,
  limit = 10,
}) => {
  const where = {};
  if (search) {
    where.name = {
      contains: search,
    };
  }
  if (departmentId) {
    where.departmentId = Number(departmentId);
  }
  if (positionId) {
    where.positionId = Number(positionId);
  }
  if (status) {
    where.status = status;
  }
  return where;
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        department: true,
        position: true,
        jobLevel: true,
        manager: true,
        users: {
          include: {
            role: true,
          },
        },
      },
    });
    // console.log("employeeId", employee);
    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    return res.status(200).json({
      employee,
    });
  } catch (error) {
    console.error(error);
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
      if (Number(managerId) === Number(id)) {
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
      await tx.activityLog.create({
        data: {
          userId: req.user.userId,
          action: "UPDATE",
          entity: "Employee",
          entityId: updateEmployee.id,
          description: `Employee ${updateEmployee.name} and User account was updated`,
        },
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

export const deactivateEmployeeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    // deactivated
    await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "INACTIVE",
      },
    });
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        action: "DEACTIVATE",
        entity: "Employee",
        entityId: employee.id,
        description: `Employee ${employee.name} was deactivated`,
      },
    });

    return res.status(200).json({
      msg: "Deactivated employee successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const activateEmployeeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    if (employee.status === "ACTIVE") {
      return res.status(400).json({
        msg: "Employee is already active",
      });
    }
    // deactivated
    await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "ACTIVE",
      },
    });
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        action: "ACTIVATE",
        entity: "Employee",
        entityId: employee.id,
        description: `Employee ${employee.name} was activated`,
      },
    });

    return res.status(200).json({
      msg: "Activated employee successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
