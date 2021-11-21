import styled from "styled-components";
import { lightColorString, darkColorString } from "../../util/theme";

const OptionHeight = 20;
const Margin = 4;
const Limit = 5;
const Height = Limit * OptionHeight + Limit * Margin;

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  max-height: ${Height}px;
  overflow: auto;
`;

const Option = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${OptionHeight}px;
  max-height: ${OptionHeight}px;
  background-color: ${darkColorString};
  color: ${lightColorString};
  border-bottom: ${Margin}px solid white;

  &:hover {
    background-color: ${lightColorString};
    color: ${darkColorString};
    opacity: 0.7;
  }
`;

const EmptyOption = styled.div`
  cursor: pointer;
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

type SelectProps = { options: OptionType[]; onClick: (value: string, label: string) => void };

export const Select = ({ options, onClick }: SelectProps) => {
  return (
    <Container>
      {options.map((option) => (
        <Option onClick={() => onClick(option.value, option.label)}>{option.label}</Option>
      ))}
      {options.length < 5 && <>{new Array(9 - options.length).fill(<EmptyOption />)}</>}
    </Container>
  );
};
