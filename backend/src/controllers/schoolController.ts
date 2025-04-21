import { Request, Response } from 'express';
import { School, ISchoolSchema } from '../models/schoolModel';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import { asyncHandler } from '../utils/asyncHandler';

// Get all schools
export const getAllSchools = asyncHandler(async (req: Request, res: Response) => {
  const schools = await School.find();
  res.status(200).send(new ApiResponse(200, schools, 'Schools retrieved successfully'));
});

// Get school by ID
export const getSchoolById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const school = await School.findById(id);

  if (!school) {
    throw new ApiError(404, 'School not found');
  }

  res.status(200).send(new ApiResponse(200, school, 'School retrieved successfully'));
});

// Get matching schools based on requirements
export const getMatchingSchools = asyncHandler(async (req: Request, res: Response) => {
  const {
    filiere,
    branche,
    city,
    schoolType,
    establishmentType,
    diplomaLevel,
    minGrade,
    requiresExam,
    isBoardingAvailable,
    isScholarshipAvailable,
    internationalPrograms,
  } = req.query;

  // Build query based on provided parameters
  const query: any = {};

  if (filiere) {
    query['requiredHighSchoolFiliere'] = filiere;
  }
  if (branche) {
    query['requiredHighSchoolBranche'] = branche;
  }
  if (city) {
    query['cities'] = city;
  }
  if (schoolType) {
    query['schoolType'] = schoolType;
  }
  if (establishmentType) {
    query['establishmentType'] = establishmentType;
  }
  if (diplomaLevel) {
    query['diplomaLevels'] = diplomaLevel;
  }
  if (minGrade) {
    query['admission.minGrade'] = { $lte: parseFloat(minGrade as string) };
  }
  if (requiresExam !== undefined) {
    query['admission.requiresExam'] = requiresExam === 'true';
  }
  if (isBoardingAvailable !== undefined) {
    query['isBoardingAvailable'] = isBoardingAvailable === 'true';
  }
  if (isScholarshipAvailable !== undefined) {
    query['isScholarshipAvailable'] = isScholarshipAvailable === 'true';
  }
  if (internationalPrograms !== undefined) {
    query['internationalPrograms'] = internationalPrograms === 'true';
  }

  const schools = await School.find(query);
  res.status(200).send(new ApiResponse(200, schools, 'Matching schools retrieved successfully'));
});

// Create a new school
export const createSchool = asyncHandler(async (req: Request, res: Response) => {
  const newSchool = await School.create(req.body);
  res.status(201).send(new ApiResponse(201, newSchool, 'School created successfully'));
});

// Update a school
export const updateSchool = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedSchool = await School.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSchool) {
    throw new ApiError(404, 'School not found');
  }

  res.status(200).send(new ApiResponse(200, updatedSchool, 'School updated successfully'));
});

// Delete a school
export const deleteSchool = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const school = await School.findByIdAndDelete(id);

  if (!school) {
    throw new ApiError(404, 'School not found');
  }

  res.status(204).send(new ApiResponse(204, null, 'School deleted successfully'));
});
