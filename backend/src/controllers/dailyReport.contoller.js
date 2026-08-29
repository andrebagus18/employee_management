import { getEmployeeScope } from "../helper/employeeScope";
import { prisma } from "../lib/prisma.js";

export const createDailyReport = async (req, res) => {
  try {
    const { employeeId } = req.user;
    const { date, time, report } = req.body;

    if (
      date === undefined ||
      date === null ||
      time === undefined ||
      time === null ||
      report === undefined ||
      report === null
    ) {
      return res.status(400).json({
        msg: "date, time, and report are required",
      });
    }
    const createReport = await prisma.dailyReport.create({
      data: {
        employeeId: employeeId,
        date: new Date(date),
        time: new Date(`1970-01-01T${time}:00`),
        report: report,
      },
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
    });
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        action: "CREATED",
        entity: "Daily Report",
        entityId: createReport.id,
        description: `Created daily report by ${createReport.employee.name}`,
      },
    });
    return res.status(201).json({
      msg: "Created daily report successfully",
      data: createReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getDailyReports = async (req, res) => {
  try {
    const { employeeId } = req.user;
    const { allIds } = await getEmployeeScope(employeeId);
    const getReport = await prisma.dailyReport.findMany({
      where: {
        employeeId: {
          in: allIds,
        },
      },
    });
    return res.status(200).json({
      data: getReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getDetailReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.user;
    const report = await prisma.dailyReport.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!report) {
      return res.status(404).json({
        msg: "Daily report not found",
      });
    }
    const { allIds } = await getEmployeeScope(employeeId);
    if (!allIds.includes(report.employeeId)) {
      return res.status(403).json({
        msg: "You do not have permission to view this daily report",
      });
    }
    return res.status(200).json({
      data: report,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.user;
    const { date, time, report } = req.body;
    const updateDailyReport = await prisma.dailyReport.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!updateDailyReport) {
      return res.status(404).json({
        msg: "Daily report not found",
      });
    }
    const { allIds } = await getEmployeeScope(employeeId);
    if (!allIds.includes(updateDailyReport.employeeId)) {
      return res.status(403).json({
        msg: "You do not have permission to view this daily report",
      });
    }
    if (!date && !time && !report) {
      return res.status(400).json({
        msg: "All fields required",
      });
    }
    const data = {};
    if (date) {
      data.date = date;
    }
    if (time) {
      data.time = time;
    }
    if (report) {
      data.report = report;
    }
    const updateReport = await prisma.dailyReport.update({
      where: {
        id: updateDailyReport.id,
      },
      data: {
        ...data,
        time: new Date(`1970-01-01T${time}:00`),
      },
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
    });
    await prisma.activityLog.create({
      data: {
        userId: employeeId,
        action: "UPDATE",
        entity: "Daily Report",
        entityId: updateReport.id,
        description: `Updated daily report by ${updateReport.employee.name}`,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
