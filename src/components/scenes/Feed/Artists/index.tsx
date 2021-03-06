import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { darkColorString, lightColorString } from "../../../../util/theme";
import { Point } from "../../../Point";
import { Link } from "../../../Link";
import { Loader } from "../../../Loader";

const Container = styled.div`
  display: grid;
  grid-gap: 12px;
  overflow: auto;
  grid-template-rows: repeat(auto-fit, minmax(50px, 50px));
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  min-height: 50px;
  max-height: 112px;
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

  if (loading) return <Loader />;
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
