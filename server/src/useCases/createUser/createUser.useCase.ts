import { IUserRepository } from "contracts/repositories/user.repository"
import { ICreateUserDTO } from "./createUser.DTO"
import { UserEntity } from "entities/user.entity"
import { IPasswordHasherService } from "contracts/services/passwordHasher.service"
import { ValidationException } from "@exceptions/validation.exception"
import { ExceptionStatus } from "@exceptions/base.exception"

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasherService: IPasswordHasherService,
  ) {}

  private async ensureUserIsUnique(values: { username: string; email: string }): Promise<void> {
    if (await this.userRepository.findByUsername(values.username)) {
      throw new ValidationException(
        [{ key: "username", label: "username", type: "database.duplicate", value: values.username }],
        ExceptionStatus.Conflict,
      )
    }
    
    if (await this.userRepository.findByEmail(values.email)) {
      throw new ValidationException(
        [{ key: "email", label: "email", type: "database.duplicate", value: values.email }],
        ExceptionStatus.Conflict,
      )
    }
  }

  public async execute(createUserDTO: ICreateUserDTO): Promise<UserEntity> {
    await this.ensureUserIsUnique(createUserDTO)

    const user = this.userRepository.create({
      email: createUserDTO.email,
      username: createUserDTO.username,
      nickname: createUserDTO.username,
      password: await this.passwordHasherService.hashPassword(
        createUserDTO.password,
        Number(process.env.BCRYPT_SALT_ROUNDS || 10),
      ),
    })

    return await this.userRepository.save(user)
  }
}
