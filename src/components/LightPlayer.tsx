import { SetStateAction } from 'react';
import styled from 'styled-components';

const numberOfPoints = 15;
const angle = 360 / numberOfPoints;
const circleSize = 100;
const pointSize = 12;

type PointType = { index: number, angle: number, percent: number }

const points = new Array(numberOfPoints).fill(null).map((_, i) => 
({ index: i, angle: i * angle }));

type Color = [number, number, number]

const lightColor: Color = [255, 238, 191]
const darkColor: Color = [46, 46, 45]

const getColorBetweenColors = (color1: Color, color2: Color, percentBetween: number): Color => {
    const rDiff = color2[0] - color1[0];
    const gDiff = color2[1] - color1[1];
    const bDiff = color2[2] - color1[2];

    return [Math.floor(rDiff * percentBetween), Math.floor(gDiff * percentBetween), Math.floor(bDiff * percentBetween)]
}

const getColorFromArray = (color: Color) => `rgb(${color.join(', ')})`

const getPointColor = (index: number, percent: number): Color => {
    const position = percent * numberOfPoints;
    if(position > index && position < index + 1) {
        const percentBetweenPoints = position % 1;
        return getColorBetweenColors(darkColor, lightColor, percentBetweenPoints);
    }
    if(position > index) return lightColor;
    return darkColor;
}

const Point = styled.div<PointType>`
display: flex;
  position: absolute;
  top:  50%; 
  left: 50%;
  width:  ${pointSize}px;
  height: ${pointSize}px;
  border-radius: 50%;
  margin: -14px;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s ease-in-out;
  justify-content: center;
  background-color: ${props => getColorFromArray(getPointColor(props.index, props.percent))};
transform: translateY(${pointSize/2}px) translateX(${pointSize/2}px) rotate(${props => props.angle}deg) translate(${circleSize/2 - (pointSize/2)}px);

&:hover {
    opacity: 0.7;
}
`

const Container = styled.div`
  position: relative;
  width:  ${circleSize}px;
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
  width:  ${circleSize}px;
  height: ${circleSize}px;
  padding: 0;
  transition: all 0.5s ease-in-out;
  display: flex;

`;

const PlayButton = styled.div<{ playing: boolean }>`
z-index: 1;
width: ${pointSize * 2}px;
height: ${pointSize * 2}px;
border-radius: 50%;
background-color: ${props => props.playing ? getColorFromArray(lightColor) : getColorFromArray(darkColor)};
cursor: pointer;
transition: all 0.1s ease-in-out;

&:hover {
    transform: scale(1.2);
    opacity: .7;
}
`

type LightPlayerProps = { playing: boolean, setPlaying: React.Dispatch<SetStateAction<boolean>>; }


export const LightPlayer = ({ playing, setPlaying }: LightPlayerProps) => {
    const percent = .34;
    return (
        <Container>
            {console.log({points})}
            <CircleContainer>
            {points.map(point => <Point {...point} percent={percent} />)}
            </CircleContainer>
            <PlayButton playing={playing} onClick={() => setPlaying(playing => !playing)}/>
        </Container>
    )
}