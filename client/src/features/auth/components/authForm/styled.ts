import styled from "styled-components"

export default {
  Icon: styled.img`
    width: 30px;
    filter: invert(${props => props.theme.image.invert}%) ;
  `,
  Container: styled.div`
    width: 100%;
  `,
  InputContainer: styled.div`
    background-color: ${props => props.theme.background.secondary};
    border-radius: 10px;
    padding: 5px;
    display: flex;
    margin-bottom: 5px;
  `,
  Label: styled.label`
    padding: 5px 5px;
    font-weight: 600;
    font-size: 1.1em;
    color: ${props => props.theme.text.primary};
    display: block;
    width: 100%;
  `,
  Input: styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    padding: 15px 5px;
    font-weight: 600;
    font-size: 0.9em;
    background-color: transparent;
    color: ${props => props.theme.text.primary};
    border: none;
  `,
  Error: styled.p`
    padding: 5px;
    color: ${props => props.theme.status.error.text};
    background-color: ${props => props.theme.status.error.background};
    border-radius: 6px;
    font-weight: 600;
    display: block;
    width: 100%;
  `,
  Line: styled.hr`
    border: 1px solid ${props => props.theme.background.secondary};
    color: ${props => props.theme.text.primary};
    display: block;
    width: 100%;
    margin: 10px 0px;
  `,
  Title: styled.h2`
    font-size: 1.3em;
    font-weight: 700;
    color: ${props => props.theme.text.primary};
    margin-bottom: 10px;
  `,
  Button: styled.button`
    transition: 0.4s;
    background-color: ${props => props.theme.background.secondary};
    color: ${props => props.theme.text.primary};
    width: 100%;
    height: 50px;
    margin: 10px 0px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9em;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
    border: none;

    &:hover {
      transition: 0.2s;
      transform: scale(1.03);
    }
  `,
  LinkContainer: styled.div`
    transition: 0.4s;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: ${props => props.theme.background.secondary};

    &:hover {
      transition: 0.2s;
      transform: scale(1.03);
    }

    a {
      width: 100%;
      height: 100%;
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9em;
      color: ${props => props.theme.text.primary};
    }
  `,
}
