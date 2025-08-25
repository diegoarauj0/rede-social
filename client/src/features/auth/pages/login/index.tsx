import { useTranslation } from "react-i18next"
import { useLogin } from "@features/auth/hooks/useLogin"
import { AuthFormComponent } from "@features/auth/components/authForm"
import { useLoginSchema, type ILoginSchema } from "@validations/useLoginSchema"

export function LoginPage() {
  const { loginHandler, validationError } = useLogin()
  const loginSchema = useLoginSchema()
  const { t } = useTranslation()

  document.title = t("auth.login.title", { defaultValue: "Auth - Login" })

  return (
    <AuthFormComponent<ILoginSchema>
      schema={loginSchema}
      onSubmit={loginHandler}
      title={t("auth.login.subTitle", { defaultValue: "Access your account" })}
      submitText={t("auth.login.submit", { defaultValue: "Sing in" })}
      link={{
        to: "/auth/register",
        text: t("auth.login.linkRegister", { defaultValue: "Don’t have an account yet?" }),
      }}
      errors={validationError?.toObjectMessage()}
      inputs={{
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
