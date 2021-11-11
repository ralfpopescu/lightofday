import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Player } from './components/Player'
import { CircleLoader } from './components/CircleLoader'
import ReactInterval from 'react-interval';

const exampleTrackId = 'rEK9Z';

function App() {
  const [percent, setPercent] = useState(0);

  return (
    <div className="App">
    <ReactInterval timeout={200} enabled={true}
          callback={() => setPercent(percent => percent + 1)} />
      <Player trackId={exampleTrackId} />
      <CircleLoader percent={percent / 100}/>
    </div>
  );
}

export default App;
