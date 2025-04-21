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
Route.get('/diagnostic/:diagnosticName/questions', getQuestionsByDiagnostic);

// Get questions by diagnostic ID
Route.get('/diagnostic/id/:diagnosticId/questions', getQuestionsByDiagnosticId);

// Get a single question by ID
Route.get('/questions/:questionId', getQuestionById);

// Create a new question
Route.post('/questions', createQuestion);

// Update a question
Route.patch('/questions/:questionId', updateQuestion);

// Delete a question
Route.delete('/questions/:questionId', deleteQuestion);

export default Route;
