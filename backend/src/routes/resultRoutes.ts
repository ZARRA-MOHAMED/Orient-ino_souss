import express from 'express';
import {
  getResults,
  getUserResults,
  saveResult,
  saveStudentResult,
} from '../controllers/resultController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// Get a specific result by ID
router.get('/:resultId', verifyToken, getResults);

// Get all results for the authenticated user
router.get('/', verifyToken, getUserResults);

// Save a new result
router.post('/', verifyToken, saveResult);

// Save student results (for teachers/admins)
router.post('/student', verifyToken, saveStudentResult);

export default router;
