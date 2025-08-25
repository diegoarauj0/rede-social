import { IUserEntityProps, UserEntity } from "entities/user.entity"

export interface IUserRepository {
  findByEmail: (email: string) => Promise<UserEntity | null>
  findByUsername: (username: string) => Promise<UserEntity | null>
  findByPublicId: (publicId: number) => Promise<UserEntity | null>
  findByPrivateId: (privateId: string) => Promise<UserEntity | null>
  save: (user: UserEntity) => Promise<UserEntity>
  create: (user: Omit<IUserEntityProps, "database">) => UserEntity
}
