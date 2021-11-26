import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../../Posts/Post";
import { PostType } from "../../../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
      createdAt
      user {
        userName
      }
    }
  }
`;

const message = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
`;

export const Feed = () => {
  const { data, loading, error } = useQuery(FEED);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <div>{message}</div>
      {data?.feed?.map((post: PostType) => (
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
