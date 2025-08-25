import styled from "styled-components"

export default {
  Main: styled.main`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.background.primary};
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Section: styled.section`
    width: 600px;
    padding: 10px;
  `,

  FormContainer: styled.div`
    width: 100%;
  `,
}
