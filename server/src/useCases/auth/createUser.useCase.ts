import { IUserRepository } from "contracts/repositories/user.repository"
import { UserEntity } from "entities/user.entity"
import { IPasswordHasherService } from "contracts/services/passwordHasher.service"
import { ValidationErrorType, ValidationException } from "@exceptions/validation.exception"
import { ExceptionStatus } from "@exceptions/base.exception"
import { ICreateUserDTO, ICreateUserUseCase } from "@contracts/useCases/createUser.useCase"

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasherService: IPasswordHasherService,
  ) {}

  private async ensureUserIsUnique(values: { username: string; email: string }): Promise<void> {
    if (await this.userRepository.findByUsername(values.username)) {
      throw new ValidationException(
        [{ key: "username", label: "username", type: ValidationErrorType.Duplicate, value: values.username }],
        ExceptionStatus.Conflict,
      )
    }

    if (await this.userRepository.findByEmail(values.email)) {
      throw new ValidationException(
        [{ key: "email", label: "email", type: ValidationErrorType.Duplicate, value: values.email }],
        ExceptionStatus.Conflict,
      )
    }
  }

  public async create(dto: ICreateUserDTO): Promise<UserEntity> {
    await this.ensureUserIsUnique(dto)

    const user = this.userRepository.create({
      email: dto.email,
      username: dto.username,
      nickname: dto.username,
      password: await this.passwordHasherService.hashPassword(
        dto.password,
        Number(process.env.BCRYPT_SALT_ROUNDS || 10),
      ),
    })

    return await this.userRepository.save(user)
  }
}
