import { prisma } from "../lib/prisma.js";

export const activityLog = async (req, res) => {
  try {
    const { search = "", action, entity, page = 1, limit = 10 } = req.query;
    const filters = searchLog({
      search,
      action,
      entity,
    });
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const [activities, total] = await Promise.all([
      prisma.activitylog.findMany({
        where: filters,
        skip,
        take: limitNumber,
        include: {
          user: {
            include: {
              employee: true,
            },
          },
        },
      }),
      prisma.activitylog.count({
        where: filters,
      }),
    ]);
    const totalPage = Math.ceil(total / limitNumber);
    return res.status(200).json({
      activities,
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

export const searchLog = ({
  search = "",
  action,
  entity,
  page = 1,
  limit = 10,
}) => {
  const result = {};
  if (search) {
    result.user = {
      employee: {
        name: {
          contains: search,
        },
      },
    };
  }
  if (action && action !== "all") {
    result.action = action;
  }
  if (entity && entity !== "all") {
    result.entity = entity;
  }
  return result;
};
