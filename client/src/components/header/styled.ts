import styled from "styled-components"

export default {
  Header: styled.header`
    margin-bottom: 10px;
  `,

  Title: styled.h1`
    font-size: 2em;
    color: ${props => props.theme.text.primary};
  `,
}
