import { useState, useEffect, type ReactNode, useContext, createContext } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { lightTheme, darkTheme, type ITheme } from "../themes"

const ThemeContext = createContext<{ theme: "dark" | "light" }>({
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
})

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext<{ theme: "dark" | "light" }>(ThemeContext)
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    if (stored) setMode(stored)
  }, [])

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("theme", newMode)
  }

  const theme: ITheme = mode === "light" ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme: mode }}>
      <StyledThemeProvider theme={{ ...theme, toggleTheme } as any}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}