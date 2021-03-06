import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../../Posts/Post";
import { PostType } from "../../../types";
import { darkColorString, lightColorString } from "../../../util/theme";
import { Subheader } from "../../Subheader";
import { Line } from "../../Line";
import { Artists } from "./Artists";
import { Loader } from "../../Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

const FEED = gql`
  query GetFeed {
    feed {
      id
      completedness
      track {
        audiusTrackId
      }
      story
      title
      inceptionDate
      inceptionDemo
      createdAt
      user {
        userName
      }
      likes {
        id
        liker {
          id
        }
      }
      comments {
        id
      }
    }
  }
`;

const Highlight = styled.span`
  background-color: ${darkColorString};
  color: ${lightColorString};
`;

const SubheaderContainer = styled.h2`
  display: flex;
  flex-direction: column;
`;

const Message = () => (
  <div style={{ maxWidth: "800px", paddingTop: "16px", paddingBottom: "16px", display: "block" }}>
    An artists public catalogue is only the <Highlight>tip of the iceberg.</Highlight> There’s an
    enormous pressure to create high quality, on-brand art all the time, which takes a great deal of
    trial and error. Only a tiny fraction of these attempts will make the cut, leaving{" "}
    <Highlight>tons of content withering away</Highlight>. This content is often some of the{" "}
    <Highlight>artists most interesting work:</Highlight> heartfelt songs that just weren’t poppy
    enough, beats that were too experimental, exploration of different genres that the fans might
    not appreciate. This app’s mission is to{" "}
    <Highlight>bring this art to the light of day.</Highlight> It’s a safe place for artists to
    share their creations that they love without bloating their official curated catalogue with
    demos and passion projects. No play count popularity contest, no playlist culture, no
    unnecessary album art - <Highlight>just snippets of art and the stories behind them.</Highlight>
  </div>
);

export const Feed = () => {
  const { data, loading, error } = useQuery(FEED);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <Message />
      <SubheaderContainer>
        <Subheader>Artists</Subheader>
        <Line />
      </SubheaderContainer>
      <Artists />
      <SubheaderContainer>
        <Subheader>Latest lights</Subheader>
        <Line />
      </SubheaderContainer>
      <PostContainer>
        {data?.feed?.map((post: PostType) => (
          <Post
            id={post.id}
            author={post.user?.userName}
            completedness={post.completedness}
            title={post.title}
            story={post.story}
            trackId={post.track.audiusTrackId}
            inceptionDate={new Date(parseInt(post.inceptionDate))}
            inceptionDemo={post.inceptionDemo}
            createdAt={new Date(parseInt(post.createdAt))}
            comments={post.comments}
            showAuthor
          />
        ))}
      </PostContainer>
    </Container>
  );
};
