import { Router } from 'express';
import {
  getAllSchools,
  getSchoolById,
  getMatchingSchools,
  createSchool,
  updateSchool,
  deleteSchool,
} from '../controllers/schoolController';
import verifyToken  from '../middlewares/verifyToken';
import { verifyAdmin } from '../middlewares/verifyAdmin';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

// School validation schema
const schoolSchema = z.object({
  title: z.string().min(2),
  website: z.string().optional(),
  cities: z.array(z.string()),
  schoolType: z.enum(['public', 'private']),
  establishmentType: z.enum(['university', 'school', 'institute', 'faculty', 'cpge']),
  fields: z.array(z.string()),
  diplomaLevels: z.array(z.string()),
  requiredHighSchoolFiliere: z.array(z.string()),
  requiredHighSchoolBranche: z.array(z.string()),
  admission: z.object({
    requiresExam: z.boolean(),
    minGrade: z.string(),
    processDescription: z.string(),
  }),
  concours: z.array(
    z.object({
      name: z.string(),
      branches: z.record(z.any()),
    })
  ),
  isBoardingAvailable: z.boolean(),
  isScholarshipAvailable: z.boolean(),
  internationalPrograms: z.boolean(),
});

// Public routes
router.get('/', getAllSchools);
router.get('/match', getMatchingSchools);
router.get('/:id', getSchoolById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, validate(schoolSchema), createSchool);

router.patch('/:id', verifyToken, verifyAdmin, validate(schoolSchema.partial()), updateSchool);

router.delete('/:id', verifyToken, verifyAdmin, deleteSchool);

export default router;
