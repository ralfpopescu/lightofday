import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

import { Posts } from "./components/Posts";
import { Login } from "./components/Login";
import { Setup } from "./components/Setup";
import { Logo } from "./components/Logo";
import { darkColorString, lightColorString } from "./util/theme";

const ME = gql`
  query RootMe {
    me {
      id
      email
      audiusUser {
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
  const { data, loading, error } = useQuery(ME);

  const showSetup = data && (!data.me?.email || !data.me?.audiusUser);
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
          <Login />
        </Area>
      </Header>
      <Content>
        {showSetup && <Setup />}
        {data?.me && <Posts />}
      </Content>
    </div>
  );
}

export default App;
