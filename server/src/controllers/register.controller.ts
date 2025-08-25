import { Request, Response } from "express"
import { CreateUserUseCase } from "@useCases/createUser/createUser.useCase"
import { AuthenticateUseCase } from "@useCases/authenticateUser/authenticateUser.useCase"
import { registerSchema } from "@schemas/auth.schema"
import { SessionRepository } from "@repositories/session.repository"
import { UserRepository } from "@repositories/user.repository"
import { PasswordHasherService } from "@services/passwordHasher.service"
import { JWTProviderService } from "@services/JWTProvider.service"

export class RegisterController {
  private createUserUseCase = new CreateUserUseCase(new UserRepository(), new PasswordHasherService())
  private authenticateUseCase = new AuthenticateUseCase(new SessionRepository(), new JWTProviderService())

  public execute = async (req: Request, res: Response): Promise<void> => {
    const registerData = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    })

    const user = await this.createUserUseCase.execute(registerData)

    const { accessToken, refreshToken } = await this.authenticateUseCase.execute({
      privateId: user.privateId as string,
    })

    res
      .status(201)
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
        status: "Created",
        message: "Account created successfully.",
        data: {
          user: user.toJSON(),
        },
      })
  }
}
