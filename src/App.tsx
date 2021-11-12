import styled from 'styled-components';

import { PostList } from './components/PostList'
import { Logo } from './components/Logo'

const Container = styled.div`
display: grid;
grid-template-rows: 100px 1fr;
grid-template-columns: 300px 1fr 300px;
grid-template-areas: "logo menu login" "content content content";
`

type AreaProps = { area: string }

const Area = styled.div<AreaProps>`
grid-area: ${props => props.area};
display: flex;
justify-content: center;
align-items: center;
`

function App() {
  return (
    <div className="App">
      <Container>
      <Area area="logo">
          <Logo />
          <div style={{ marginLeft: '8px'}}>Light of day</div>
        </Area>
        <Area area="content" style={{ backgroundColor: '#f1f1f1'}}>
          <PostList />
        </Area>
        <Area area="menu">
          <div>About</div>
          <div>Explore</div>
        </Area>
        <Area area="login">
          <div>Login</div>
        </Area>
      </Container>
    </div>
  );
}

export default App;
