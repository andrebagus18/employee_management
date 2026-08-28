import { prisma } from "../lib/prisma.js";

export const activityLog = async (req, res) => {
  try {
    const activity = await prisma.activityLog.findMany({
      include: {
        user: true,
      },
    });
    return res.status(200).json({
      data: activity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
