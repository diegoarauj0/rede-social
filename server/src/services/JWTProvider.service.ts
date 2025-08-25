import { IJWTProviderService } from "contracts/services/JWTProvider.service"
import JWT from "jsonwebtoken"
import ms from "ms"

export class JWTProviderService implements IJWTProviderService {
  public create(payload: any, secret: string, expiresIn: number | ms.StringValue): string {
    return JWT.sign(payload, secret, { expiresIn: expiresIn })
  }

  public decode(token: string): string {
    return JWT.decode(token) as string
  }

  public verify(token: string, secret: string): string {
    return JWT.verify(token, secret) as string
  }
}
