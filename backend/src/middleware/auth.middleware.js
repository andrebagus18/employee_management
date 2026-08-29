import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // ambil dan validasi header authorization
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    // ambil token terverify
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};
