import "express"
import { IAuth } from "@middlewares/auth.middleware"

declare module "express" {
  interface Request {
    auth?: IAuth
  }
}
