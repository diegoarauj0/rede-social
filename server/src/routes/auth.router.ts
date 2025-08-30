import { ControllerFactory } from "@factories/controller.factory"
import { Router } from "express"

const authRouter = Router()

const registerController = ControllerFactory.createRegisterController()
const loginController = ControllerFactory.createLoginController()

authRouter.post("/api/auth/register", registerController.execute)
authRouter.post("/api/auth/login", loginController.execute)

export { authRouter }
