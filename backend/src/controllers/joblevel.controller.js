import { prisma } from "../lib/prisma.js";

export const createJobLevel = async (req, res) => {
  try {
    const { name } = req.body;
    if (name === undefined || name === null) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }
    const jobLevel = await prisma.jobLevel.create({
      data: {
        name: name,
      },
    });
    return res.status(201).json({
      msg: "Job Level successfully created",
      data: jobLevel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getJobLevel = async (req, res) => {
  try {
    const jobLevel = await prisma.jobLevel.findMany();
    if (jobLevel.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      data: jobLevel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updateJobLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const findJobLevel = await prisma.jobLevel.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findJobLevel) {
      return res.status(404).json({
        msg: "Job Level not found",
      });
    }
    if (name === undefined || name === null) {
      return res.status(400).json({
        msg: "field is required",
      });
    }
    const updateJob = await prisma.jobLevel.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return res.status(200).json({
      msg: "Job Level updated successfully",
      data: updateJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal sever error",
    });
  }
};

export const deleteJobLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const findjobLevelId = await prisma.jobLevel.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findjobLevelId) {
      return res.status(404).json({
        msg: "Job Level not found",
      });
    }
    const employeeId = await prisma.employee.findFirst({
      where: {
        jobLevelId: Number(id),
      },
    });
    if (employeeId) {
      return res.status(409).json({
        msg: "Job Level is still used by employees",
      });
    }
    const deleteJob = await prisma.jobLevel.delete({
      where: {
        id: findjobLevelId.id,
      },
    });
    return res.status(200).json({
      msg: "Delete job level successfully",
      data: deleteJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};
