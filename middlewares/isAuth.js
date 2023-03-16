import Jwt from "jsonwebtoken";
import config from "../config/config.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      const error = new Error("No authentication token attached");
      error.startsCode = 401;
      throw error;
    }

    const token = req.get("Authorization").split(" ")[1];
    console.log(token);
    const decoded = Jwt.verify(token, config.JWT_ACTIVATE);
    console.log(decoded);
    if (!decoded) {
      res.status(401).json({
        status: false,
        message: "Token Expired",
        data: "",
      });
    }
    const { id } = decoded;
    req.id = id;
    next();
  } catch (err) {
    next(err);
  }
};
