import { prisma } from "../lib/prisma.js";

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (name === undefined || name === null) {
      return res.status(400).json({
        msg: "Bad Request",
      });
    }
    const department = await prisma.department.create({
      data: {
        name: name,
      },
    });

    return res.status(201).json({
      msg: "Department successfully created",
      data: department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (departments.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const findDepartment = await prisma.department.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findDepartment) {
      return res.status(404).json({
        msg: "Department not found",
      });
    }
    if (name === undefined || name === null) {
      return res.status(400).json({
        msg: "Field is required",
      });
    }
    const result = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return res.status(200).json({
      msg: "Department updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    console.log("masuk");
    const { id } = req.params;
    const findDepartmentId = await prisma.department.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findDepartmentId) {
      return res.status(404).json({
        msg: "Department not found",
      });
    }
    const findEmployeeId = await prisma.employee.findUnique({
      where: {
        departmentId: Number(id),
      },
    });
    if (findEmployeeId) {
      return res.status(409).json({
        msg: "Department is still used by employees",
      });
    }
    await prisma.department.delete({
      where: {
        id: findDepartmentId.id,
      },
    });
    return res.status(200).json({
      msg: "Delete department successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
