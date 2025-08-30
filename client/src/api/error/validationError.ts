import type { IApiValidationError } from "@api/type"
import i18n from "../../i18n"
import { ApiClientError, type IApiClientError } from "./clientError"

export interface IValidationError extends Omit<IApiClientError, "details" | "responseFormat"> {
  details: { ValidationError: IApiValidationError[] }
}

export class ApiValidationError extends ApiClientError {
  private readonly details: IApiValidationError[]

  constructor(validationError: IValidationError) {
    super({ ...validationError, responseFormat: "ValidationError" })

    this.name = new.target.name

    this.details =
      validationError.details.ValidationError?.map(detail => {
        return this.replacePlaceholders(this.translate(detail))
      }) || []
  }

  private translate(detail: IApiValidationError): IApiValidationError {
    return {
      ...detail,
      message: i18n.t(`form.validation.${detail.type}`, { defaultValue: detail.message }),
      label: i18n.t(`form.labels.${detail.label}`, { defaultValue: detail.label }),
    }
  }

  private replacePlaceholders(detail: IApiValidationError): IApiValidationError {
    let message = detail.message

    for (const [key, value] of Object.entries({ ...detail, ...detail.context })) {
      const regex = new RegExp(`{{#${key}}}`, "g")
      message = message.replace(regex, String(value))
    }

    return {
      ...detail,
      message: message,
    }
  }

  public toObjectMessage<Key extends string>(): Record<Key, string> {
    const details: any = {}

    this.details.forEach(detail => {
      details[detail.key as Key] = detail.message
    })

    return details as Record<Key, string>
  }

  public getDetails(): IApiValidationError[] {
    return [...this.details]
  }
}
