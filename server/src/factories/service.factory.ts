import { JWTProviderService } from "@services/JWTProvider.service"
import { PasswordHasherService } from "@services/passwordHasher.service"

export class ServiceFactory {
  static createJWTProviderService() {
    return new JWTProviderService()
  }

  static createPasswordHasherService() {
    return new PasswordHasherService()
  }
}
