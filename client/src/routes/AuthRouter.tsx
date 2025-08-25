import { useAuth } from "@context/authProvider"
import type { ReactNode } from "react"
import { Navigate } from "react-router"

interface IAuthRouterProps {
  children: ReactNode
}

export function AuthRouter(props: IAuthRouterProps) {
  const { auth } = useAuth()

  if (auth) {
    return <Navigate to={"/home"} />
  }

  return props.children
}
