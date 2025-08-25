import { BaseException, ExceptionStatus } from "./base.exception"

export type ValidationErrorType =
  | "database.duplicate"
  | "any.unknown"
  | "database.not_found"
  | "database.incorrect"

const CUSTOM_MESSAGES: Record<ValidationErrorType, string> = {
  "database.duplicate": "The field '{#label}' is already in use by another user.",
  "any.unknown": "Unknown error.",
  "database.not_found": "The '{#label}' field was not found.",
  "database.incorrect": "The '{#label}' field is incorrect",
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

export class ValidationException extends BaseException {
  private readonly details: ValidationErrorDetail[] = []

  constructor(details?: ValidationErrorDetail[], status: ExceptionStatus = ExceptionStatus.BadRequest) {
    super(status, details)
    this.responseFormat = "ValidationError"
    details?.forEach(d => this.addDetail(d))
  }

  public addDetail(detail: ValidationErrorDetail): void {
    const messageTemplate = CUSTOM_MESSAGES[detail.type] || detail.message || ""
    const formattedMessage = formatMessage(messageTemplate, { ...detail, ...detail.context }).replace(
      /"/g,
      "'",
    )
    this.details.push({ ...detail, message: formattedMessage })
    ;(this as any).error = this.details
  }

  public getDetails(): ValidationErrorDetail[] {
    return this.details
  }
}
