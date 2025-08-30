import { useState } from "react"
import { useTheme } from "@context/themeProvider"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { ApiValidationError } from "@api/error/validationError"
import { registerService } from "../services/registerService"
import { useAuth } from "@context/authProvider"

export function useRegister() {
  const [validationError, setApiValidationError] = useState<ApiValidationError | undefined>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { login } = useAuth()

  async function registerHandler(registerData: { username: string; email: string; password: string }) {
    setApiValidationError(undefined)
    toast.info(t("auth.register.loading", { defaultValue: "Creating account..." }), { theme: theme })

    try {
      const { user } = await registerService(registerData)

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

  return { registerHandler, validationError }
}
