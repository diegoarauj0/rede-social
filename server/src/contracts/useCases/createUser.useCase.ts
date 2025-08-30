import { UserEntity } from "@entities/user.entity"

export interface ICreateUserDTO {
  username: string
  email: string
  password: string
}

export interface ICreateUserUseCase {
  create: (dto: ICreateUserDTO) => Promise<UserEntity>
}
