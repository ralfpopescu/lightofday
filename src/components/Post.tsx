import styled from "styled-components";
import { Completion } from "./Completion";
import { Player } from "./Player";
import format from "date-fns/format";

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
`;

type AreaProps = { area: string };

const Area = styled.div<AreaProps>`
  grid-area: ${(props) => props.area};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  font-weight: 600;
  text-align: left;
  width: 100%;
  font-size: 20px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
`;

const Story = styled.div`
  overflow: auto;
  height: 200px;
  text-align: left;
  padding: 12px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
`;

const text = `I want to start the light of day project off with a sentimental one. When my buddy Pierce passed away, I missed him for a lot of reasons, but it hit me extra hard that we never got to really make a track together. We had a couple small things we passed back and forth, but never a real collaboration. I made this track "pretending" to collab with him. I picked sounds he might have liked, melodies he might have written. It came out pretty and I hope he can hear it wherever he is.`;

const dateFormat = (date: Date) => format(date, "MMMM dd, yyyy");

const AlignLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
`;

export const Post = () => {
  const date = new Date();
  return (
    <Container>
      <Area area="header">
        <Header>Under Pressure (Hold On)</Header>
      </Area>
      <Area area="postDate">{dateFormat(date)}</Area>
      <Area area="completion">
        <Table>
          <AlignLeft>Completedness:</AlignLeft>
          <AlignLeft>
            <Completion count={3} />
          </AlignLeft>
        </Table>
      </Area>
      <Area area="player">
        <Player trackId="rEK9Z" postId="1" />
      </Area>
      <Area area="story">
        <Story>{text}</Story>
      </Area>
      <Area area="startDate">
        <Table>
          <AlignLeft>Inception:</AlignLeft>
          <AlignLeft>{dateFormat(date)}</AlignLeft>
        </Table>
      </Area>
    </Container>
  );
};
