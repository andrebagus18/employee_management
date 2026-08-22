import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        roleId: true,
        employeeId: true,
      },
    });
    console.log("USER", users);

    if (!users) {
      return res.status(401).json({
        msg: "Wrong Email or password",
      });
    }
    console.log("psw:", password);
    console.log("pswdb", users.password);
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Wrong email or password",
      });
    }
    const token = jwt.sign(
      {
        userId: users.id,
        roleId: users.roleId,
        employeeId: users.employeeId,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      msg: "Login success",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
