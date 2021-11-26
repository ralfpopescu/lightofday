import styled from "styled-components";
import { darkColorString, lightColorString } from "../../util/theme";

const UnstyledButton = styled.button<{ secondary?: boolean; disabled?: boolean }>`
  background-color: ${(props) => (props.secondary ? lightColorString : darkColorString)};
  color: ${(props) => (props.secondary ? darkColorString : lightColorString)};
  border: none;
  padding: 12px;
  font: inherit;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  outline: inherit;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  ${(props) => (props.disabled ? "opacity: 0.7;" : "")}

  &:hover {
    opacity: 0.7;
  }
`;

type ButtonProps = { children: any; onClick: () => void; secondary?: boolean; disabled?: boolean };

export const Button = ({ children, onClick, secondary, disabled }: ButtonProps) => {
  return (
    <UnstyledButton onClick={onClick} secondary={secondary} disabled={disabled}>
      {children}
    </UnstyledButton>
  );
};
