import { prisma } from "../lib/prisma.js";

// export const permissionMiddleware = (permissionName) => {
//   return async (req, res, next) => {
//     try {
//       const { roleId } = req.user;

//       // TEST 1
//       const rolePermission = await prisma.rolePermission.findFirst({
//         where: {
//           roleId: Number(roleId),
//           permissionId: 32,
//         },
//         include: {
//           permission: true,
//         },
//       });

//       console.log("ROLE PERMISSION:", rolePermission);

//       next();
//     } catch (error) {
//       console.error(error);

//       return res.status(500).json({
//         msg: "Internal server error",
//       });
//     }
//   };
// };

export const permissionMiddleware = (permissionName) => {
  return async (req, res, next) => {
    const { roleId } = req.user;
    const rolePermission = await prisma.rolePermission.findFirst({
      where: {
        roleId: Number(roleId),
        permission: {
          name: permissionName,
        },
      },
    });
    // console.log("roleId:", roleId);
    // console.log("perName:", permissionName);
    // console.log("rolPer", rolePermission);

    if (!rolePermission) {
      return res.status(403).json({
        msg: "Forbidden",
      });
    }
    next();
  };
};

// export const permissionMiddleware = (permissionName) => {
//   return async (req, res, next) => {
//     try {
//       const { roleId } = req.user;

//       // 1. Cari permission berdasarkan nama
//       const permission = await prisma.permission.findFirst({
//         where: {
//           name: permissionName,
//         },
//       });

//       if (!permission) {
//         return res.status(403).json({
//           msg: "Permission not found",
//         });
//       }

//       // 2. Cek apakah role memiliki permission tersebut
//       const rolePermission = await prisma.rolePermission.findFirst({
//         where: {
//           roleId: Number(roleId),
//           permissionId: permission.id,
//         },
//       });

//       if (!rolePermission) {
//         return res.status(403).json({
//           msg: "Forbidden",
//         });
//       }

//       next();
//     } catch (error) {
//       console.error(error);

//       return res.status(500).json({
//         msg: "Internal server error",
//       });
//     }
//   };
// };

// export const permissionMiddleware = (permissionName) => {
//   return async (req, res, next) => {
//     try {
//       const { roleId } = req.user;

//       const rolePermissions = await prisma.rolePermission.findMany({
//         where: {
//           roleId: Number(roleId),
//         },
//         include: {
//           permission: true,
//         },
//       });

//       console.log("ROLE ID:", roleId);
//       console.log(
//         "PERMISSIONS:",
//         rolePermissions.map((rp) => rp.permission.name),
//       );
//       console.log("REQUESTED:", permissionName);

//       const hasPermission = rolePermissions.some(
//         (rp) => rp.permission.name === permissionName,
//       );

//       console.log("HAS PERMISSION:", hasPermission);

//       if (!hasPermission) {
//         return res.status(403).json({
//           msg: "Forbidden",
//         });
//       }

//       next();
//     } catch (error) {
//       console.error(error);

//       return res.status(500).json({
//         msg: "Internal server error",
//       });
//     }
//   };
// };
