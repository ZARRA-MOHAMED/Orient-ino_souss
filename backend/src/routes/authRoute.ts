import { z } from 'zod';
import { Router } from 'express';
import {
  getMatchingSchools,
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/userController';
import { validate } from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import { memoryStorage } from 'multer';
import upload from '../config/multer';

const Route = Router();

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  birthDate: z.string().transform((str) => new Date(str)),
  gender: z.string(),
  role: z.string().default('student'),
  nivauxScolaire: z.string(),
  filiere: z.string().optional(),
  branche: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const multer = memoryStorage();
Route.post('/register', /*upload.single('profilePicture')*/ validate(registerSchema), register);

Route.post('/login', validate(loginSchema), login);

Route.post('/logout', verifyToken, logout);

Route.post('/refresh-token', refreshToken);

Route.get('/get-schools', verifyToken, getMatchingSchools);

Route.get('/verify', verifyToken, verifyToken);

export default Route;
