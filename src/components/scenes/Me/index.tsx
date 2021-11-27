import styled from "styled-components";
import { PostsList } from "../../Posts/PostsList";
import { PostCreate } from "../../Posts/PostCreate";
import { Setup } from "../../Setup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Me = () => {
  return (
    <Container>
      <Setup />
      <PostCreate />
      <PostsList />
    </Container>
  );
};
