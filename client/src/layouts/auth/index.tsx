import { Outlet, useNavigation } from "react-router"
import Styled from "./styled"
import { HeaderComponent } from "@components/header"

export function AuthLayout() {
  const navigation = useNavigation()

  if (navigation.state === "loading") {
    return <div>Carregando</div>
  }

  return (
    <Styled.Main>
      <Styled.Section>
        <HeaderComponent />
        <Styled.FormContainer>
          <Outlet />
        </Styled.FormContainer>
      </Styled.Section>
    </Styled.Main>
  )
}
