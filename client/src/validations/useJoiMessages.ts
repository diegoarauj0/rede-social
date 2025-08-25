import { useTranslation } from "react-i18next"

export function useJoiMessages() {
  const { t } = useTranslation()

  return {
    "string.alphanum": t("form.validation.string.alphanum"),
    "string.base": t("form.validation.string.base"),
    "string.empty": t("form.validation.string.empty"),
    "string.email": t("form.validation.string.email"),
    "string.min": t("form.validation.string.min"),
    "string.max": t("form.validation.string.max"),
    "string.pattern.base": t("form.validation.pattern.base"),
    "number.base": t("form.validation.base"),
    "number.min": t("form.validation.number.min"),
    "number.max": t("form.validation.number.max"),
    "number.integer": t("form.validation.number.integer"),
    "boolean.base": t("form.validation.boolean.base"),
    "any.required": t("form.validation.any.required"),
    "any.only": t("form.validation.any.only"),
    "any.invalid": t("form.validation.any.invalid"),
    "array.base": t("form.validation.array.base"),
    "array.min": t("form.validation.array.min"),
    "array.max": t("form.validation.array.max"),
    "object.base": t("form.validation.object.base"),
    "object.unknown": t("form.validation.array.unknown"),
    "string.minDigits": t("form.validation.string.minDigits"),
    "string.minUppercaseChars": t("form.validation.string.minUppercaseChars"),
    "string.minLowercaseChars": t("form.validation.string.minLowercaseChars"),
    "string.minSpecialChars": t("form.validation.string.minSpecialChars"),
  }
}
