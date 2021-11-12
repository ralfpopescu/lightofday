import { useEffect, useState } from 'react'
import { getAudius } from '../util/audius'

type PlayerProps = { trackId: string }

export const Player = ({ trackId }: PlayerProps) => {
    const [playing, setPlaying] = useState<boolean>(false)
    const [audio, setAudio] = useState<HTMLAudioElement>();

    useEffect(() => {
        const getAudio = async () => {
            const fetchedAudio = await getAudius({}).getTrack({ trackId })
            console.log({ fetchedAudio })
            const streamUrl = getAudius({}).streamUrl({ trackId })
            setAudio(new Audio(streamUrl))
        }
        getAudio();
    }, [trackId])

    const togglePlay = () => {
        if(audio && playing) {
            audio.pause();
            setPlaying(false);
        } else {
            if(audio) {
                const playPromise = audio.play();
                setPlaying(true);
                if (playPromise !== undefined) {
                    playPromise
                      .then(_ => {
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
          <button onClick={togglePlay}>PLAY</button>
      )
}