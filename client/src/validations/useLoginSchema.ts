import type { ObjectSchema } from "joi"
import Joi from "./extends/index"
import { useJoiMessages } from "./useJoiMessages"
import { useTranslation } from "react-i18next"

export interface ILoginSchema {
  email: string
  password: string
}

export function useLoginSchema(): ObjectSchema<{ email: string; password: string }> {
  const messages = useJoiMessages()
  const { t } = useTranslation()

  return Joi.object({
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
