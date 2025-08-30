import { SessionRepository } from "@repositories/session.repository"
import { UserRepository } from "@repositories/user.repository"

export class RepositoryFactory {
  static createSessionRepository() {
    return new SessionRepository
  }

  static createUserRepository() {
    return new UserRepository()
  }
}
