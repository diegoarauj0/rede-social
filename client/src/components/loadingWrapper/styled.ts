import styled from "styled-components"

export default {
  Main: styled.main`
    background-color: ${props => props.theme.background.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `,
  Icon: styled.img`
    width: 160px;
  `

}