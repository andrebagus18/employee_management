import { prisma } from "../lib/prisma.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            user: true,
          },
        },
      },
    });
    // console.log(roles);
    return res.status(200).json({
      roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
