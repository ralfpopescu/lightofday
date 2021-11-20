import styled from "styled-components";
import { darkColorString, lightColorString } from "../../util/theme";

const UnstyledButton = styled.button`
  background-color: ${darkColorString};
  color: ${lightColorString};
  border: none;
  padding: 12px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

type ButtonProps = { children: any; onClick: () => void };

export const Button = ({ children, onClick }: ButtonProps) => {
  return <UnstyledButton onClick={onClick}>{children}</UnstyledButton>;
};
