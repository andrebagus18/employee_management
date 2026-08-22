import { prisma } from "../lib/prisma.js";

export const create = async (req, res) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({
      msg: "Bad Request",
    });
  }
  const department = await prisma.department.create({
    data: {
      name: name,
    },
  });

  return res.status(201).json(department);
};
