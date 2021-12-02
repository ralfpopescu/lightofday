import styled from "styled-components";
import { lightColorString, darkColorString } from "../../util/theme";

const OptionHeight = 20;
const Margin = 4;
const Limit = 5;
const Height = Limit * OptionHeight + Limit * Margin;

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  max-height: ${Height}px;
  overflow: auto;
`;

const Option = styled.div<{ active?: boolean }>`
  cursor: pointer;
  min-height: ${OptionHeight}px;
  max-height: ${OptionHeight}px;
  background-color: ${(props) => (props.active ? lightColorString : darkColorString)};
  color: ${(props) => (props.active ? darkColorString : lightColorString)};
  border-bottom: ${Margin}px solid white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;

  &:hover {
    background-color: ${lightColorString};
    color: ${darkColorString};
    opacity: 0.7;
  }
`;

const EmptyOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${OptionHeight}px;
  max-height: ${OptionHeight}px;
  background-color: ${darkColorString};
  opacity: 0.1;
  border-bottom: ${Margin}px solid white;
`;

type OptionType = { value: string; label: string };

type SelectProps = {
  activeValue?: string;
  options: OptionType[];
  onClick: (value: string, label: string) => void;
};

export const Select = ({ options, onClick, activeValue }: SelectProps) => {
  return (
    <Container>
      {options.map((option) => (
        <Option
          active={option.value === activeValue}
          onClick={() => onClick(option.value, option.label)}
        >
          {option.label}
        </Option>
      ))}
      {options.length < 5 && <>{new Array(9 - options.length).fill(<EmptyOption />)}</>}
    </Container>
  );
};
