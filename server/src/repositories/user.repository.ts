import { v4 as uuidv4 } from "uuid"
import { IUserRepository } from "@contracts/repositories/user.repository"
import { IUserEntityProps, UserEntity } from "@entities/user.entity"
import { IUser, userModel } from "@models/user.model"

export class UserRepository implements IUserRepository {
  private async findOneByField<K extends keyof IUser>(field: K, value: IUser[K]): Promise<UserEntity | null> {
    const userDocument = await userModel.findOne({ [field]: value })

    if (!userDocument) return null

    return new UserEntity({
      username: userDocument.username,
      nickname: userDocument.nickname,
      password: userDocument.password,
      email: userDocument.email,
      database: {
        createdAt: userDocument.createdAt,
        updatedAt: userDocument.updatedAt,
        privateId: userDocument.privateId,
        publicId: userDocument.publicId,
      },
    })
  }

  public findByEmail(email: string) {
    return this.findOneByField("email", email)
  }

  public findByUsername(username: string) {
    return this.findOneByField("username", username)
  }

  public findByPrivateId(privateId: string) {
    return this.findOneByField("privateId", privateId)
  }

  public findByPublicId(publicId: number) {
    return this.findOneByField("publicId", publicId)
  }

  public create(user: Omit<IUserEntityProps, "database">): UserEntity {
    return new UserEntity(user)
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
      publicId: userDocument.publicId || (await userModel.countDocuments()),
      privateId: userDocument.privateId || uuidv4(),
    })

    const savedUser = await userDocument.save()
    return new UserEntity({ ...savedUser, database: savedUser })
  }
}
