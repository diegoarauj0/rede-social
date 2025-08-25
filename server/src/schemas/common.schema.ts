import Joi from "./extends/index"

export const emailSchema = Joi.string().email().max(255)
export const passwordSchema = Joi.string()
  .min(8)
  .max(64)
  .minDigits(1)
  .minSpecialChars(1)
  .minLowercaseChars(1)
  .minUppercaseChars(1)
export const usernameSchema = Joi.string().min(1).max(16).alphanum()
