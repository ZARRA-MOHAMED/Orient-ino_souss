import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { Question } from '../models/questionModel';
import { Diagnostique } from '../models/diagnostiqueModel';
import ApiResponse from '../utils/apiResponse';
import ApiError from '../utils/apiError';

// Get questions by diagnostic name
export const getQuestionsByDiagnostic = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log("ee");
    
    const { diagnosticName } = req.params;
    console.log(diagnosticName);

    // Find the diagnostic by name
    const diagnostic = await Diagnostique.findOne({ diagnostique: diagnosticName });
    console.log(diagnostic);

    if (!diagnostic) {
      throw new ApiError(404, `Diagnostic with name ${diagnosticName} not found`);
    }

    // Find all questions for this diagnostic
    const questions = await Question.find({ diagnostique: diagnostic._id });
    console.log(questions);

    res.status(200).send(new ApiResponse(200, questions));
  }
);

// Get questions by diagnostic ID
export const getQuestionsByDiagnosticId = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { diagnosticId } = req.params;

    // Find all questions for this diagnostic
    const questions = await Question.find({ diagnostique: diagnosticId });

    res.status(200).send(new ApiResponse(200, questions));
  }
);

// Get a single question by ID
export const getQuestionById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId);

  if (!question) {
    throw new ApiError(404, `Question with ID ${questionId} not found`);
  }

  res.status(200).send(new ApiResponse(200, question));
});

// Create a new question
export const createQuestion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const question = await Question.create(req.body);

  res.status(201).send(new ApiResponse(201, question));
});

// Update a question
export const updateQuestion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;

  const question = await Question.findByIdAndUpdate(questionId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!question) {
    throw new ApiError(404, `Question with ID ${questionId} not found`);
  }

  res.status(200).send(new ApiResponse(200, question));
});

// Delete a question
export const deleteQuestion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;

  const question = await Question.findByIdAndDelete(questionId);

  if (!question) {
    throw new ApiError(404, `Question with ID ${questionId} not found`);
  }

  res.status(204).send();
});
