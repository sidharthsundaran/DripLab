import { UserModel } from "../database/models/user.model";
import { IUserRepository } from "../../domain/repositories/user.repo";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserRepositoryImpl implements IUserRepository {
    async create(user: UserEntity): Promise<UserEntity> {
        const newUser = new UserModel(user)
        return await newUser.save()
    }
    async findByEmail(email:string):Promise<UserEntity | null> {
        return await UserModel.findOne({email})
    }
}