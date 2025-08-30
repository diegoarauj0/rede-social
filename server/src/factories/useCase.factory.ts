import { AuthenticateUseCase } from "@useCases/auth/authenticateUser.useCase"
import { RepositoryFactory } from "./repository.factory"
import { ServiceFactory } from "./service.factory"
import { CreateUserUseCase } from "@useCases/auth/createUser.useCase"
import { ValidateUserUseCase } from "@useCases/auth/validateUser.useCase"

export class UseCaseFactory {
  static createAuthenticateUserUseCase() {
    return new AuthenticateUseCase(
      RepositoryFactory.createSessionRepository(),
      ServiceFactory.createJWTProviderService(),
    )
  }

  static createCreateUserUseCase() {
    return new CreateUserUseCase(RepositoryFactory.createUserRepository(), ServiceFactory.createPasswordHasherService())
  }

  static createValidateUserUseCase() {
    return new ValidateUserUseCase(RepositoryFactory.createUserRepository(), ServiceFactory.createPasswordHasherService())
  }
}
