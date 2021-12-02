import styled from "styled-components";
import { darkColorString, lightColorString } from "../../util/theme";

const UnstyledButton = styled.button<{ secondary?: boolean; disabled?: boolean; naked?: boolean }>`
  background-color: ${(props) =>
    props.naked ? "transparent" : props.secondary ? lightColorString : darkColorString};
  color: ${(props) => (props.secondary || props.naked ? darkColorString : lightColorString)};
  border: ${(props) =>
    props.naked ? `4px solid ${props.secondary ? lightColorString : darkColorString}` : "none"};
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

type ButtonProps = {
  children: any;
  onClick: () => void;
  secondary?: boolean;
  disabled?: boolean;
  style?: object;
  naked?: boolean;
};

export const Button = ({ children, onClick, secondary, disabled, naked, style }: ButtonProps) => {
  return (
    <UnstyledButton
      onClick={onClick}
      secondary={secondary}
      disabled={disabled}
      style={style}
      naked={naked}
    >
      {children}
    </UnstyledButton>
  );
};
