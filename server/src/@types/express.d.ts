import "express"

declare global {
  namespace Express {
    export interface Request {
      auth?: {
        session: import("../contracts/services/auth.service").ISession
        userid: string
        type: keyof import("@interfaces/services/auth.interface").ITokens
        user?: import("@interfaces/models/users.interface").IUserDocument
      }
    }

    export interface Response {
      success: (json: any) => this
    }
  }
}
