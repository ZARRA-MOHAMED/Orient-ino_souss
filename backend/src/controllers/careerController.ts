import { Request, Response } from "express";
import { User } from "../models/userModel";
import careerService from "../services/careerService";
import { Career } from "../models/careerModel";
import { ERIASEC } from '../types/resultTypes';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';

const creerController = async(req: Request, res: Response) => {
    const user = req.user;
    console.log(user)
    const existingUser = await User.findOne({ _id: user.id});
    console.log(existingUser)
    const result = careerService(existingUser.riasec as {[key: string]: number});
    const lowered = result.map(item => item.toLowerCase());
    console.log(lowered);

    const matchingWorks = await Career.find({
        riasecType: { $in: lowered }
      });
    console.log("this is the matci=hing result", matchingWorks);
    res.status(201).send(matchingWorks);
}


export default creerController;


// Get all careers
export const getAllCareers = asyncHandler(async (req: Request, res: Response) => {
  const careers = await Career.find();
  res.status(200).send(new ApiResponse(200, careers, 'Careers retrieved successfully'));
});

// Get careers matching RIASEC type
export const getMatchingCareers = asyncHandler(async (req: Request, res: Response) => {
  const { riasecType } = req.params;

  // Validate RIASEC type
  if (!Object.values(ERIASEC).includes(riasecType as ERIASEC)) {
    throw new ApiError(400, 'Invalid RIASEC type');
  }

  const careers = await Career.find({ riasecType });
  res.status(200).send(new ApiResponse(200, careers, 'Matching careers retrieved successfully'));
});

// Create a new career
export const createCareer = asyncHandler(async (req: Request, res: Response) => {
  const newCareer = await Career.create(req.body);
  res.status(201).send(new ApiResponse(201, newCareer, 'Career created successfully'));
});

// Update a career
export const updateCareer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedCareer = await Career.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCareer) {
    throw new ApiError(404, 'Career not found');
  }

  res.status(200).send(new ApiResponse(200, updatedCareer, 'Career updated successfully'));
});

// Delete a career
export const deleteCareer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const career = await Career.findByIdAndDelete(id);

  if (!career) {
    throw new ApiError(404, 'Career not found');
  }

  res.status(204).send(new ApiResponse(204, null, 'Career deleted successfully'));
});

// Get career statistics
export const getCareerStats = asyncHandler(async (req: Request, res: Response) => {
  const [totalCareers, riasecStats, demandStats, salaryStats] = await Promise.all([
    Career.countDocuments(),
    Career.aggregate([{ $group: { _id: '$riasecType', count: { $sum: 1 } } }]),
    Career.aggregate([{ $group: { _id: '$jobMarket.demand', count: { $sum: 1 } } }]),
    Career.aggregate([{ $group: { _id: null, avgSalary: { $avg: '$jobMarket.averageSalary' } } }]),
  ]);

  const stats = {
    totalCareers,
    riasecDistribution: riasecStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
    demandDistribution: demandStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
    averageSalary: salaryStats[0]?.avgSalary || 0,
  };

  res.status(200).send(new ApiResponse(200, stats, 'Career statistics retrieved successfully'));
});

// Get similar careers
export const getSimilarCareers = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const limit = parseInt(req.query.limit as string) || 5;

  const career = await Career.findById(id);
  if (!career) {
    throw new ApiError(404, 'Career not found');
  }

  const similarCareers = await Career.find({
    _id: { $ne: career._id },
    $or: [{ riasecType: career.riasecType }, { tags: { $in: career.tags } }],
  })
    .limit(limit)
    .populate('schools.school');

  res
    .status(200)
    .send(new ApiResponse(200, similarCareers, 'Similar careers retrieved successfully'));
});

// Create multiple careers at once
export const createBulkCareers = asyncHandler(async (req: Request, res: Response) => {
  const { careers } = req.body;

  if (!Array.isArray(careers) || careers.length === 0) {
    throw new ApiError(400, 'Please provide an array of careers');
  }

  const result = await Career.insertMany(careers);
  res
    .status(201)
    .send(new ApiResponse(201, result, `Successfully created ${result.length} careers`));
});

