import { prisma } from "../lib/prisma.js";

export const createPosition = async (req, res) => {
  try {
    const { name, departmentId } = req.body;
    if (
      name === undefined ||
      name === null ||
      departmentId == undefined ||
      departmentId === null
    ) {
      return res.status(400).json({
        msg: "field is required",
      });
    }
    const findDepartment = await prisma.department.findUnique({
      where: {
        id: Number(departmentId),
      },
    });
    if (!findDepartment) {
      return res.status(400).json({
        msg: "Department not found",
      });
    }
    const position = await prisma.position.create({
      data: {
        name: name,
        departmentId: departmentId,
      },
    });
    return res.status(201).json({
      msg: "Position successfully created",
      data: position,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getPosition = async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (positions.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      data: positions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, departmentId } = req.body;
    const editPosition = await prisma.position.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!editPosition) {
      return res.status(404).json({
        msg: "Position not found",
      });
    }
    if (
      name === undefined ||
      name === null ||
      departmentId == undefined ||
      departmentId === null
    ) {
      return res.status(400).json({
        msg: "field is required",
      });
    }
    const result = await prisma.position.update({
      where: {
        id: editPosition.id,
      },
      data: {
        name: name,
        departmentId: departmentId,
      },
    });
    return res.status(200).json({
      msg: "Position successfully created",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePositionId = await prisma.position.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!deletePositionId) {
      return res.status(404).json({
        msg: "Position not found",
      });
    }
    const employeeId = await prisma.employee.findFirst({
      where: {
        positionId: deletePositionId.id,
      },
    });
    if (employeeId) {
      return res.status(400).json({
        msg: "Position is still used by employees",
      });
    }
    await prisma.position.delete({
      where: {
        id: deletePositionId.id,
      },
    });
    return res.status(200).json({
      msg: "Delete position successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
