import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../Post";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

const POSTS = gql`
  query GetPosts {
    me {
      posts {
        id
        completedness
        track {
          audiusTrackId
        }
        story
        title
        inceptionDate
      }
    }
  }
`;

export const PostsList = () => {
  const { data, loading, error } = useQuery(POSTS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      {data.me.posts.map((post: any) => (
        <Post
          id={post.id}
          completedness={post.completedness}
          title={post.title}
          story={post.story}
          trackId={post.track.id}
          inceptionDate={new Date(post.inceptionDate)}
        />
      ))}
    </Container>
  );
};
