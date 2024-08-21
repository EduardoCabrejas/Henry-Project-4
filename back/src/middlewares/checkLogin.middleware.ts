import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("Token not provided in headers.");
    return next(new ClientError("Token is required"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.error("Token extraction failed.");
    return next(new ClientError("Token is required"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    req.body.userId = decoded.userId;
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new ClientError("Invalid token"));
  }
  next();
};

export default checkLogin;
