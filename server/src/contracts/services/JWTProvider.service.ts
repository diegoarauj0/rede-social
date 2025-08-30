import ms from "ms"

export interface IJWTProviderService {
  create(payload: any, secret: string, expiresIn: number | ms.StringValue): string

  decode(token: string): any

  verify(token: string, secret: string): any
}
