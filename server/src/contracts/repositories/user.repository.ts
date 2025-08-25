import { UserEntity } from "entities/user.entity"

export interface IUserRepository {
  findUserByEmail: (email: string) => Promise<UserEntity | null>
  findUserByPublicId: (publicId: number) => Promise<UserEntity | null>
  findUserByPrivateId: (privateId: string) => Promise<UserEntity | null>
  countDocuments: () => Promise<number>
  save: (user: UserEntity) => Promise<UserEntity>
  createUser: (
    user: Omit<UserEntity, "createdAt" | "updatedAt" | "publicId" | "privateId" | "database" | "toJSON">,
  ) => UserEntity
}
