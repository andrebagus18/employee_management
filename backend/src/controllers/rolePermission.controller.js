import { prisma } from "../lib/prisma.js";

export const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const rolePermission = await prisma.rolepermission.findMany({
      where: {
        roleId: Number(roleId),
      },
      include: {
        role: true,
        permission: true,
      },
    });
    // console.log("roleper", rolePermission);
    return res.status(200).json({
      rolePermission,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// create permission
export const assignPermission = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionId } = req.body;

    const existingPermission = await prisma.rolepermission.findFirst({
      where: {
        roleId: Number(roleId),
        permissionId: permissionId,
      },
    });
    if (existingPermission) {
      return res.status(409).json({
        msg: "Permission already assigned to this role",
      });
    }
    // cek keberadaan role
    const role = await prisma.role.findUnique({
      where: {
        id: Number(roleId),
      },
    });
    if (!role) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    // cek keberadaan permission
    const permission = await prisma.permission.findUnique({
      where: {
        id: permissionId,
      },
    });
    if (!permission) {
      return res.status(404).json({
        msg: "Not found",
      });
    }
    // create
    const createPermission = await prisma.rolepermission.create({
      data: {
        roleId: Number(roleId),
        permissionId: permissionId,
      },
    });
    return res.status(201).json({
      msg: "Permission assigned successfully",
      createPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const revokePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;
    const rolePermission = await prisma.rolepermission.findFirst({
      where: {
        roleId: Number(roleId),
        permissionId: Number(permissionId),
      },
    });
    if (!rolePermission) {
      return res.status(404).json({
        msg: "Permission is not assigned to this role",
      });
    }
    await prisma.rolepermission.delete({
      where: {
        id: rolePermission.id,
      },
    });
    return res.status(200).json({
      msg: "Permission revoked successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
