import { IUserRepository } from "@contracts/repositories/user.repository"
import { BaseMiddleware } from "./base.middleware"
import { AuthMiddleware, IAuth } from "./auth.middleware"
import { Response, NextFunction, Request } from "express"
import { AuthorizationException, AuthorizationReason } from "@exceptions/authorization.exception"

export class FindUserMiddleware extends BaseMiddleware {
  constructor(private userRepository: IUserRepository, private authMiddleware: AuthMiddleware) {
    super()
  }

  public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.auth?.session) {
      await this.authMiddleware.execute(req, res, () => {})
    }

    const user = await this.userRepository.findByPrivateId(req.auth!.session.privateId)

    if (!user) {
      throw new AuthorizationException({
        field: req.auth!.token.field,
        value: req.auth!.token.value,
        reason: AuthorizationReason.NotFound,
      })
    }

    ;(req.auth as any).user = user
    next()
  }

  public byRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    ;(req as any).tokenType = "refresh"
    await this.execute(req, res, next)
  }
}
