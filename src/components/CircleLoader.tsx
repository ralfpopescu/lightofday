import styled from 'styled-components';

const numberOfPoints = 15;
const angle = 360 / numberOfPoints;
const circleSize = 100;
const pointSize = 12;

type PointType = { index: number, angle: number }

const points = new Array(numberOfPoints).fill(null).map((_, i) => 
({ index: i, angle: i * angle }));

const lightColor = '255, 238, 191'
const darkColor = '46, 46, 45'

const Point = styled.div<PointType>`
border: 1px solid black;
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
transform: translateY(${pointSize/2}px) translateX(${pointSize/2}px) rotate(${props => props.angle}deg) translate(${circleSize/2 - (pointSize/2)}px);
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


export const CircleLoader = () => {
    const percent = .6;
    return (
        <Container>
            {console.log({points})}
            <CircleContainer>
            {points.map(point => <Point {...point} />)}
            </CircleContainer>
            <div>hello</div>
        </Container>
    )
}