import { SessionEntity } from "@entities/session.entity"
import { ISessionRepository } from "@contracts/repositories/session.repository"
import { IJWTProviderService } from "@contracts/services/JWTProvider.service"
import { IAuthenticateUserDTO } from "./authenticateUser.DTO"

export class AuthenticateUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private JWTProviderService: IJWTProviderService,
  ) {}

  public async execute(
    authenticateUserDTO: IAuthenticateUserDTO,
  ): Promise<{ refreshToken: string; accessToken: string; session: SessionEntity }> {
    const session = this.sessionRepository.create({
      privateId: authenticateUserDTO.privateId as string
    })

    await this.sessionRepository.save(session, {
      access: Number(process.env.SESSION_ACCESS_EXPIRE || 0),
      refresh: Number(process.env.SESSION_REFRESH_EXPIRE || 0),
    })

    const accessToken = this.JWTProviderService.create(
      {
        access: session.accessId,
        privateId: session.privateId,
      },
      process.env.SESSION_ACCESS_SECRET,
      Number(process.env.SESSION_ACCESS_EXPIRE) * 1000,
    )

    const refreshToken = this.JWTProviderService.create(
      {
        refresh: session.refreshId,
        privateId: session.privateId,
      },
      process.env.SESSION_ACCESS_SECRET,
      Number(process.env.SESSION_REFRESH_EXPIRE) * 1000,
    )

    return { accessToken, refreshToken, session }
  }
}
