import { BaseException, ExceptionStatus } from "./base.exception"

export enum AuthorizationReason {
  Missing = "unauthorized.missing",
  Invalid = "unauthorized.invalid",
  Expired = "unauthorized.expired",
  NotFound = "forbidden.user_not_found",
}

const MESSAGE_MAP: Record<AuthorizationReason, string> = {
  [AuthorizationReason.NotFound]: "The user associated with this token does not exist",
  [AuthorizationReason.Missing]: "Authentication token is required",
  [AuthorizationReason.Invalid]: "The provided token is not valid",
  [AuthorizationReason.Expired]: "The authentication token has expired, please login again",
}

const STATUS_MAP: Record<AuthorizationReason, ExceptionStatus> = {
  [AuthorizationReason.NotFound]: ExceptionStatus.Forbidden,
  [AuthorizationReason.Missing]: ExceptionStatus.Unauthorized,
  [AuthorizationReason.Invalid]: ExceptionStatus.Unauthorized,
  [AuthorizationReason.Expired]: ExceptionStatus.Unauthorized,
}

interface IAuthorizationErrorDetail {
  reason: AuthorizationReason
  field: string
  value?: string
  message: string
}

export class AuthorizationException extends BaseException<{ AuthorizationError: IAuthorizationErrorDetail }> {
  constructor(details: Omit<IAuthorizationErrorDetail, "message">, status?: ExceptionStatus) {
    super(status || STATUS_MAP[details.reason], {
      AuthorizationError: {
        reason: details.reason,
        message: MESSAGE_MAP[details.reason],
        field: details.field,
        value: details.value,
      },
    })

    this.responseFormat = "AuthorizationError"
  }
}
