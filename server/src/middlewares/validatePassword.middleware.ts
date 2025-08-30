import { IPasswordHasherService } from "@contracts/services/passwordHasher.service"
import { BaseMiddleware } from "./base.middleware"
import { FindUserMiddleware } from "./findUser.middleware"
import { NextFunction, Request, Response } from "express"
import { passwordSchema } from "@schemas/common.schema"
import { ValidationErrorType, ValidationException } from "@exceptions/validation.exception"
import { ExceptionStatus } from "@exceptions/base.exception"

export class ValidatePasswordMiddleware extends BaseMiddleware {
  constructor(
    private passwordHasherService: IPasswordHasherService,
    private findUserMiddleware: FindUserMiddleware,
  ) {
    super()
  }

  public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.auth?.user) {
      await this.findUserMiddleware.execute(req, res, () => {})
    }

    const password = await passwordSchema.validateAsync(req.body)
    const result = await this.passwordHasherService.comparePassword(password, req.auth!.user!.password)

    if (!result) {
      throw new ValidationException(
        [
          {
            key: "password",
            label: "password",
            type: ValidationErrorType.Incorrect,
            value: password,
          },
        ],
        ExceptionStatus.Forbidden,
      )
    }

    next()
  }

  public byRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    ;(req as any).tokenType = "refresh"
    await this.execute(req, res, next)
  }
}
