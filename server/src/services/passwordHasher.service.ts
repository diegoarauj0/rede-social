import { IPasswordHasherService } from "contracts/services/passwordHasher.service"
import bcrypt from "bcryptjs"

export class PasswordHasherService implements IPasswordHasherService {
  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  public async hashPassword(password: string, rounds: number): Promise<string> {
    const salt = await bcrypt.genSalt(rounds)
    const hash = await bcrypt.hash(password, salt)

    return hash
  }
}
