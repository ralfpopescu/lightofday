import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Routes, Route } from "react-router-dom";

import { Posts } from "./components/Posts";
import { Login } from "./components/Login";
import { Setup } from "./components/Setup";
import { Logo } from "./components/Logo";
import { Feed } from "./components/scenes/Feed";
import { ArtistPage } from "./components/scenes/ArtistPage";
import { Me } from "./components/scenes/Me";
import { darkColorString, lightColorString } from "./util/theme";
import { PostList } from "./components/PostList";
import { useEffect } from "react";

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

function App() {
  const { data, loading, error, refetch } = useQuery(ME);

  const showSetup = data?.me && (!data.me?.email || !data.me?.audiusUser || !data.me?.userName);
  return (
    <div className="App">
      <Header>
        <Area area="logo">
          <Logo />
          <div style={{ marginLeft: "8px", color: lightColorString }}>Light of day</div>
        </Area>
        <Area area="menu">
          <div style={{ color: lightColorString }}>About</div>
          <div style={{ marginLeft: "8px", color: lightColorString }}>Explore</div>
        </Area>
        <Area area="login">
          <Login refetch={refetch} />
        </Area>
      </Header>
      <Content>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showSetup && <Setup />}
                {!showSetup && (data?.me ? <Posts /> : <Feed />)}
              </>
            }
          />
          <Route path="/artist/:userName" element={<ArtistPage />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </Content>
    </div>
  );
}

export default App;
