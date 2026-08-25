import { prisma } from "../lib/prisma.js";

export const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (
      name === undefined ||
      name === null ||
      description === undefined ||
      description === null
    ) {
      return res.status(400).json({
        msg: "field is required",
      });
    }
    const permission = await prisma.permission.create({
      data: {
        name: name,
        description: description,
      },
    });
    return res.status(201).json({
      msg: "Permission successfully created",
      data: permission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permission = await prisma.permission.findMany();
    if (permission.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json({
      data: permission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: " Internal server error",
    });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const findPermission = await prisma.permission.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findPermission) {
      return res.status(404).json({
        msg: "Permission not found",
      });
    }
    if (
      name === undefined ||
      name === null ||
      description === undefined ||
      description === null
    ) {
      return res.status(400).json({
        msg: "field is required",
      });
    }
    const result = await prisma.permission.update({
      where: {
        id: findPermission.id,
      },
      data: {
        name: name,
        description: description,
      },
    });
    return res.status(200).json({
      msg: "Permission successfully updated",
      data: result,
    });
  } catch (error) {
    console.error();
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const findPermissionId = await prisma.permission.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!findPermissionId) {
      return res.status(404).json({
        msg: "Permission not found",
      });
    }
    const idRolePermission = await prisma.rolePermission.findFirst({
      where: {
        permissionId: findPermissionId.id,
      },
    });
    if (idRolePermission) {
      return res.status(409).json({
        msg: "Permission is still assigned to roles",
      });
    }
    await prisma.permission.delete({
      where: {
        id: findPermissionId.id,
      },
    });
    return res.status(200).json({
      msg: "Delete permission successfully",
    });
  } catch (error) {
    console.error();
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
