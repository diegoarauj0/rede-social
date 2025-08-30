export interface IApiSuccessStatus {
  Ok: "Ok"
  Created: "Created"
}

export interface IApiErrorStatus {
  BadRequest: "BadRequest"
  Unauthorized: "Unauthorized"
  Forbidden: "Forbidden"
  NotFound: "NotFound"
  Conflict: "Conflict"
  InternalServerError: "InternalServerError"
}

export interface IApiSuccessResponseFormat {
  User: "User"
}

export interface IApiErrorResponseFormat {
  Default: "Default"
  ValidationError: "ValidationError"
  AuthorizationError: "AuthorizationError"
}

export interface IApiUserData {
  privateId: string
  publicId: number
  createdAt: Date
  updatedAt: Date
  username: string
  nickname: string
}

export interface IApiValidationError {
  key: string
  label: string
  type: string
  value: unknown
  message: string
  context: Record<string, unknown>
}

export interface IApiAuthorizationError {
  reason: string
  field: string
  value?: string
}

export interface IApiSuccess {
  User?: IApiUserData
}

export interface IApiDetails {
  ValidationError?: IApiValidationError[]
  AuthorizationError?: IApiAuthorizationError
}

export interface IApiResponse<Success extends boolean> {
  success: Success
  responseFormat: Success extends true ? keyof IApiSuccessResponseFormat : keyof IApiErrorResponseFormat
  status: Success extends true ? keyof IApiSuccessStatus : keyof IApiErrorStatus
  message: string
  data?: Success extends true ? IApiSuccess : undefined
  details?: Success extends true ? undefined : IApiDetails
}
