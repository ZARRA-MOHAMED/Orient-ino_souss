import { Router } from 'express';
import {
  getAllCareers,
  getMatchingCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  getCareerStats,
  getSimilarCareers,
  createBulkCareers,
} from '../controllers/careerController';
import verifyToken from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

// Career validation schema
const careerSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  riasecType: z.enum([
    'realistic',
    'artistic',
    'investigative',
    'social',
    'entrepeneur',
    'conventional',
  ]),
  exampleJobs: z.array(z.string()),
  tags: z.array(z.string()),
  requiredEducation: z.array(z.string()),
  schools: z.array(
    z.object({
      school: z.string(), // MongoDB ObjectId
    })
  ),
  jobMarket: z.object({
    demand: z.enum(['high', 'medium', 'low']),
    averageSalary: z.string(),
  }),
  category: z.string().optional(),
  skills: z.array(z.string()).optional(),
  careerPath: z
    .array(
      z.object({
        level: z.string(),
        title: z.string(),
        description: z.string().optional(),
        yearsOfExperience: z.number().optional(),
      })
    )
    .optional(),
});

// Public routes
router.get('/', getAllCareers);
router.get('/match/:riasecType', getMatchingCareers);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, validate(careerSchema), createCareer);
router.post('/bulk', verifyToken, verifyAdmin, createBulkCareers);
router.patch('/:id', verifyToken, verifyAdmin, validate(careerSchema.partial()), updateCareer);
router.delete('/:id', verifyToken, verifyAdmin, deleteCareer);

export default router;
