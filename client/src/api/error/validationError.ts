import { ClientError, type IClientErrorProps } from "./clientError"
import i18n from "../../i18n"

export interface IValidationErrorDetail {
  key: string
  label: string
  type: string
  value: unknown
  message: string
  context: Record<string, unknown>
}

export interface IValidationErrorProps extends IClientErrorProps {
  error?: IValidationErrorDetail[]
}

export class ValidationError extends ClientError {
  private readonly details: IValidationErrorDetail[]

  constructor(validationErrorProps: IValidationErrorProps) {
    super(validationErrorProps)

    this.name = new.target.name

    this.details =
      validationErrorProps.error?.map(detail => {
        return this.replacePlaceholders(this.translate(detail))
      }) || []
  }

  private translate(detail: IValidationErrorDetail): IValidationErrorDetail {
    return {
      ...detail,
      message: i18n.t(`form.validation.${detail.type}`, { defaultValue: detail.message }),
      label: i18n.t(`form.labels.${detail.label}`, { defaultValue: detail.label }),
    }
  }

  private replacePlaceholders(detail: IValidationErrorDetail): IValidationErrorDetail {
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

  public getDetails(): IValidationErrorDetail[] {
    return [...this.details]
  }
}
