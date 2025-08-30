import type { IApiDetails, IApiErrorResponseFormat, IApiErrorStatus } from "@api/type"

export interface IApiClientError {
  responseFormat: keyof IApiErrorResponseFormat
  status: keyof IApiErrorStatus
  details?: IApiDetails
  message: string
  stack?: string
}

export class ApiClientError extends Error {
  public clientError: IApiClientError

  constructor(clientError: IApiClientError, message?: string) {
    super(message || clientError.message)

    this.clientError = clientError
    this.name = new.target.name
  }
}
