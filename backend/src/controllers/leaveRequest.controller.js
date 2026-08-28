import { prisma } from "../lib/prisma.js";
import { getEmployeeScope } from "../helper/employeeScope.js";

const EMPLOYEE_ID = 5;
const SPV_ID = 4;
const MNG_ID = 3;
const HR_ID = 2;

export const createLeaveRequest = async (req, res) => {
  try {
    const { type, description, start_date, end_date } = req.body;
    const { userId } = req.user;
    console.log("req.user", req.user);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log("user:", user);
    if (!user || !user.employeeId) {
      return res.status(400).json({
        msg: "User is not associated with an employee",
      });
    }
    if (!type || !description || !start_date || !end_date) {
      return req.status(400).json({
        msg: "All fields are required",
      });
    }
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return req.status(400).json({
        msg: "Invalid date format",
      });
    }
    if (startDate > endDate) {
      return res.status(400).json({
        msg: "Start Date cannot be later than and date",
      });
    }
    console.log("type:", type);
    console.log("description:", description);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    // ambil employee dari user
    const employeeId = user.employeeId;
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });
    console.log("employeeId:", employee);
    if (!employee) {
      return res.status(404).json({
        msg: "Employee not found",
      });
    }
    // menentukan managerId
    const approverId = employee.managerId;
    if (!approverId) {
      return res.status(400).json({
        msg: "Employee does not have an assigned approver",
      });
    }
    // mencari approverId
    const approver = await prisma.employee.findUnique({
      where: {
        id: approverId,
      },
    });
    console.log("approver:", approver);
    if (!approver) {
      return res.status(404).json({
        msg: "Approver not found",
      });
    }
    const approverUser = await prisma.user.findUnique({
      where: {
        employeeId: approver.id,
      },
    });
    if (!approverUser) {
      return res.status(404).json({
        msg: "Approver does not have a user account",
      });
    }
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employee: {
          connect: {
            id: user.employeeId,
          },
        },
        approver: {
          connect: {
            id: approverUser.id,
          },
        },
        type: type,
        description: description,
        start_date: startDate,
        end_date: endDate,
        status: "PENDING",
      },
    });
    return res.status(201).json({
      msg: "Leave request successfully created",
      data: leaveRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getLeaveRequest = async (req, res) => {
  try {
    const { userId, roleId, employeeId } = req.user;
    let leaveFilter = {};
    if (roleId === EMPLOYEE_ID) {
      leaveFilter = {
        employeeId: employeeId,
      };
    } else if (roleId === SPV_ID || roleId === MNG_ID) {
      leaveFilter = {
        approverId: userId,
      };
    }
    // ambil hasil helper
    const scopeIds = await getEmployeeScope(employeeId);
    if (roleId === HR_ID) {
      leaveFilter = {
        employeeId: {
          in: scopeIds,
        },
      };
    }
    const leaveRequest = await prisma.leaveRequest.findMany({
      where: leaveFilter,
    });
    console.log("leave:", leaveRequest);

    return res.status(200).json({
      data: leaveRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, userId, roleId } = req.user;
    const getById = await prisma.leaveRequest.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!getById) {
      return res.status(404).json({
        msg: "Leave Request not found",
      });
    }
    if (roleId === HR_ID) {
      const scopeIds = await getEmployeeScope(employeeId);
      if (!scopeIds.includes(getById.employeeId)) {
        return res.status(403).json({
          msg: "You can only view leave request within your employee scope",
        });
      }
    }
    if (roleId === EMPLOYEE_ID && getById.employeeId !== employeeId) {
      return res.status(403).json({
        msg: "You can only view your own leave request",
      });
    }

    if (
      (roleId === SPV_ID || roleId === MNG_ID) &&
      getById.approverId !== userId
    ) {
      return res.status(403).json({
        msg: "You can only view leave request assigned to you",
      });
    }
    // console.log("roleid:", roleId);
    // console.log("userId:", userId);
    // console.log("approverId:", getById.approverId);
    return res.status(200).json({
      data: getById,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
