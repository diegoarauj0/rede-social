import { UserEntity } from "@entities/user.entity"

export interface IByPublicIdDTO {
  publicId: number
}

export interface IByPrivateIdDTO {
  privateId: string
}

export interface IByEmailDTO {
  email: string
}

export interface IByUsernameDTO {
  username: string
}

export interface IFindParamsDTO {
  privateId?: string
  publicId?: number
  username?: string
  email?: string
}

export interface IFindUserUseCase {
  findByPrivateId: (dto: IByPrivateIdDTO) => Promise<UserEntity | null>
  findByUsername: (dto: IByUsernameDTO) => Promise<UserEntity | null>
  findByPublicId: (dto: IByPublicIdDTO) => Promise<UserEntity | null>
  findByEmail: (dto: IByEmailDTO) => Promise<UserEntity | null>
  findByParams: (
    dto: IFindParamsDTO,
  ) => Promise<{ user: UserEntity | null; target?: string; value?: string | number }>
}
