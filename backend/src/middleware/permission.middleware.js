import { prisma } from "../lib/prisma.js";

export const permissionMiddleware = (permissionName) => {
  return async (req, res, next) => {
    const { roleId } = req.user;
    const rolePermission = await prisma.rolePermission.findFirst({
      where: {
        roleId: roleId,
        permission: {
          name: permissionName,
        },
      },
    });
    console.log("roleId:", roleId);
    console.log("perName:", permissionName);
    console.log("rolPer", rolePermission);

    if (!rolePermission) {
      return res.status(403).json({
        msg: "Forbidden",
      });
    }
    next();
  };
};
