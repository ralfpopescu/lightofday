import styled from "styled-components";
import { darkColor, lightColor, getColorFromArray } from "../../../../util/theme";

const Point = styled.div<{ active: boolean }>`
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? getColorFromArray(lightColor) : getColorFromArray(darkColor)};
  width: ${20}px;
  height: ${20}px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 120px;
`;

export const CompletednessSelector = ({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) => {
  return (
    <Container>
      {new Array(5)
        .fill(null)
        .map((_, i) =>
          i <= count ? (
            <Point active onClick={() => setCount(i)} />
          ) : (
            <Point active={false} onClick={() => setCount(i)} />
          )
        )}
    </Container>
  );
};
