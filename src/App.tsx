import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import { Login } from "./components/Login";
import { Setup } from "./components/Setup";
import { Logo } from "./components/Logo";
import { Feed } from "./components/scenes/Feed";
import { ArtistPage } from "./components/scenes/ArtistPage";
import { Me } from "./components/scenes/Me";
import { darkColorString, lightColorString } from "./util/theme";
import { Link } from "./components/Link";
import { ReactComponent as UserIcon } from "./assets/user.svg";

const ME = gql`
  query RootMe {
    me {
      id
      email
      userName
      audiusUser {
        id
      }
      posts {
        id
      }
    }
  }
`;

const headerHeight = 100;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: ${headerHeight}px auto;
  grid-template-columns: audo 1fr 300px;
  grid-template-areas: "logo menu login";
  background-color: ${darkColorString};
  color: ${darkColorString};
`;

type AreaProps = { area: string };

const Area = styled.div<AreaProps>`
  grid-area: ${(props) => props.area};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin-top: ${headerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;

const StyledLink = styled(Link)`
  color: ${lightColorString};
`;

const StyledIcon = styled(UserIcon)`
  height: 32px;
  width: 32px;
  margin-right: 32px;
  fill: ${lightColorString};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

function App() {
  const { data, loading, error, refetch } = useQuery(ME);

  const showSetup = data?.me && (!data.me?.email || !data.me?.audiusUser || !data.me?.userName);
  return (
    <div className="App">
      <Header>
        <Area area="logo">
          <StyledLink to="/" secondary>
            <Logo />
            <div style={{ marginLeft: "8px", color: lightColorString }}>Light of day</div>
          </StyledLink>
        </Area>
        <Area area="menu"></Area>
        <Area area="login">
          <Link to="/me">
            <StyledIcon />
          </Link>
          <Login refetch={refetch} />
        </Area>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<>{showSetup ? <Setup /> : <Feed />}</>} />
          <Route path="/artist/:userName" element={<ArtistPage />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </Content>
    </div>
  );
}

export default App;
