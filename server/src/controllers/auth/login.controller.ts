import { Request, Response } from "express"
import { loginSchema } from "@schemas/auth.schema"
import { UserRepository } from "@repositories/user.repository"
import { PasswordHasherService } from "@services/passwordHasher.service"
import { JWTProviderService } from "@services/JWTProvider.service"
import { SessionRepository } from "@repositories/session.repository"
import { IValidateUserUseCase } from "@contracts/useCases/validateUser.useCase"
import { IAuthenticateUserUseCase } from "@contracts/useCases/authenticateUser.useCase"

export class LoginController {
  constructor(
    private validateUserUseCase: IValidateUserUseCase,
    private authenticateUseCase: IAuthenticateUserUseCase,
  ) {}

  public execute = async (req: Request, res: Response): Promise<void> => {
    const loginData = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    })

    const user = await this.validateUserUseCase.validate(loginData)

    const { token } = await this.authenticateUseCase.authenticate({
      privateId: user.privateId as string,
    })

    res
      .status(200)
      .cookie("refresh", token.refresh, {
        httpOnly: true,
        secure: process.env.SESSION_SECURE == "true",
        maxAge: Number(process.env.SESSION_REFRESH_EXPIRE) * 1000,
      })
      .cookie("access", token.access, {
        httpOnly: true,
        secure: process.env.SESSION_SECURE == "true",
        maxAge: Number(process.env.SESSION_ACCESS_EXPIRE) * 1000,
      })
      .json({
        success: true,
        responseFormat: "User",
        status: "Ok",
        message: "Login successful.",
        data: {
          User: user.toUserData(),
        },
      })
  }
}
