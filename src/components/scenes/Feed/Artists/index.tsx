import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { darkColorString, lightColorString } from "../../../../util/theme";
import { Point } from "../../../Point";
import { Link } from "../../../Link";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const USERS = gql`
  query Users {
    users {
      id
      userName
      posts {
        id
      }
    }
  }
`;

const ArtistContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  background-color: ${darkColorString};
  color: ${lightColorString};
  padding: 8px;
  border-radius: 8px;
  align-items: center;
`;

export const Artists = () => {
  const { data, loading, error } = useQuery(USERS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      {data?.users.map((user: any) => (
        <ArtistContainer to={`/artist/${user?.userName}`}>
          <div style={{ marginRight: "16px" }}>{user?.userName}</div>
          <div style={{ marginRight: "8px" }}>
            <Point active size={12} />
          </div>
          {user?.posts.length}
        </ArtistContainer>
      ))}
    </Container>
  );
};
