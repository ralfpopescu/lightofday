import styled from "styled-components";
import { PostsList } from "./PostsList";
import { PostCreate } from "./PostCreate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Posts = () => {
  return (
    <Container>
      <PostCreate />
      <PostsList />
    </Container>
  );
};
