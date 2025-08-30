import { BaseException, ExceptionStatus } from "./base.exception"

export enum ValidationErrorType {
  Duplicate = "database.duplicate",
  Unknown = "any.unknown",
  NotFound = "database.not_found",
  Incorrect = "database.incorrect",
}

const MESSAGE_MAP: Record<ValidationErrorType, string> = {
  [ValidationErrorType.Duplicate]: "The field '{#label}' is already in use by another user.",
  [ValidationErrorType.Unknown]: "Unknown error.",
  [ValidationErrorType.NotFound]: "The '{#label}' field was not found.",
  [ValidationErrorType.Incorrect]: "The '{#label}' field is incorrect",
}

export interface ValidationErrorDetail {
  message?: string
  label: string
  key: string
  value: unknown
  type: ValidationErrorType
  context?: Record<string, unknown>
}

function formatMessage(template: string, context: Record<string, any>): string {
  return template.replace(/\{#(\w+)\}/g, (_, key) => String(context[key] ?? `{#${key}}`))
}

export class ValidationException extends BaseException<{ ValidationError: ValidationErrorDetail[] }> {
  constructor(details?: ValidationErrorDetail[], status: ExceptionStatus = ExceptionStatus.BadRequest) {
    super(status, { ValidationError: [] })
    this.responseFormat = "ValidationError"
    details?.forEach(d => this.addDetail(d))
  }

  public addDetail(detail: ValidationErrorDetail): void {
    const messageTemplate = MESSAGE_MAP[detail.type] || detail.message || ""
    const formattedMessage = formatMessage(messageTemplate, { ...detail, ...detail.context }).replace(
      /"/g,
      "'",
    )

    this.details.ValidationError.push({ ...detail, message: formattedMessage })
  }
}
