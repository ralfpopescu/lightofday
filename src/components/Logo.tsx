import styled from "styled-components";

const numberOfPoints = 15;
const angle = 360 / numberOfPoints;
const circleSize = 25;
const pointSize = 3;

type PointType = { index: number; angle: number; percent: number };

const points = new Array(numberOfPoints).fill(null).map((_, i) => ({ index: i, angle: i * angle }));

type Color = [number, number, number];

const lightColor: Color = [255, 238, 191];

const getColorFromArray = (color: Color) => `rgb(${color.join(", ")})`;

const Point = styled.div<PointType>`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${pointSize}px;
  height: ${pointSize}px;
  border-radius: 50%;
  align-items: center;
  transition: all 0.5s ease-in-out;
  justify-content: center;
  background-color: ${getColorFromArray(lightColor)};
  transform: translateY(${-pointSize / 2}px) translateX(${-pointSize / 2}px)
    rotate(${(props) => props.angle}deg) translate(${circleSize / 2 - pointSize / 2}px);
`;

const Container = styled.div`
  position: relative;
  width: ${circleSize}px;
  height: ${circleSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: ${circleSize}px;
  height: ${circleSize}px;
  padding: 0;
  transition: all 0.5s ease-in-out;
  display: flex;
`;

const PlayButton = styled.div`
  z-index: 1;
  width: ${pointSize * 2}px;
  height: ${pointSize * 2}px;
  border-radius: 50%;
  background-color: ${getColorFromArray(lightColor)};
`;

export const Logo = () => {
  return (
    <Container>
      <CircleContainer>
        {points.map((point, i) => (
          <Point {...point} percent={i / numberOfPoints} />
        ))}
      </CircleContainer>
      <PlayButton />
    </Container>
  );
};
