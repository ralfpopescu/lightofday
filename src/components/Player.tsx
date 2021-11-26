import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { getAudius } from "../util/audius";
import { LightPlayer } from "./LightPlayer";

type PlayerProps = { trackId: string };

export const Player = ({ trackId }: PlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [metadata, setMetadata] = useState<any>();
  const [startLocation, setStartLocation] = useState<number>(0);
  const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });
  const elapsed = seconds + minutes * 60;

  useEffect(() => {
    const getAudio = async () => {
      const audius = getAudius({});
      const fetchedAudio = await audius.getTrack({ trackId });
      setMetadata(fetchedAudio.data);
      const streamUrl = audius.streamUrl({ trackId });
      setAudio(new Audio(streamUrl));
    };
    getAudio();
  }, [trackId]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", function () {
        audio.currentTime = startLocation; // jump to start location
      });
    }
  }, [startLocation, audio]);

  const togglePlay = () => {
    if (audio && playing) {
      audio.pause();
      setPlaying(false);
      setStartLocation((sl) => sl + elapsed);
      reset();
      pause();
    } else {
      if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              start();
              setPlaying(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  return (
    <LightPlayer
      onClick={togglePlay}
      duration={metadata?.data?.duration || 0}
      passed={startLocation + seconds}
      playing={playing}
      setStartLocation={setStartLocation}
      onOuterCircleClick={(index) => {
        if (audio) {
          setStartLocation(Math.floor((index / 15) * metadata?.data?.duration || 1));
          if (!playing) {
            audio.play();
            setPlaying(true);
          } else {
            audio.pause();
            audio.play();
            setPlaying(true);
          }
          reset();
        }
      }}
    />
  );
};
