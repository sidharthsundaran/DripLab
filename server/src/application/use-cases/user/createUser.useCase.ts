import { UserEntity } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repo";
import { ErrorMessages } from "../../../shared/constants/errormessages";
import  bcrypt from  'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from "../../../infrastructure/services/mail.service";

export const registerUser = async (
    userData :UserEntity,
    userRepo: IUserRepository
)=>{
    const existing  =  await userRepo.findByEmail(userData.email)
    if (existing) throw new Error(ErrorMessages.EMAIL_IN_USE)
    const hashedPassword =  await bcrypt.hash(userData.password,10)
    const newUser = await userRepo.create({...userData ,password:hashedPassword})
    const token =jwt.sign({id:newUser.id},process.env.JWT_SECRET as string,{expiresIn:'1d'})
    await sendVerificationEmail(newUser.email,token)
    return newUser
}