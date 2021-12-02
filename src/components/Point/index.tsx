import styled from "styled-components";
import { darkColorString, lightColorString } from "../../util/theme";

export const Point = styled.div<{ active: boolean; size?: number }>`
  border-radius: 50%;
  background-color: ${(props) => (props.active ? lightColorString : darkColorString)};
  width: ${(props) => props.size || 20}px;
  height: ${(props) => props.size || 20}px;
`;
