import { Request, Response } from "express";
import { NextFunction } from "express";
import ApiError from "../utils/apiError";
import jwt from "jsonwebtoken";

const access_token = process.env.PRIVATE_ACCESS_TOKEN as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Aunothorized");
  }
  const decoded = jwt.verify(token, access_token) as {
    id: string;
    email: string;
    role: string;
  };
  if (!decoded) {
    throw new ApiError(401, "Unauthorized");
  }
  req.user = decoded;
  next();
};

export default verifyToken;
