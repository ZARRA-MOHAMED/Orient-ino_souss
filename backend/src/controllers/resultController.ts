import { Request, Response } from 'express';
import { Result } from '../models/resultModel';
import { Diagnostique } from '../models/diagnostiqueModel';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';

// Get results for a specific diagnostic test
export const getResults = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const { userId } = req.query;

  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  const result = await Result.findOne({
    _id: resultId,
    user: userId,
  });

  if (!result) {
    throw new ApiError(404, 'Result not found');
  }

  res.status(200).json(new ApiResponse(200, result));
});

// Get all results for a user
export const getUserResults = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const results = await Result.find({ user: userId }).populate(
    'results.diagnostique',
    'name diagnostique'
  );

  res.status(200).json(new ApiResponse(200, results));
});

// Save a new result
export const saveResult = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { diagnostiqueId, scores } = req.body;

  // Find the diagnostic
  const diagnostic = await Diagnostique.findById(diagnostiqueId);

  if (!diagnostic) {
    throw new ApiError(404, 'Diagnostic not found');
  }

  // Check if user already has a result for this diagnostic
  let result = await Result.findOne({ user: userId });

  if (result) {
    // Update existing result
    const existingResultIndex = result.results.findIndex(
      (r: any) => r.diagnostique.toString() === diagnostiqueId
    );

    if (existingResultIndex >= 0) {
      // Update existing result
      result.results[existingResultIndex].scores = scores;
    } else {
      // Add new result
      result.results.push({ diagnostique: diagnostiqueId, scores });
    }

    await result.save();
  } else {
    // Create new result
    result = await Result.create({
      user: userId,
      results: [{ diagnostique: diagnostiqueId, scores }],
    });
  }

  res.status(201).json(new ApiResponse(201, result));
});

// Save student results (for teachers/admins)
export const saveStudentResult = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, diagnostiqueId, scores } = req.body;

  // Find the diagnostic
  const diagnostic = await Diagnostique.findById(diagnostiqueId);

  if (!diagnostic) {
    throw new ApiError(404, 'Diagnostic not found');
  }

  // Check if student already has a result for this diagnostic
  let result = await Result.findOne({ user: studentId });

  if (result) {
    // Update existing result
    const existingResultIndex = result.results.findIndex(
      (r: any) => r.diagnostique.toString() === diagnostiqueId
    );

    if (existingResultIndex >= 0) {
      // Update existing result
      result.results[existingResultIndex].scores = scores;
    } else {
      // Add new result
      result.results.push({ diagnostique: diagnostiqueId, scores });
    }

    await result.save();
  } else {
    // Create new result
    result = await Result.create({
      user: studentId,
      results: [{ diagnostique: diagnostiqueId, scores }],
    });
  }

  res.status(201).json(new ApiResponse(201, result));
});
