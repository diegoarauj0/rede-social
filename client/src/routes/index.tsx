import { createBrowserRouter } from "react-router"
import { AuthLayout } from "../layouts/auth"
import { RegisterPage } from "../features/auth/pages/register"
import { LoginPage } from "../features/auth/pages/login"
import { HomePage } from "@features/home/pages/home"
import { MainLayout } from "@layouts/main"
import { PrivateRouter } from "./PrivateRouter"
import { AuthRouter } from "./AuthRouter"
import { LoadingWrapper } from "@components/loadingWrapper"

export const router = createBrowserRouter([
  {
    path: "auth",

    element: (
      <LoadingWrapper>
        <AuthRouter>
          <AuthLayout />
        </AuthRouter>
      </LoadingWrapper>
    ),
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "",
    element: (
      <PrivateRouter>
        <MainLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
])
