import styled from "styled-components";
import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { PostType, CommentType } from "../../../../types";
import { useParams } from "react-router";
import { Loader } from "../../../Loader";
import { Button } from "../../../Button";
import { useLoggedIn } from "../../../../util/use-logged-in";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
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
        inceptionDemo
        createdAt
        comments {
          id
          body
          author {
            userName
          }
        }
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      post {
        id
        comments {
          id
          body
        }
      }
    }
  }
`;

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div>
      <div style={{ fontWeight: 600 }}>{comment.author.userName}:</div>
      {comment.body}
    </div>
  );
};

export const Comments = () => {
  let { userName, trackId } = useParams();
  const { data, loading, error } = useQuery(POSTS, { variables: { input: { userName } } });
  const [body, setBody] = useState<string>("");
  const [addComment] = useMutation(ADD_COMMENT);
  const loggedIn = useLoggedIn();

  if (!loggedIn) return <div>Sign up to comment.</div>;

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  const post = data?.user?.posts.filter((post: PostType) => `${post.id}` === trackId)[0];

  return (
    <Container>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <Button
        disabled={body === ""}
        onClick={() => {
          if (body !== "") {
            addComment({ variables: { input: { postId: post.id, body } } });
          }
        }}
      >
        comment
      </Button>
      {post?.comments.map((comment: CommentType) => (
        <Comment comment={comment} />
      ))}
    </Container>
  );
};
