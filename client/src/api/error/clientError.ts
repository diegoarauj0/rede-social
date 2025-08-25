export interface IErrorResponseFormat {
  Default: "Default"
  ValidationError: "ValidationError"
}

export interface IClientErrorProps {
  status: keyof IClientErrorStatus
  message: string
  responseFormat: keyof IErrorResponseFormat
  stack?: string
  error?: unknown
}

export interface IClientErrorStatus {
  BadRequest: "BadRequest"
  Unauthorized: "Unauthorized"
  NotFound: "NotFound"
  Conflict: "Conflict"
  InternalServerError: "InternalServerError"
}

export class ClientError extends Error {
  public readonly status: keyof IClientErrorStatus
  public readonly responseFormat: keyof IErrorResponseFormat
  public readonly serverStackError?: string
  public readonly error?: unknown

  constructor(props: IClientErrorProps) {
    super(props.message)
    this.name = new.target.name
    this.status = props.status
    this.serverStackError = props.stack
    this.responseFormat = props.responseFormat
    this.error = props.error
  }
}
