import styled from "styled-components";
import { PostsList } from "../../Posts/PostsList";
import { PostCreate } from "../../Posts/PostCreate";
import { Setup } from "../../Setup";
import { useLoggedIn } from "../../../util/use-logged-in";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
`;

export const Me = () => {
  const loggedIn = useLoggedIn();

  if (!loggedIn) return <Navigate replace to="/" />;

  return (
    <Container>
      <Setup />
      <PostCreate />
      <PostsList />
    </Container>
  );
};
