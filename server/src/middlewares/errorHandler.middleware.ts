import { ErrorRequestHandler, Request, Response, NextFunction, response } from "express"
import { BaseException, ExceptionStatus } from "@exceptions/base.exception"
import { ValidationError } from "joi"
import { ValidationException } from "@exceptions/validation.exception"

const isDev = process.env.NODE_ENV === "development"

function formatErrorResponse(error: BaseException) {
  return {
    success: false,
    responseFormat: error.responseFormat || "Default",
    status: error.status || "InternalServerError",
    message: error.message || "An internal server error occurred.",
    error: error.error,
    stack: isDev ? error.stack : undefined,
  }
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof BaseException) {
    return res.status(error.statusCode).json(formatErrorResponse(error))
  }

  if (error instanceof ValidationError) {
    const details = error.details.map(detail => ({
      message: detail.message,
      label: detail.context?.label || "unknown",
      key: detail.context?.key || "unknown",
      value: detail.context?.value,
      type: detail.type as any,
      context: filterContext(detail.context),
    }))

    const validationException = new ValidationException(details)

    return res.status(validationException.statusCode).json(formatErrorResponse(validationException))
  }

  console.error(error)

  const internalServerError = new BaseException(ExceptionStatus.InternalServerError)
  internalServerError.stack = error.stack

  return res.status(500).json(formatErrorResponse(internalServerError))
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    status: "NotFound",
    message: `Route ${req.originalUrl} not found.`,
  })
}

function filterContext(context: any): any {
  const { label, key, value, ...filtered } = context || {}
  return filtered
}
