import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../../Posts/Post";
import { PostType } from "../../../types";
import { useParams } from "react-router";
import { Loader } from "../../Loader";
import { Line } from "../../Line";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

const Subheader = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const POSTS = gql`
  query GetUserPosts($input: GetUserInput!) {
    user(input: $input) {
      userName
      bio
      posts {
        id
        completedness
        track {
          audiusTrackId
        }
        story
        title
        inceptionDate
        createdAt
      }
    }
  }
`;

export const TrackPage = () => {
  let { userName, trackId } = useParams();
  const { data, loading, error } = useQuery(POSTS, { variables: { input: { userName } } });

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <Subheader>{data?.user?.userName}</Subheader>
      <Line />
      {data?.user?.posts
        .filter((post: PostType) => `${post.id}` === trackId)
        .map((post: PostType) => (
          <Post
            id={post.id}
            completedness={post.completedness}
            title={post.title}
            story={post.story}
            trackId={post.track.audiusTrackId}
            inceptionDate={new Date(post.inceptionDate)}
          />
        ))}
    </Container>
  );
};
