import { useEffect, useState } from 'react'
import { useStopwatch } from 'react-timer-hook';
import { getAudius } from '../util/audius'
import { LightPlayer } from './LightPlayer'

type PlayerProps = { trackId: string }

export const Player = ({ trackId }: PlayerProps) => {
    const [playing, setPlaying] = useState<boolean>(false)
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [metadata, setMetadata] = useState<any>();
    const {
    seconds,
    start,
    pause,
  } = useStopwatch({ autoStart: false });

    useEffect(() => {
        const getAudio = async () => {
            const fetchedAudio = await getAudius({}).getTrack({ trackId })
            setMetadata(fetchedAudio.data)
            const streamUrl = getAudius({}).streamUrl({ trackId })
            console.log({fetchedAudio, streamUrl })
            setAudio(new Audio(streamUrl))
        }
        getAudio();
    }, [trackId])

    const togglePlay = () => {
        console.log('what')
        if(audio && playing) {
            audio.pause();
            pause();
            setPlaying(false);
        } else {
            if(audio) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                      .then(_ => {
                        start();
                        setPlaying(true);
                        console.log("audio played auto");
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }
            }
        }
      }

      return (
          <LightPlayer 
            onClick={togglePlay} 
            duration={metadata?.data?.duration || 0} 
            passed={seconds} 
            playing={playing}/>
      )
}