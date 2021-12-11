import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Post } from "../../Posts/Post";
import { PostType, UserType } from "../../../types";
import { useParams } from "react-router";
import { Loader } from "../../Loader";
import { Line } from "../../Line";
import { Button } from "../../Button";

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
      id
      userName
      bio
      publicAddress
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
      comments {
        id
      }
    }
  }
`;

const FOLLOW = gql`
  mutation Follow($input: FollowInput!) {
    follow(input: $input) {
      follower {
        id
        following {
          id
        }
      }
    }
  }
`;

const ME = gql`
  query ArtistPageMe {
    me {
      id
      following {
        id
      }
    }
  }
`;

export const ArtistPage = () => {
  let { userName } = useParams();
  const { data, loading, error } = useQuery(POSTS, { variables: { input: { userName } } });
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME);
  const [follow] = useMutation(FOLLOW);

  if (loading || meLoading) return <Loader />;
  if (error || meError)
    return (
      <div>
        {error?.message}
        {meError?.message}
      </div>
    );

  const isFollowing = meData?.me.following.map((f: UserType) => f.id).includes(data?.user?.id);

  return (
    <Container>
      <div>
        <Subheader>{data?.user?.userName}</Subheader>
        <Button
          secondary={isFollowing}
          onClick={() => follow({ variables: { input: { followingUserId: data?.user?.id } } })}
        >
          {isFollowing ? "following" : "follow"}
        </Button>
      </div>
      <div>{data?.user?.publicAddress}</div>
      <Line />
      {data?.user?.posts.map((post: PostType) => (
        <Post
          id={post.id}
          completedness={post.completedness}
          title={post.title}
          story={post.story}
          trackId={post.track.audiusTrackId}
          inceptionDate={new Date(post.inceptionDate)}
          createdAt={new Date(parseInt(post.createdAt))}
          author={userName}
          showAuthor={false}
          comments={post.comments}
        />
      ))}
    </Container>
  );
};
