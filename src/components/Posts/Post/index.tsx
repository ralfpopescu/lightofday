import styled from "styled-components";
import { useRef, useState } from "react";
import { Completion } from "../../Completion";
import { Player } from "../../Player";
import format from "date-fns/format";
import { useMediaQuery } from "react-responsive";
import { Link } from "../../Link";
import { ReactComponent as Heart } from "../../../assets/heart.svg";
import { darkColorString, lightColorString } from "../../../util/theme";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CommentType, LikeType } from "../../../types";
import { useLoggedIn } from "../../../util/use-logged-in";
import { Button } from "../../Button";
import { PostUpdate } from "./PostUpdate";

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

const dateFormat = (date: Date) => {
  try {
    return format(date, "MMM dd, yyyy");
  } catch (e: any) {
    console.log(e.message, { date });
    return null;
  }
};

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
  inceptionDemo?: string;
  author?: string;
  showAuthor?: boolean;
  createdAt: Date;
  liked?: boolean;
  comments: CommentType[];
  editable?: boolean;
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

const HeartIconStatic = styled(Heart)`
  width: 20px;
  margin-left: 20px;
  fill: ${darkColorString};
`;

export const Post = ({
  id,
  completedness,
  trackId,
  story,
  title,
  inceptionDate,
  inceptionDemo,
  createdAt,
  author,
  showAuthor,
  comments,
  editable,
}: PostProps) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [editMode, setEditMode] = useState(false);
  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);
  const { data } = useQuery(ME);
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const liked = data?.me?.likes.map((like: LikeType) => like.post.id).includes(id);
  const loggedIn = useLoggedIn();

  const Container = isTabletOrMobile ? MobileContainer : DesktopContainer;

  return !editMode ? (
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
        {editable && (
          <Button onClick={() => setEditMode(true)} style={{ marginLeft: "8px" }}>
            edit
          </Button>
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
      <Area area="player">
        <Player
          trackId={trackId}
          postId={`${id}`}
          scrollIntoView={() => scrollToRef?.current?.scrollIntoView({ behavior: "smooth" })}
        />
      </Area>
      <Area area="story">
        <Story>{story}</Story>
      </Area>
      <Area area="likes">
        <Comments style={{ display: "flex", flexDirection: "row" }}>
          <Link to={`/artist/${author}/${id}`}>comments ({comments.length}) </Link>
          {loggedIn ? (
            <HeartIcon
              liked={!!liked}
              onClick={() => {
                const payload = { variables: { input: { postId: id } } };
                if (!liked) like(payload);
                else unlike(payload);
              }}
            />
          ) : (
            <HeartIconStatic />
          )}
        </Comments>
      </Area>
      <Area area="startDate">
        <Table>
          <AlignLeft>Inception:</AlignLeft>
          <AlignLeft>
            {inceptionDate ? dateFormat(inceptionDate) : "no inception date specified"}
            {inceptionDemo && (
              <div>
                /{" "}
                <a href={inceptionDemo} target="_blank" rel="noreferrer">
                  demo
                </a>
              </div>
            )}
          </AlignLeft>
        </Table>
      </Area>
    </Container>
  ) : (
    <PostUpdate
      editModeOff={() => setEditMode(false)}
      post={{
        id: `${id}`,
        completedness,
        story,
        title,
        inceptionDate,
        inceptionDemo,
      }}
    />
  );
};
