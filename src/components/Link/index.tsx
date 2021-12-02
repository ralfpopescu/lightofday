import styled from "styled-components";
import { Link as UnstyledLink } from "react-router-dom";
import { darkColorString, lightColorString } from "../../util/theme";

export const Link = styled(UnstyledLink)<{ secondary?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: ${(props) => (props.secondary ? lightColorString : darkColorString)};
  text-decoration: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
