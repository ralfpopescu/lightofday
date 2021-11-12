import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LightPlayer } from './components/LightPlayer'
import { Player } from './components/Player'
import ReactInterval from 'react-interval';
import { useStopwatch } from 'react-timer-hook';

const exampleTrackId = 'rEK9Z';

function App() {
  const [percent, setPercent] = useState(0);
  const [playing, setPlaying] = useState(false);
  

  return (
    <div className="App">
    {/* <ReactInterval timeout={1000} enabled={true}
          callback={() => {
            if(percent < 100) {
              setPercent(percent => percent + 1)}
            }
            } /> */}
      <Player trackId={exampleTrackId} />
    </div>
  );
}

export default App;
