import { MongoServerError } from "mongodb"
import { ValidationErrorDetail, ValidationException } from "./validation.exception"
import { ExceptionStatus } from "./base.exception"

export class MongoServerErrorException extends ValidationException {
  constructor(error: MongoServerError) {
    if (typeof error.code !== "number") {
      throw new Error("This is not a valid MongoServerError.")
    }

    const key = Object.keys(error.keyValue || {})[0] || "unknown"
    const value = error.keyValue?.[key]
    let status: ExceptionStatus = ExceptionStatus.BadRequest

    const detail: ValidationErrorDetail = {
      value: value,
      label: key,
      key: key,
      type: "custom.unknown",
    }

    if (error.code === 11000) {
      detail.type = "custom.duplicate"
      status = ExceptionStatus.Conflict
    }

    super([detail], status)
  }
}
