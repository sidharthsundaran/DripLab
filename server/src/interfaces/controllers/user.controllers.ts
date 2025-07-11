import { Request,Response } from "express";
import { registerUser } from "../../application/use-cases/user/createUser.useCase";
import { UserRepositoryImpl } from "../../infrastructure/implementations/userRepositoryImpl";
import { StatusCode } from "../../shared/constants/statuscodes";
import { ErrorMessages } from "../../shared/constants/errormessages";
import  jwt  from "jsonwebtoken";
import { UserModel } from "../../infrastructure/database/models/user.model";
import { loginUser } from "../../application/use-cases/user/loginUser.useCase";


export const registerUserController =  async(req:Request ,res:Response) =>{
    try {
        const userRepo = new UserRepositoryImpl
        const user = await registerUser(req.body,userRepo)
        res.status(StatusCode.CREATED).json({user})
    } catch (error:any) {
        res.status(StatusCode.BAD_REQUEST).json({message:error.message})
        
    }
}

export const verifyUserController =async (req:Request ,res:Response)=>{
    try {
        const {token }=req.params
        const decoded: any = jwt.verify(token,process.env.JWT_SECRET as string)
const user = await UserModel.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: ErrorMessages.USER_NOT_FOUND });
    }
        res.status(StatusCode.ACCEPTED).json({message:ErrorMessages.VERIFY_SUCCESS })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json({message:ErrorMessages.INVALID_TOKEN})
    }
}
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepo = new UserRepositoryImpl();
    const { user, accessToken, refreshToken } = await loginUser(email, password, userRepo);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/users/refresh-token',
      maxAge: 28 * 24 * 60 * 60 * 1000, // 28 days
    });

    res.status(StatusCode.OK).json({ user, accessToken });
  } catch (error: any) {
    res.status(StatusCode.UNAUTHORIZED).json({ message: error.message });
  }
};


export const refreshAccessTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};


export const logoutUserController = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    path: '/api/users/refresh-token',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

