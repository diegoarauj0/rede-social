import { SessionEntity } from "@entities/session.entity"
import { ISessionRepository } from "@contracts/repositories/session.repository"
import { IJWTProviderService } from "@contracts/services/JWTProvider.service"
import { IAuthenticateUserDTO, IAuthenticateUserUseCase } from "@contracts/useCases/authenticateUser.useCase"

export class AuthenticateUseCase implements IAuthenticateUserUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private JWTProviderService: IJWTProviderService,
  ) {}

  public async authenticate(
    dto: IAuthenticateUserDTO,
  ): Promise<{ token: { refresh: string; access: string }; session: SessionEntity }> {
    const session = this.sessionRepository.create({
      privateId: dto.privateId as string,
    })

    await this.sessionRepository.save(session, {
      access: Number(process.env.SESSION_ACCESS_EXPIRE || 0),
      refresh: Number(process.env.SESSION_REFRESH_EXPIRE || 0),
    })

    const access = this.JWTProviderService.create(
      {
        accessId: session.accessId,
        privateId: session.privateId,
      },
      process.env.SESSION_ACCESS_SECRET,
      Number(process.env.SESSION_ACCESS_EXPIRE) * 1000,
    )

    const refresh = this.JWTProviderService.create(
      {
        refreshId: session.refreshId,
        privateId: session.privateId,
      },
      process.env.SESSION_ACCESS_SECRET,
      Number(process.env.SESSION_REFRESH_EXPIRE) * 1000,
    )

    return { token: { refresh, access }, session }
  }
}
