import axios from "axios"
import { ValidationError, type IValidationErrorProps } from "./error/validationError"
import { ClientError, type IClientErrorStatus, type IErrorResponseFormat } from "./error/clientError"

export interface ISuccessStatus {
  Ok: "Ok"
  Created: "Created"
}

export interface IUserData {
  privateId: string
  publicId: number
  createdAt: Date
  updatedAt: Date
  username: string
  nickname: string
}

export interface ISuccessResponseFormat {
  User: "User"
}

export interface IErrorResponse<Error = unknown> {
  success: false
  responseFormat: keyof IErrorResponseFormat
  status: keyof IClientErrorStatus
  message: string
  error?: Error
  stack?: string
}

export interface ISuccessResponse {
  success: true
  responseFormat: keyof ISuccessResponse
  status: keyof ISuccessResponse
  message: string
  data: { user?: IUserData }
}

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.success === false) {
      const errorResponse = error.response.data as IErrorResponse

      if (errorResponse.responseFormat === "ValidationError") {
        return Promise.reject(new ValidationError(errorResponse as IValidationErrorProps))
      }

      return Promise.reject(new ClientError(errorResponse))
    }

    return Promise.reject(error)
  },
)