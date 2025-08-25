import ms from "ms"

export interface IJWTProviderService {
  create(payload: any, secret: string, expiresIn: number | ms.StringValue): string

  decode(token: string): string

  verify(token: string, secret: string): string
}
