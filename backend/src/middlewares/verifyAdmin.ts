import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import { ERole } from '../types/authTypes';
import { getUserById } from '../services/authService';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user || user.role !== ERole.ADMIN) {
      throw new ApiError(403, 'Access denied. Admin only.');
    }
    next();
  } catch (error) {
    next(error);
  }
};
