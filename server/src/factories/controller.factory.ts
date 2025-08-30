import { LoginController } from "@controllers/auth/login.controller"
import { RegisterController } from "@controllers/auth/register.controller"
import { UseCaseFactory } from "./useCase.factory"

export class ControllerFactory {
  static createLoginController() {
    return new LoginController(UseCaseFactory.createValidateUserUseCase(), UseCaseFactory.createAuthenticateUserUseCase())
  }

  static createRegisterController() {
    return new RegisterController(UseCaseFactory.createCreateUserUseCase(), UseCaseFactory.createAuthenticateUserUseCase())
  }
}
