export enum ExceptionStatus {
  BadRequest = "BadRequest",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  NotFound = "NotFound",
  Conflict = "Conflict",
  InternalServerError = "InternalServerError",
}

const STATUS_CODE_MAP: Record<ExceptionStatus, number> = {
  [ExceptionStatus.BadRequest]: 400,
  [ExceptionStatus.Unauthorized]: 401,
  [ExceptionStatus.Forbidden]: 403,
  [ExceptionStatus.NotFound]: 404,
  [ExceptionStatus.Conflict]: 409,
  [ExceptionStatus.InternalServerError]: 500,
}

const MESSAGE_MAP: Record<ExceptionStatus, string> = {
  [ExceptionStatus.BadRequest]: "The request could not be understood or was missing required parameters.",
  [ExceptionStatus.Unauthorized]: "Authentication failed. Please check your credentials.",
  [ExceptionStatus.Forbidden]: "Unauthorized request",
  [ExceptionStatus.NotFound]: "The requested resource could not be found.",
  [ExceptionStatus.Conflict]: "A conflict occurred with the current state of the resource.",
  [ExceptionStatus.InternalServerError]: "An unexpected error occurred on the server.",
}

export class BaseException<Details = unknown> extends Error {
  public readonly status: ExceptionStatus
  public readonly statusCode: number
  public responseFormat?: string
  public details: Details

  constructor(status: ExceptionStatus, details: Details, customMessage?: string) {
    super(customMessage || MESSAGE_MAP[status])
    this.status = status
    this.statusCode = STATUS_CODE_MAP[status]
    this.details = details
    this.name = this.constructor.name
    this.responseFormat = "Default"

    Error.captureStackTrace(this, this.constructor)
  }
}
