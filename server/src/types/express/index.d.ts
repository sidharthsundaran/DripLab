import { UserPayload } from '../../shared/types/userPayload';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}