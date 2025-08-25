import { useTranslation } from "react-i18next"
import Styled from "./styled"

export function HeaderComponent() {
  const { t } = useTranslation()

  return (
    <Styled.Header>
      <Styled.Title>{t("app.name")}</Styled.Title>
    </Styled.Header>
  )
}
