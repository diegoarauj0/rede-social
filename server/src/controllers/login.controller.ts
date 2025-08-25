import { Request, Response } from "express"
import { ValidateUserUseCase } from "@useCases/validateUser/validateUser.useCase"
import { AuthenticateUseCase } from "@useCases/authenticateUser/authenticateUser.useCase"
import { loginSchema } from "@schemas/auth.schema"
import { UserRepository } from "@repositories/user.repository"
import { PasswordHasherService } from "@services/passwordHasher.service"
import { JWTProviderService } from "@services/JWTProvider.service"
import { SessionRepository } from "@repositories/session.repository"

export class LoginController {
  private validateUserUseCase = new ValidateUserUseCase(new UserRepository(), new PasswordHasherService())
  private authenticateUseCase = new AuthenticateUseCase(new SessionRepository(), new JWTProviderService())

  public execute = async (req: Request, res: Response): Promise<void> => {
    const loginData = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    })

    const user = await this.validateUserUseCase.execute(loginData)

    const { accessToken, refreshToken } = await this.authenticateUseCase.execute({
      privateId: user.privateId as string,
    })

    res
      .status(200)
      .cookie("refresh", refreshToken, {
        httpOnly: true,
        secure: process.env.SESSION_SECURE == "true",
        maxAge: Number(process.env.SESSION_REFRESH_EXPIRE) * 1000,
      })
      .cookie("access", accessToken, {
        httpOnly: true,
        secure: process.env.SESSION_SECURE == "true",
        maxAge: Number(process.env.SESSION_ACCESS_EXPIRE) * 1000,
      })
      .json({
        success: true,
        responseFormat: "user",
        status: "Ok",
        message: "Login successful.",
        data: {
          user: user.toUserData(),
        },
      })
  }
}
