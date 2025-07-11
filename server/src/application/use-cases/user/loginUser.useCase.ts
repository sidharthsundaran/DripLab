import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../domain/repositories/user.repo';
import { UserEntity } from '../../../domain/entities/user.entity';
export const loginUser = async (
  email: string,
  password: string,
  userRepo: IUserRepository
): Promise<{ user: UserEntity; accessToken: string; refreshToken: string }> => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = jwt.sign(
  { id: user.id, email: user.email }, 
  process.env.JWT_SECRET!,
  { expiresIn: '15m' }
);


  const refreshToken = jwt.sign(
  { id: user.id },
  process.env.REFRESH_SECRET!, // ✅ Match your .env
  { expiresIn: '28d' }
);
  return { user, accessToken, refreshToken };
};
