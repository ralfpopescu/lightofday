import styled from 'styled-components';
import { Completion } from './Completion';
import { Player } from './Player';
import format from 'date-fns/format';

const Container = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
grid-template-rows: 40px 40px 40px 1fr;
border: 1px solid #ebebeb;
max-width: 1000px;
padding: 20px;
border-radius: 4px;
background-color: white;

grid-template-areas: "header postDate" "completion player" "startDate player" "story player";
`

type AreaProps = { area: string }

const Area = styled.div<AreaProps>`
grid-area: ${props => props.area};
display: flex;
justify-content: center;
align-items: center;
`

const Header = styled.div`
font-weight: 600;
text-align: left;
width: 100%;
font-size: 24px;
`

const Table = styled.div`
display: grid;
grid-template-columns: 1fr 2fr;
width: 100%;
`

const Story = styled.div`
overflow: auto;
height: 200px;
text-align: left;
padding: 12px;
border: 1px solid #ebebeb;
border-radius: 4px;
`

const text = `Austria initially emerged as a margraviate around 976 and developed into a duchy and archduchy. In the 16th century, Austria started serving as the heart of the Habsburg Monarchy and the junior branch of the House of Habsburg – one of the most influential royal dynasties in history. As an archduchy, it was a major component and administrative centre of the Holy Roman Empire. Early in the 19th century, Austria established its own empire, which became a great power and the leading force of the German Confederation, but pursued its own course independently of the other German states following its defeat in the Austro-Prussian War in 1866.`

const dateFormat = (date: Date) => format(date, "MMMM dd, yyyy")

const AlignLeft = styled.div`
display: flex;
flex-direction: row;
justify-content: left;
align-items: left;
`

export const Post = () => {
    const date = new Date();
    return <Container>
        <Area area="header"><Header>Under Pressure (Hold On)</Header></Area>
        <Area area="postDate">{dateFormat(date)}</Area>
        <Area area="completion">
            <Table>
                <AlignLeft>Completedness:</AlignLeft>
                <AlignLeft><Completion count={3}/></AlignLeft>
            </Table>
        </Area>
        <Area area="player"><Player trackId="rEK9Z"/></Area>
        <Area area="story"><Story>{text}</Story></Area>
        <Area area="startDate">
            <Table>
                <AlignLeft>Started on:</AlignLeft>
                <AlignLeft>{dateFormat(date)}</AlignLeft>
            </Table>
        </Area>
    </Container>
}