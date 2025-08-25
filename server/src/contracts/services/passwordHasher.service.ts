export interface IPasswordHasherService {
  hashPassword(password: string, rounds: number): Promise<string>
  comparePassword(password: string, hash: string): Promise<boolean>
}
