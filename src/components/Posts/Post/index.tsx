import styled from "styled-components";
import { useRef } from "react";
import { Completion } from "../../Completion";
import { Player } from "../../Player";
import format from "date-fns/format";
import { useMediaQuery } from "react-responsive";
import { Link } from "../../Link";
import { ReactComponent as Heart } from "../../../assets/heart.svg";
import { darkColorString, lightColorString } from "../../../util/theme";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CommentType, LikeType } from "../../../types";

const ME = gql`
  {
    me {
      id
      likes {
        id
        post {
          id
        }
      }
    }
  }
`;

const LIKE = gql`
  mutation Like($input: LikeInput!) {
    like(input: $input) {
      liker {
        id
        likes {
          id
        }
      }
    }
  }
`;

const UNLIKE = gql`
  mutation Unlike($input: LikeInput!) {
    unlike(input: $input) {
      liker {
        id
        likes {
          id
        }
      }
    }
  }
`;

const DesktopContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 40px 40px 40px 1fr 40px;
  border: 1px solid #ebebeb;
  max-width: 1000px;
  padding: 20px;
  border-radius: 4px;
  background-color: white;

  grid-template-areas: "header postDate" "completion player" "startDate player" "story player" "story likes";
`;

const MobileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 40px 40px 40px 1fr 1fr;
  border: 1px solid #ebebeb;
  padding: 20px;
  border-radius: 4px;
  background-color: white;

  grid-template-areas: "header header" "postDate postDate" "completion completion" "startDate startDate" "story story" "player player" "likes likes";
`;

type AreaProps = { area: string };

const Area = styled.div<AreaProps>`
  grid-area: ${(props) => props.area};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  text-align: left;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
`;

const Story = styled.div`
  overflow: auto;
  height: 160px;
  text-align: left;
  padding: 12px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  width: 320px;
`;

const dateFormat = (date: Date) => format(date, "MMM dd, yyyy");

const AlignLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  white-space: nowrap;
`;

type PostProps = {
  id: number;
  completedness: number;
  trackId: string;
  story: string;
  title: string;
  inceptionDate: Date;
  author?: string;
  showAuthor?: boolean;
  createdAt: Date;
  liked?: boolean;
  comments: CommentType[];
};

const HeaderRow = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

const Comments = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeartIcon = styled(Heart)<{ liked: boolean }>`
  cursor: pointer;
  width: 20px;
  margin-left: 20px;
  fill: ${(props) => (props.liked ? lightColorString : darkColorString)};

  &:hover {
    opacity: 0.7;
  }
`;

export const Post = ({
  id,
  completedness,
  trackId,
  story,
  title,
  inceptionDate,
  createdAt,
  author,
  showAuthor,
  comments,
}: PostProps) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);
  const { data } = useQuery(ME);
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const liked = data?.me?.likes.map((like: LikeType) => like.post.id).includes(id);

  const Container = isTabletOrMobile ? MobileContainer : DesktopContainer;

  return (
    <Container ref={scrollToRef} style={{ scrollMargin: "100px" }}>
      <Area area="header">
        <Link to={`/artist/${author}/${id}`} style={{ width: "100%", textDecoration: "underline" }}>
          <HeaderRow
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              width: "100%",
              fontSize: isTabletOrMobile ? "12px" : "16px",
            }}
          >
            {showAuthor && <Header style={{ fontStyle: "italic" }}>{author}/</Header>}
            <Header>{title}</Header>
          </HeaderRow>
        </Link>
      </Area>
      <Area area="postDate" style={{ fontSize: "12px" }}>
        {isTabletOrMobile ? (
          <Table>
            {isTabletOrMobile && <AlignLeft>Posted:</AlignLeft>}
            {console.log({ createdAt })}
            <AlignLeft>{dateFormat(createdAt)}</AlignLeft>
          </Table>
        ) : (
          <>{dateFormat(createdAt)}</>
        )}
      </Area>
      <Area area="completion">
        <Table>
          <AlignLeft>Completedness:</AlignLeft>
          <AlignLeft>
            <Completion count={completedness} />
          </AlignLeft>
        </Table>
      </Area>
      <Area
        area="player"
        onClick={() => scrollToRef?.current?.scrollIntoView({ behavior: "smooth" })}
      >
        <Player trackId={trackId} postId={`${id}`} />
      </Area>
      <Area area="story">
        <Story>{story}</Story>
      </Area>
      <Area area="likes">
        <Comments style={{ display: "flex", flexDirection: "row" }}>
          <div>comments ({comments.length}) </div>
          <HeartIcon
            liked={!!liked}
            onClick={() => {
              const payload = { variables: { input: { postId: id } } };
              if (!liked) like(payload);
              else unlike(payload);
            }}
          />
        </Comments>
      </Area>
      <Area area="startDate">
        <Table>
          <AlignLeft>Inception:</AlignLeft>
          <AlignLeft>{dateFormat(inceptionDate)}</AlignLeft>
        </Table>
      </Area>
    </Container>
  );
};
