import { Request, RequestHandler, Response } from "express";
import ApiError from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/authService";
import ApiResponse from "../utils/apiResponse";
import { IUser } from "../types/authTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import dotenv from "dotenv";
import { token } from "morgan";
import { matchSchoolStudent } from "../services/matchSchoolStudent";
import { User } from "../models/userModel";

dotenv.config();

const access_token = process.env.PRIVATE_ACCESS_TOKEN as string;
const refresh_token = process.env.PRIVATE_REFRESH_TOKEN as string;

const register = asyncHandler(async (req: Request, res: Response) => {
  const data: IUser = req.body;
  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.birthDate ||
    !data.gender ||
    !data.role
  ) {
    throw new ApiError(404, "All Field Are Required");
  }
  const profilePicture = req.file ? req.file?.buffer : null;
  const ExistingUser = await getUserByEmail(data.email);
  if (ExistingUser) {
    throw new ApiError(404, "User Already Exist");
  }

  const User = await createUser({
    ...data,
    // profilePicture: profilePicture,
    // mimeType: profilePicture ? req.file?.mimetype : null,
  });
  res
    .status(200)
    .send(new ApiResponse(200, { User }, "User Added Successfully"));
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(password);

  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const PasswordVerified = await user.comparePassword(password);
  if (!PasswordVerified) {
    throw new ApiError(404, "Password Not Matched");
  }
  console.log("This Is The tOKEN", access_token);
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    access_token,
    {
      expiresIn: "1d",
    }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    refresh_token,
    { expiresIn: "7d" }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res
    .status(200)
    .send(new ApiResponse(200, { accessToken }, "User Login Successfully"));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res
    .status(200)
    .send(new ApiResponse(200, { message: "User Logout Successfully" }));
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    throw new ApiError(404, "Refresh Token Not Found");
  }
  const decoded: any = jwt.verify(refreshToken, refresh_token);
  console.log("THis Is tHE Decoded", decoded);
  const user = await getUserById(decoded.id);
  console.log("THis Is tHE User", user);
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    access_token,
    {
      expiresIn: "1d",
    }
  );
  req.headers.authorization = `Bearer ${accessToken}`; //Is That Will Added Authomatically
  res
    .status(200)
    .send(
      new ApiResponse(200, { accessToken }, "User Refresh Token Successfully")
    );
});


const getMatchingSchools: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const schools = await matchSchoolStudent(req);
    if (!schools || schools.length === 0) {
      res
        .status(200)
        .send(new ApiResponse(200, [], "No matching schools found"));
    }

    res
      .status(200)
      .send(new ApiResponse(200, schools, "Schools matched successfully"));
  }
);

export { register, login, logout, refreshToken, IUser, getMatchingSchools };
