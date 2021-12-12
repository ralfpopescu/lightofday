import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Post } from "../../Posts/Post";
import { PostType } from "../../../types";
import { useParams } from "react-router";
import { Loader } from "../../Loader";
import { Line } from "../../Line";
import { Comments } from "./Comments";
import { Link } from "../../Link";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

const Subheader = styled.h2`
  margin: 0;
  font-size: 20px;
  align-text: left;
`;

const POSTS = gql`
  query GetUserPosts($input: GetUserInput!) {
    user(input: $input) {
      userName
      publicAddress
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
        comments {
          id
        }
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
      <Link to={`/artist/${userName}`} style={{ justifyContent: "flex-start" }}>
        <Subheader>{data?.user?.userName}</Subheader>
      </Link>
      <div>{data?.user?.publicAddress}</div>
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
            inceptionDate={new Date(parseInt(post.inceptionDate))}
            createdAt={new Date(parseInt(post.createdAt))}
            comments={post.comments}
          />
        ))}
      <Comments />
    </Container>
  );
};
