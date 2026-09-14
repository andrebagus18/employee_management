import { prisma } from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const { search = "", roleId, page = 1, limit = 10 } = req.query;
    const filters = searchUser({
      search,
      roleId,
    });
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const [getAllUsers, total] = await Promise.all([
      prisma.user.findMany({
        where: filters,
        skip,
        take: limitNumber,
        include: {
          employee: {
            select: {
              name: true,
            },
          },
          role: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.user.count({
        where: filters,
      }),
    ]);
    // console.log("users", getAllUsers);
    const totalPage = Math.ceil(total / limitNumber);
    if (!getAllUsers) {
      return res.status(404).json({
        msg: "Users not found",
      });
    }
    return res.status(200).json({
      getAllUsers,
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

export const searchUser = ({ search = "", roleId, page = 1, limit = 10 }) => {
  const result = {};
  if (search) {
    result.employee = {
      name: {
        contains: search,
      },
    };
  }
  if (roleId) {
    result.roleId = Number(roleId);
  }
  return result;
};
