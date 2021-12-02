import styled from "styled-components";
import { darkColor, lightColor, getColorFromArray } from "../util/theme";

const size = 20;

const Point = styled.div<{ active: boolean }>`
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? getColorFromArray(lightColor) : getColorFromArray(darkColor)};
  width: ${20}px;
  height: ${20}px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 120px;
`;

export const Completion = ({ count }: { count: number }) => {
  return (
    <Container>
      {new Array(5)
        .fill(null)
        .map((_, i) => (i <= count ? <Point active /> : <Point active={false} />))}
    </Container>
  );
};
