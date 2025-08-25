import { v4 as uuidv4 } from "uuid"
import { IUserRepository } from "@contracts/repositories/user.repository"
import { UserEntity } from "@entities/user.entity"
import { IUser, userModel } from "@models/user.model"

export class UserRepository implements IUserRepository {
  private createUserEntity(user: IUser, fromDatabase: boolean): UserEntity {
    return new UserEntity({
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      database: fromDatabase,
      privateId: user.privateId,
      publicId: user.publicId,
    })
  }

  private async findOneByField<K extends keyof IUser>(field: K, value: IUser[K]): Promise<UserEntity | null> {
    const userDocument = await userModel.findOne({ [field]: value })
    return userDocument ? this.createUserEntity(userDocument, true) : null
  }

  public findUserByEmail(email: string) {
    return this.findOneByField("email", email)
  }

  public findUserByPrivateId(privateId: string) {
    return this.findOneByField("privateId", privateId)
  }

  public findUserByPublicId(publicId: number) {
    return this.findOneByField("publicId", publicId)
  }

  public countDocuments(): Promise<number> {
    return userModel.countDocuments()
  }

  public createUser(
    user: Omit<UserEntity, "createdAt" | "updatedAt" | "publicId" | "privateId" | "database" | "toJSON">,
  ): UserEntity {
    return new UserEntity({
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      database: false,
    })
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    let userDocument = await userModel.findOne({ privateId: user.privateId })

    if (!userDocument) {
      userDocument = new userModel(user)
    }

    Object.assign(userDocument, {
      nickname: user.nickname,
      password: user.password,
      updatedAt: new Date(),
      createdAt: userDocument.createdAt || new Date(),
      publicId: userDocument.publicId || await userModel.countDocuments(),
      privateId: userDocument.privateId || uuidv4()
    })

    const savedUser = await userDocument.save()
    return this.createUserEntity(savedUser, true)
  }
}
