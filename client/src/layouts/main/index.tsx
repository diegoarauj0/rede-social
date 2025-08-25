import { Outlet } from "react-router"
import Styled from "./styled"
import { HeaderComponent } from "@components/header"

export function MainLayout() {
  return (
    <Styled.Main>
      <HeaderComponent />
      <Outlet />
    </Styled.Main>
  )
}
