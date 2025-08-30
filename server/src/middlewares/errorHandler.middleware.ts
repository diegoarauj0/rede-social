import { ErrorRequestHandler, Request, Response, NextFunction } from "express"
import { BaseException, ExceptionStatus } from "@exceptions/base.exception"
import { ValidationError } from "joi"
import { ValidationException } from "@exceptions/validation.exception"

export class ErrorHandlerMiddleware {
  private isDev: string = process.env.NODE_ENV || "development"

  public execute = async (error: any, req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (error instanceof BaseException) {
      return res.status(error.statusCode).json(this.formatErrorResponse(error))
    }

    if (error instanceof ValidationError) {
      const details = error.details.map(detail => ({
        message: detail.message,
        label: detail.context?.label || "unknown",
        key: detail.context?.key || "unknown",
        value: detail.context?.value,
        type: detail.type as any,
        context: this.filterContext(detail.context),
      }))

      const validationException = new ValidationException(details)

      return res.status(validationException.statusCode).json(this.formatErrorResponse(validationException))
    }

    console.error(error)

    const internalServerError = new BaseException(ExceptionStatus.InternalServerError, undefined)
    internalServerError.stack = error.stack

    return res.status(500).json(this.formatErrorResponse(internalServerError))
  }

  private formatErrorResponse(error: BaseException) {
    return {
      success: false,
      responseFormat: error.responseFormat || "Default",
      status: error.status || "InternalServerError",
      message: error.message || "An internal server error occurred.",
      details: error.details,
      stack: this.isDev ? error.stack : undefined,
    }
  }

  private filterContext(context: any): any {
    const { label, key, value, ...filtered } = context || {}
    return filtered
  }

  public notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
      success: false,
      status: "NotFound",
      message: `Route ${req.originalUrl} not found.`,
    })
  }
}
