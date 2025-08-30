import axios from "axios"
import { ApiClientError } from "./error/clientError"
import { ApiValidationError } from "./error/validationError"
import type { IApiResponse } from "./type"

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.success === false) {
      const errorResponse = error.response.data as IApiResponse<false>

      if (errorResponse.responseFormat === "ValidationError") {
        return Promise.reject(new ApiValidationError(errorResponse as any))
      }

      return Promise.reject(new ApiClientError(errorResponse))
    }

    return Promise.reject(error)
  },
)
