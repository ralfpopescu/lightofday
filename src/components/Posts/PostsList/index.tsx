import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../Post";
import { PostType } from "../../../types";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

const POSTS = gql`
  query GetPosts {
    me {
      id
      userName
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

export const PostsList = () => {
  const { data, loading, error } = useQuery(POSTS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      {data?.me?.posts.map((post: PostType) => (
        <Post
          id={post.id}
          completedness={post.completedness}
          title={post.title}
          story={post.story}
          trackId={post.track.audiusTrackId}
          inceptionDate={new Date(post.inceptionDate)}
          author={data.me.userName}
        />
      ))}
    </Container>
  );
};
