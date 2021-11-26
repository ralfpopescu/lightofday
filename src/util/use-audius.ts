import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { getAudius } from "../util/audius";

type UseAudiusArgs = { trackId: string };

const getTotalTime = (seconds: number, minutes: number) => seconds + minutes * 60;

export const useAudius = ({ trackId }: UseAudiusArgs) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [metadata, setMetadata] = useState<any>();
  const [startLocation, setStartLocation] = useState<number>(0);
  const {
    seconds,
    minutes,
    start: timerStart,
    reset: timerReset,
  } = useStopwatch({ autoStart: false });
  const elapsed = getTotalTime(seconds, minutes);

  useEffect(() => {
    const getAudio = async () => {
      const audius = getAudius({});

      const fetchedMetadata = await audius.getTrack({ trackId });
      const streamUrl = audius.streamUrl({ trackId });

      setMetadata(fetchedMetadata.data);
      setAudio(new Audio(streamUrl));
    };
    getAudio();
  }, [trackId, metadata]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", function () {
        audio.currentTime = startLocation; // jump to start location
      });
    }
  }, [startLocation, audio]);

  const seek = (percentage: number) => {
    const newLocation = percentage * metadata.duration;

    setStartLocation(newLocation);
    //reset timer
    timerReset();
  };

  const togglePlay = () => {
    console.log("what");
    if (audio && playing) {
      audio.pause();
      setPlaying(false);
      setStartLocation((sl) => sl + seconds);
      timerReset();
    } else {
      if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              timerStart();
              setPlaying(true);
              console.log("audio played auto");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  return {
    audio,
    togglePlay,
    seek,
  };
};
