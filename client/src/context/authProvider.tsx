import { createContext, useContext, useState, type ReactNode } from "react"

interface IUser {
  publicId: number
  privateId: string
}

interface IAuth {
  auth: boolean
  user?: IUser
  login?: (user: IUser) => void
  logout?: () => void
}

const AuthContext = createContext<IAuth>({ auth: false })

interface IAuthProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext<IAuth>(AuthContext)
  return context
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const storedUser = localStorage.getItem("user")

  const [state, setState] = useState<IAuth>({
    auth: storedUser ? true : false,
    user: storedUser ? (JSON.parse(storedUser) as IUser) : undefined,
  })

  const login = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user))
    setState({ auth: true, user })
  }

  const logout = () => {
    localStorage.removeItem("user")
    setState({ auth: false, user: undefined })
  }

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
}
