import { Request,Response } from "express";
import { registerUser } from "../../application/use-cases/user/createUser.useCase";
import { UserRepositoryImpl } from "../../infrastructure/implementations/userRepositoryImpl";
import { StatusCode } from "../../shared/constants/statuscodes";
import { ErrorMessages } from "../../shared/constants/errormessages";
import  jwt  from "jsonwebtoken";
import { UserModel } from "../../infrastructure/database/models/user.model";


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