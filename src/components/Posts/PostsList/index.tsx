import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../Post";
import { PostType } from "../../../types";
import { Loader } from "../../Loader";

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
        comments {
          id
        }
      }
    }
  }
`;

export const PostsList = () => {
  const { data, loading, error } = useQuery(POSTS);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      {data?.me?.posts.map((post: PostType) => (
        <>
          <Post
            id={post.id}
            completedness={post.completedness}
            title={post.title}
            story={post.story}
            trackId={post.track.audiusTrackId}
            inceptionDate={new Date(parseInt(post.inceptionDate))}
            author={data.me.userName}
            createdAt={new Date(parseInt(post.createdAt))}
            comments={post.comments}
          />
        </>
      ))}
    </Container>
  );
};
