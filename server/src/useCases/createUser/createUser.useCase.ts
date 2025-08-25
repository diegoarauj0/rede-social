import { IUserRepository } from "contracts/repositories/user.repository"
import { ICreateUserDTO } from "./createUser.DTO"
import { UserEntity } from "entities/user.entity"
import { IPasswordHasherService } from "contracts/services/passwordHasher.service"

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasherService: IPasswordHasherService,
  ) {}

  public async execute(createUserDTO: ICreateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.createUser({
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
