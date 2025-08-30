import { useState } from "react"
import { useTheme } from "@context/themeProvider"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { ApiValidationError } from "@api/error/validationError"
import { loginService } from "../services/loginService"
import { useAuth } from "@context/authProvider"

export function useLogin() {
  const [validationError, setApiValidationError] = useState<ApiValidationError | undefined>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { login } = useAuth()

  async function loginHandler(loginData: { email: string; password: string }) {
    setApiValidationError(undefined)
    toast.info(t("auth.login.loading", { defaultValue: "Signing in..." }), { theme: theme })

    try {
      const { user } = await loginService(loginData)
      console.log(user)
      if (!login) {
        throw "login provider not found"
      }

      login({ privateId: user.privateId, publicId: user.publicId })
      toast.success(t("auth.login.success", { defaultValue: "Login successful" }), { theme: theme })
      navigate("/")
    } catch (err: unknown) {
      if (err instanceof ApiValidationError) {
        return setApiValidationError(err)
      }

      toast.error(
        t("auth.register.error", { defaultValue: "Could not create your account, please try again later" }),
        { theme: theme },
      )
      console.error(err)
    }
  }

  return { loginHandler, validationError }
}
