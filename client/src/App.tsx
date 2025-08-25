import { ThemeProvider } from "@context/themeProvider"
import { RouterProvider } from "react-router"
import { ToastContainer } from "react-toastify"
import { router } from "./routes"
import "./i18n"
import { AuthProvider } from "@context/authProvider"

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  )
}
