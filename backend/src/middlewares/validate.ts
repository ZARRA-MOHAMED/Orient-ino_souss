import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.format(),
      });
      return; // 🚫 Don't return res directly — just exit
    }

    req.body = result.data;
    next();
  };
};
