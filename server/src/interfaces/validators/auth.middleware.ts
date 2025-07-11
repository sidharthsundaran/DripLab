import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../shared/types/userPayload';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload | string;

    if (typeof decoded === 'object' && decoded.id && decoded.email) {
      req.user = {
        id: decoded.id as string,
        email: decoded.email as string,
      };
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
