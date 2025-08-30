import { AuthMiddleware } from "@middlewares/auth.middleware"
import { ErrorHandlerMiddleware } from "@middlewares/errorHandler.middleware"
import { FindUserMiddleware } from "@middlewares/findUser.middleware"
import { ValidatePasswordMiddleware } from "@middlewares/validatePassword.middleware"
import { ServiceFactory } from "./service.factory"
import { RepositoryFactory } from "./repository.factory"

export class MiddlewareFactory {
  static createErrorHandlerMiddleware() {
    return new ErrorHandlerMiddleware()
  }

  static createAuthMiddleware() {
    return new AuthMiddleware(
      ServiceFactory.createJWTProviderService(),
      RepositoryFactory.createSessionRepository(),
    )
  }

  static createFindUserMiddleware() {
    return new FindUserMiddleware(
      RepositoryFactory.createUserRepository(),
      MiddlewareFactory.createAuthMiddleware(),
    )
  }

  static createValidatePasswordMiddleware() {
    return new ValidatePasswordMiddleware(
      ServiceFactory.createPasswordHasherService(),
      MiddlewareFactory.createFindUserMiddleware(),
    )
  }
}
