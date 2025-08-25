import Styled from "./styled"
import { useLayoutEffect, useState, type ReactNode } from "react"

interface ILoadingWrapperProps {
  children: ReactNode
}

export function LoadingWrapper({ children }: ILoadingWrapperProps) {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {setLoading(false)}, 1000)
    })
  }, [])

  if (loading) {
    return (
      <Styled.Main>
        <Styled.Icon src="/logo/logo-transparent.png"/>
      </Styled.Main>
    )
  }

  return <>{children}</>
}
