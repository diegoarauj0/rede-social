import { UserEntity } from "entities/user.entity"
import { IPasswordHasherService } from "contracts/services/passwordHasher.service"
import { ValidationErrorType, ValidationException } from "@exceptions/validation.exception"
import { ExceptionStatus } from "@exceptions/base.exception"
import { IValidateUserDTO, IValidateUserUseCase } from "@contracts/useCases/validateUser.useCase"
import { IUserRepository } from "@contracts/repositories/user.repository"

export class ValidateUserUseCase implements IValidateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasherService: IPasswordHasherService,
  ) {}

  public async validate(dto: IValidateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(dto.email)

    if (!user) {
      throw new ValidationException(
        [
          {
            key: "email",
            label: "email",
            type: ValidationErrorType.NotFound,
            value: dto.email,
          },
        ],
        ExceptionStatus.NotFound,
      )
    }

    if (!(await this.passwordHasherService.comparePassword(dto.password, user.password))) {
      throw new ValidationException(
        [
          {
            key: "password",
            label: "password",
            type: ValidationErrorType.Incorrect,
            value: dto.password,
          },
        ],
        ExceptionStatus.Unauthorized,
      )
    }

    return user
  }
}
