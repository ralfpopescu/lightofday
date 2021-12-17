import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import { Login } from "./components/Login";
import { Setup } from "./components/Setup";
import { Logo } from "./components/Logo";
import { Feed } from "./components/scenes/Feed";
import { ArtistPage } from "./components/scenes/ArtistPage";
import { TrackPage } from "./components/scenes/TrackPage";
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
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: ${headerHeight}px auto;
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
  background-color: #f5f5f5;
  padding: 16px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
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

export const TrackContext = createContext<any>({
  playingTrackId: "unset",
  setPlayingTrackId: () => console.log("default"),
});

function App() {
  const { data, refetch } = useQuery(ME);
  const [playingTrackId, setPlayingTrackId] = useState<string>("");

  const showSetup = data?.me && (!data.me?.email || !data.me?.audiusUser || !data.me?.userName);
  console.log({ showSetup, data });
  return (
    <TrackContext.Provider
      value={{
        playingTrackId,
        setPlayingTrackId: (track: string) => {
          console.log({ track });
          setPlayingTrackId(track);
        },
      }}
    >
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
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<>{showSetup ? <Setup isSetup /> : <Feed />}</>} />
              <Route path="/artist/:userName" element={<ArtistPage />} />
              <Route path="/artist/:userName/:trackId" element={<TrackPage />} />
              <Route path="/me" element={<Me />} />
            </Routes>
          </ContentWrapper>
        </Content>
      </div>
    </TrackContext.Provider>
  );
}

export default App;
