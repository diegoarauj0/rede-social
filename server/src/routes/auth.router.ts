import { Router } from "express"
import { LoginController } from "@controllers/login.controller"
import { RegisterController } from "@controllers/register.controller"

const registerController = new RegisterController()
const loginController = new LoginController()

const authRouter = Router()

authRouter.post("/api/auth/register", registerController.execute)
authRouter.post("/api/auth/login", loginController.execute)

export { authRouter }
