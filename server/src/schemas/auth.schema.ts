import joi from "joi"
import { emailSchema, passwordSchema, usernameSchema } from "./common.schema"

export const loginSchema: joi.ObjectSchema<{ email: string; password: string }> = joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
})

export const registerSchema: joi.ObjectSchema<{ email: string; password: string; username: string }> =
  joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
    username: usernameSchema.required(),
  })
