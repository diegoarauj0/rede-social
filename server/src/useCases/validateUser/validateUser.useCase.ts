import { UserEntity } from "entities/user.entity"
import { IValidateUserDTO } from "./validateUser.DTO"
import { IUserRepository } from "contracts/repositories/user.repository"
import { IPasswordHasherService } from "contracts/services/passwordHasher.service"
import { ValidationException } from "@exceptions/validation.exception"
import { ExceptionStatus } from "@exceptions/base.exception"

export class ValidateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasherService: IPasswordHasherService,
  ) {}

  public async execute(validateUserDTO: IValidateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findUserByEmail(validateUserDTO.email)

    if (!user) {
      throw new ValidationException(
        [
          {
            key: "email",
            label: "email",
            type: "database.not_found",
            value: validateUserDTO.email,
          },
        ],
        ExceptionStatus.NotFound,
      )
    }

    if (!(await this.passwordHasherService.comparePassword(validateUserDTO.password, user.password))) {
      throw new ValidationException(
        [
          {
            key: "password",
            label: "password",
            type: "database.incorrect",
            value: validateUserDTO.password,
          },
        ],
        ExceptionStatus.Unauthorized,
      )
    }

    return user
  }
}
