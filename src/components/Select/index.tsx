import styled from "styled-components";
import { lightColorString, darkColorString } from "../../util/theme";

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  height: 100px;
  overflow-y: auto;
`;

const Option = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background-color: ${darkColorString};
  color: ${lightColorString};

  &:hover {
    background-color: ${lightColorString};
    color: ${darkColorString};
    opacity: 0.7;
  }
`;

type OptionType = { value: string; label: string };

type SelectProps = { options: OptionType[]; onClick: (value: string, label: string) => void };

export const Select = ({ options, onClick }: SelectProps) => {
  return (
    <Container>
      {options.map((option) => (
        <Option onClick={() => onClick(option.value, option.label)}>{option.label}</Option>
      ))}
    </Container>
  );
};
