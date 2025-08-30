import { Request, Response } from "express"
import { registerSchema } from "@schemas/auth.schema"
import { ICreateUserUseCase } from "@contracts/useCases/createUser.useCase"
import { IAuthenticateUserUseCase } from "@contracts/useCases/authenticateUser.useCase"

export class RegisterController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private authenticateUseCase: IAuthenticateUserUseCase,
  ) {}

  public execute = async (req: Request, res: Response): Promise<void> => {
    const registerData = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    })

    const user = await this.createUserUseCase.create(registerData)

    const { token } = await this.authenticateUseCase.authenticate({
      privateId: user.privateId as string,
    })

    res
      .status(201)
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
        status: "Created",
        message: "Account created successfully.",
        data: {
          User: user.toUserData(),
        },
      })
  }
}
