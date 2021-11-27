import { useState } from "react";
import styled from "styled-components";
import ReactInterval from "react-interval";

const numberOfPoints = 15;
const angle = 360 / numberOfPoints;
const circleSize = 50;
const pointSize = 6;

type PointType = { angle: number; index: number; activeIndex: number };

const points = new Array(numberOfPoints).fill(null).map((_, i) => ({ index: i, angle: i * angle }));

type Color = [number, number, number];

const lightColor: Color = [255, 238, 191];
const darkColor: Color = [46, 46, 45];

const getColorBetweenColors = (color1: Color, color2: Color, percentBetween: number): Color => {
  const rDiff = color2[0] - color1[0];
  const gDiff = color2[1] - color1[1];
  const bDiff = color2[2] - color1[2];

  return [
    Math.floor(rDiff * percentBetween),
    Math.floor(gDiff * percentBetween),
    Math.floor(bDiff * percentBetween),
  ];
};

const getColorFromArray = (color: Color) => `rgb(${color.join(", ")})`;

const getPointColor = (index: number, activeIndex: number): Color => {
  const modded = activeIndex % points.length;

  if (modded === index) return lightColor;
  if (modded - index === 1) return getColorBetweenColors(darkColor, lightColor, 0.75);
  if (modded - index === 2) return getColorBetweenColors(darkColor, lightColor, 0.5);
  if (modded - index === 3) return getColorBetweenColors(darkColor, lightColor, 0.25);

  return darkColor;
};

const Point = styled.div<PointType>`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${pointSize}px;
  height: ${pointSize}px;
  border-radius: 50%;
  margin: -14px;
  cursor: pointer;
  align-items: center;
  transition: all 0.1s ease-in-out;
  justify-content: center;
  transform: translateY(${pointSize / 2}px) translateX(${pointSize / 2}px)
    rotate(${(props) => props.angle}deg) translate(${circleSize / 2 - pointSize / 2}px);

  &:hover {
    opacity: 0.7;
  }
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

export const Loader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log({ activeIndex });
  return (
    <Container>
      <ReactInterval
        callback={() => {
          setActiveIndex((i) => (i += 1));
        }}
        timeout={50}
        enabled
      />
      <CircleContainer>
        {points.map((point, i) => (
          <Point
            {...point}
            index={i}
            activeIndex={activeIndex}
            style={{ backgroundColor: getColorFromArray(getPointColor(i, activeIndex)) }}
          />
        ))}
      </CircleContainer>
    </Container>
  );
};
