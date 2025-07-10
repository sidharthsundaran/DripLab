// src/interfaces/validators/user.validator.ts
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../../shared/constants/statuscodes';
import { ErrorMessages } from '../../shared/constants/errormessages';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ErrorMessages.ALL_FIELDS_REQUIRED,
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data; // Cleaned and parsed data
  next();
};
