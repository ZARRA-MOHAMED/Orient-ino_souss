import { Request, Response } from "express";
import { User } from "../models/userModel";
import { School } from "../models/schoolModel";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

const matchSchoolStudent = async (req: Request) => {
  try {
    const user = req.user!;
    const existingUser = await User.findOne({ email: user.email }).lean();

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    const matchingSchools = await School.find({
      requiredHighSchoolFiliere: { $in: existingUser.filiere },
    })
      .select("title cities")
      .lean();

    return matchingSchools;
  } catch (error) {
    // Re-throw so the controller can handle it
    throw error;
  }
};

export { matchSchoolStudent };
