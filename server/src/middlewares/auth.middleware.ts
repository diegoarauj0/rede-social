import { ISessionRepository } from "@contracts/repositories/session.repository"
import { IJWTProviderService } from "@contracts/services/JWTProvider.service"
import { SessionEntity } from "@entities/session.entity"
import { UserEntity } from "@entities/user.entity"
import { AuthorizationException, AuthorizationReason } from "@exceptions/authorization.exception"
import { Request, Response, NextFunction } from "express"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { BaseMiddleware } from "./base.middleware"

interface IValidateTokenProps {
  token: string | undefined
  field: string
  callback: (token: string) => Promise<SessionEntity | null>
}

export interface IAuth {
  session: SessionEntity
  user?: UserEntity
  token: {
    field: string
    value: string
  }
}

export class AuthMiddleware extends BaseMiddleware {
  constructor(
    private JWTProviderService: IJWTProviderService,
    private sessionRepository: ISessionRepository,
  ) {
    super()
  }

  private validateToken = async (props: IValidateTokenProps): Promise<SessionEntity> => {
    if (!props.token) {
      throw new AuthorizationException({
        reason: AuthorizationReason.Missing,
        field: `cookie.${props.field}`,
      })
    }

    try {
      const session = await props.callback(props.token)

      if (!session) {
        throw new AuthorizationException({
          reason: AuthorizationReason.NotFound,
          field: `cookie.${props.field}`,
          value: props.token,
        })
      }

      return session
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new AuthorizationException({
          reason: AuthorizationReason.Invalid,
          field: `cookie.${props.field}`,
          value: props.token,
        })
      }

      if (error instanceof TokenExpiredError) {
        throw new AuthorizationException({
          reason: AuthorizationReason.Expired,
          field: `cookie.${props.field}`,
          value: props.token,
        })
      }

      throw error
    }
  }

  public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const tokenType = ((req as any).tokenType || "access") as "access" | "refresh"

    const tokenConfig: Record<
      "access" | "refresh",
      {
        cookie: string
        secret: string
        findMethod: (accessId: string, privateId: string) => Promise<SessionEntity | null>
      }
    > = {
      access: {
        cookie: "access",
        secret: process.env.SESSION_ACCESS_SECRET,
        findMethod: this.sessionRepository.findByAccessId.bind(this.sessionRepository),
      },
      refresh: {
        cookie: "refresh",
        secret: process.env.SESSION_REFRESH_SECRET,
        findMethod: this.sessionRepository.findByRefreshId.bind(this.sessionRepository),
      },
    }

    const config = tokenConfig[tokenType]

    req.auth = {
      session: await this.validateToken({
        token: req.cookies[config.cookie],
        field: config.cookie,
        callback: async (token: string) => {
          const payload = this.JWTProviderService.verify(token, config.secret)
          return config.findMethod(payload[`${tokenType}Id`], payload.privateId)
        },
      }),
      token: {
        field: `cookie.${config.cookie}`,
        value: req.cookies[config.cookie],
      },
    }

    next()
  }

  public byRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    ;(req as any).tokenType = "refresh"
    await this.execute(req, res, next)
  }
}
