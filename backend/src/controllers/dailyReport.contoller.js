import { getEmployeeScope } from "../helper/employeeScope.js";
import { prisma } from "../lib/prisma.js";

export const createDailyReport = async (req, res) => {
  try {
    const { employeeId } = req.user;
    const { report_date, start_time, end_time, report } = req.body;

    if (
      report_date === undefined ||
      report_date === null ||
      start_time === undefined ||
      start_time === null ||
      end_time === undefined ||
      end_time === null ||
      report === undefined ||
      report === null
    ) {
      return res.status(400).json({
        msg: "date, time, and report are required",
      });
    }
    const createReport = await prisma.dailyreport.create({
      data: {
        employeeId: employeeId,
        report_date: new Date(report_date),
        start_time: start_time,
        end_time: end_time,
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
    await prisma.activitylog.create({
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
    const { search = "", report_date, page = 1, limit = 15 } = req.query;
    const filters = filterReport({
      search,
      report_date,
    });
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const [getReports, total] = await Promise.all([
      prisma.dailyreport.findMany({
        where: filters,
        skip,
        take: limitNumber,
        include: {
          employee: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.dailyreport.count({
        where: filters,
      }),
    ]);
    // console.log("get:", getReports);
    const totalPage = Math.ceil(total / limitNumber);
    return res.status(200).json({
      getReports,
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

export const getDetailReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.user;
    const report = await prisma.dailyreport.findUnique({
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
    const { report_date, start_time, end_time, report } = req.body;
    const updateDailyReport = await prisma.dailyreport.findUnique({
      where: {
        id: Number(id),
      },
    });
    // console.log("report:", updateDailyReport);
    if (!updateDailyReport) {
      return res.status(404).json({
        msg: "Daily report not found",
      });
    }
    if (!report_date && !start_time && !end_time && !report) {
      return res.status(400).json({
        msg: "All fields required",
      });
    }
    const updateReport = await prisma.dailyreport.update({
      where: {
        id: updateDailyReport.id,
      },
      data: {
        employeeId,
        report_date: new Date(report_date),
        start_time,
        end_time,
        report,
      },
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
    });
    await prisma.activitylog.create({
      data: {
        userId: employeeId,
        action: "UPDATE",
        entity: "Daily Report",
        entityId: updateReport.id,
        description: `Updated daily report by ${updateReport.employee.name}`,
      },
    });
    return res.status(200).json({
      msg: "Daily report updated successfully",
      updateReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const filterReport = ({
  search = "",
  report_date,
  page = 1,
  limit = 15,
}) => {
  const result = {};
  if (search) {
    result.employee = {
      name: {
        contains: search,
      },
    };
  }
  if (report_date && report_date !== "all") {
    result.report_date = new Date(report_date);
  }
  return result;
};
