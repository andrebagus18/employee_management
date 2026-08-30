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
    // console.log("USER", users);

    if (!users) {
      return res.status(401).json({
        msg: "Wrong Email or password",
      });
    }
    // console.log("psw:", password);
    // console.log("pswdb", users.password);
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      msg: "Login success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        roleId: true,
        employeeId: true,
        employee: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  return res.status(200).json({
    msg: "Logout success",
  });
};
