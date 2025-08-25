import { useAuth } from "@context/authProvider"
import type { ReactNode } from "react"
import { Navigate } from "react-router"

interface IPrivateRouterProps {
  children: ReactNode
}

export function PrivateRouter(props: IPrivateRouterProps) {
  const { auth } = useAuth()
  console.log(auth)
  if (!auth) {
    return <Navigate to={"/auth/login"} />
  }

  return props.children
}
