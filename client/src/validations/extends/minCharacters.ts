import { type Extension, type Root } from "joi"

export interface IMinCharacters {
  minDigits(min: number): this
  minUppercaseChars(min: number): this
  minLowercaseChars(min: number): this
  minSpecialChars(min: number): this
}

function createRule(name: string, regex: RegExp, messageKey: string) {
  return {
    method(this: any, min: number) {
      return this.$_addRule({ name, args: { min } })
    },
    args: [
      {
        name: "min",
        assert: (value: any) => typeof value === "number" && value >= 0,
        message: "must be a non-negative number",
      },
    ],
    validate(value: string, helpers: any, args: { min: number }) {
      const count = (value.match(regex) || []).length
      if (count < args.min) {
        return helpers.error(messageKey, { min: args.min })
      }
      return value
    },
  }
}

export function minCharacters(joi: Root): Extension {
  return {
    type: "string",
    base: joi.string(),
    messages: {
      "string.minDigits": "The {#label} must contain at least {#min} digit(s).",
      "string.minUppercaseChars": "The {#label} must contain at least {#min} uppercase character(s).",
      "string.minLowercaseChars": "The {#label} must contain at least {#min} lowercase character(s).",
      "string.minSpecialChars": "The {#label} must contain at least {#min} special character(s).",
    },
    rules: {
      minDigits: createRule("minDigits", /\d/g, "string.minDigits"),
      minUppercaseChars: createRule("minUppercaseChars", /[A-Z]/g, "string.minUppercaseChars"),
      minLowercaseChars: createRule("minLowercaseChars", /[a-z]/g, "string.minLowercaseChars"),
      minSpecialChars: createRule("minSpecialChars", /[^a-zA-Z0-9]/g, "string.minSpecialChars"),
    },
  }
}
