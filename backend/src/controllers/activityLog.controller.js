import { prisma } from "../lib/prisma.js";

export const activityLog = async (req, res) => {
  try {
    const activity = await prisma.activityLog.findMany({
      include: {
        user: {
          include: {
            employee: true,
          },
        },
      },
    });
    return res.status(200).json({
      activity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
