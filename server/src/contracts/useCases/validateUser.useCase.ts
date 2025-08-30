import { UserEntity } from "@entities/user.entity"

export interface IValidateUserDTO {
  email: string
  password: string
}

export interface IValidateUserUseCase {
  validate: (dto: IValidateUserDTO) => Promise<UserEntity>
}
