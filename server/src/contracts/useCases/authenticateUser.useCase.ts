import { SessionEntity } from "@entities/session.entity"

export interface IAuthenticateUserDTO {
  privateId: string
}

export interface IAuthenticateUserUseCase {
  authenticate: (
    dto: IAuthenticateUserDTO,
  ) => Promise<{ token: { refresh: string; access: string }; session: SessionEntity }>
}
