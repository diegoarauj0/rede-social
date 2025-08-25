import Styled from "./styled"
import { FormProvider, useForm, type FieldValues, type Path } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import type { ObjectSchema } from "joi"
import { Link } from "react-router"
import {
  useEffect,
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
  type ReactNode,
} from "react"
import { useTranslation } from "react-i18next"

export interface IInputProps {
  autoComplete: HTMLInputAutoCompleteAttribute
  type: HTMLInputTypeAttribute
  id: string
  icon: {
    src: string
    alt: string
  }
}

interface IAuthFormComponentProps<T extends FieldValues> {
  onSubmit: (data: T) => void
  inputs: Record<Path<T>, IInputProps>
  errors?: Record<Path<T>, string | undefined>
  schema: ObjectSchema<T>
  children?: ReactNode
  submitText: string
  title: string
  link?: {
    to: string
    text: string
  }
}

export function AuthFormComponent<T extends FieldValues>(props: IAuthFormComponentProps<T>) {
  const { t } = useTranslation()
  const methods = useForm<T>({
    resolver: joiResolver(props.schema),
    mode: "onChange",
  })

  useEffect(() => {
    ;(Object.entries(props.errors || {}) as Array<[Path<T>, string]>).forEach(([name, message]) => {
      methods.setError(name, { message: message })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors])

  return (
    <>
      <Styled.Title>{props.title}</Styled.Title>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(props.onSubmit)} autoComplete="on">
          {(Object.entries(props.inputs) as Array<[Path<T>, IInputProps]>).map(([name, value]) => (
            <Styled.Container>
              <Styled.Label htmlFor={value.id}>{t(`form.labels.${name}`)}:</Styled.Label>
              <Styled.InputContainer>
                <Styled.Icon {...value.icon} />
                <Styled.Input
                  placeholder={t(`form.placeholders.${name}`)}
                  type={value.type}
                  id={value.id}
                  autoComplete={value.autoComplete}
                  {...methods.register(name)}
                />
              </Styled.InputContainer>
              {methods.formState.errors[name]?.message ? (
                <Styled.Error>{String(methods.formState.errors[name].message)}</Styled.Error>
              ) : null}
              <Styled.Line />
            </Styled.Container>
          ))}
          <Styled.Button type="submit" disabled={methods.formState.isSubmitting}>
            {props.submitText}
          </Styled.Button>
          {props.link && (
            <Styled.LinkContainer>
              <Link to={props.link.to}>{props.link.text}</Link>
            </Styled.LinkContainer>
          )}
        </form>
      </FormProvider>
    </>
  )
}
