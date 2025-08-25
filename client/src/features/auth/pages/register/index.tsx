import { useRegister } from "@features/auth/hooks/useRegister"
import { useTranslation } from "react-i18next"
import { useRegisterSchema, type IRegisterSchema } from "@validations/useRegisterSchema"
import { AuthFormComponent } from "@features/auth/components/authForm"

export function RegisterPage() {
  const { registerHandler, validationError } = useRegister()
  const { t } = useTranslation()
  const registerSchema = useRegisterSchema()

  document.title = t("auth.register.title", { defaultValue: "Auth - Register" })

  function onSubmit(registerData: { email: string; password: string; username: string }) {
    registerHandler(registerData)
  }

  return (
    <AuthFormComponent<IRegisterSchema>
      schema={registerSchema}
      onSubmit={onSubmit}
      title={t("auth.register.subTitle", { defaultValue: "Create your account" })}
      submitText={t("auth.register.submit", { defaultValue: "Sign up" })}
      link={{
        to: "/auth/login",
        text: t("auth.register.linkLogin", { defaultValue: "Already have an account?" }),
      }}
      errors={validationError?.toObjectMessage()}
      inputs={{
        username: {
          autoComplete: "username",
          id: "username",
          type: "text",
          icon: {
            src: "/icon/account_icon.svg",
            alt: "account_icon",
          },
        },
        email: {
          autoComplete: "email",
          id: "email",
          type: "email",
          icon: {
            src: "/icon/email_icon.svg",
            alt: "email_icon",
          },
        },
        password: {
          autoComplete: "password",
          id: "password",
          type: "password",
          icon: {
            src: "/icon/password_icon.svg",
            alt: "password_icon",
          },
        },
      }}
    />
  )
}
