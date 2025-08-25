import type { ObjectSchema } from "joi"
import Joi from "./extends/index"
import { useJoiMessages } from "./useJoiMessages"
import { useTranslation } from "react-i18next"

export interface IRegisterSchema {
  username: string
  email: string
  password: string
}

export function useRegisterSchema(): ObjectSchema<{ username: string; email: string; password: string }> {
  const messages = useJoiMessages()
  const { t } = useTranslation()

  return Joi.object({
    username: Joi.string()
      .min(1)
      .max(16)
      .alphanum()
      .required()
      .messages(messages)
      .label(t("form.labels.username")),
    email: Joi.string().email().max(255).required().messages(messages).label(t("form.labels.email")),
    password: Joi.string()
      .min(8)
      .max(64)
      .minDigits(1)
      .minSpecialChars(1)
      .minLowercaseChars(1)
      .minUppercaseChars(1)
      .messages(messages)
      .label(t("form.labels.password")),
  })
}
