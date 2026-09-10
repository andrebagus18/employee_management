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
        departmentId: Number(departmentId),
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
    const { search = "", departmentId, page = 1, limit = 10 } = req.query;
    const filters = searchPositions({
      search,
      departmentId,
    });
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const [positions, total] = await Promise.all([
      prisma.position.findMany({
        where: filters,
        skip,
        take: limitNumber,
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              employee: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.position.count({
        where: filters,
      }),
    ]);

    const totalPage = Math.ceil(total / limitNumber);
    return res.status(200).json({
      positions,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const searchPositions = ({
  search = "",
  departmentId,
  page = 1,
  limit = 10,
}) => {
  const searchPos = {};
  if (search) {
    searchPos.name = {
      contains: search,
    };
  }
  if (departmentId) {
    searchPos.departmentId = Number(departmentId);
  }
  return searchPos;
};

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("params:", req.params);
    console.log("id:", id);
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
        departmentId: Number(departmentId),
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
