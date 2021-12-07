import styled from "styled-components";
import { PostsList } from "../../Posts/PostsList";
import { PostCreate } from "../../Posts/PostCreate";
import { Setup } from "../../Setup";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
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
