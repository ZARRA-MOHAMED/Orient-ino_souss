import { Router } from 'express';
import {
  getQuestionsByDiagnostic,
  getQuestionsByDiagnosticId,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController';

const Route = Router();

// Get questions by diagnostic name
Route.get('/:diagnosticName', getQuestionsByDiagnostic);

// Get questions by diagnostic ID
Route.get('/:diagnosticId', getQuestionsByDiagnosticId);

// Get a single question by ID
Route.get('/:questionId', getQuestionById);

// Create a new question
Route.post('/question', createQuestion);

// Update a question
Route.patch('/:questionId', updateQuestion);

// Delete a question
Route.delete('/:questionId', deleteQuestion);

export default Route;