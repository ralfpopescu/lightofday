import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStopwatch } from "react-timer-hook";
import { getAudius } from "../util/audius";
import { LightPlayer } from "./LightPlayer";
import { TrackContext } from "../App";
import { useContext } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type PlayerProps = { trackId: string; postId: string };

const getTimeFromDuration = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Player = ({ trackId, postId }: PlayerProps) => {
  const { playingTrackId, setPlayingTrackId } = useContext(TrackContext);
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

  useEffect(() => {
    console.log("triggered", postId);
    if (audio) {
      if (playingTrackId === postId && !playing) {
        console.log("playing!");
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
      } else {
        console.log("WE SHOULD PAUSE");
        audio.pause();
        setPlaying(false);
        setStartLocation((sl) => sl + elapsed);
        reset();
        pause();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingTrackId, audio]);

  const togglePlay = () => {
    console.log("toggled", { playingTrackId });
    if (postId === playingTrackId) {
      console.log("huh");
      setPlayingTrackId("");
    } else {
      console.log("setting", { playingTrackId });
      setPlayingTrackId(postId);
    }
  };

  const duration = metadata?.data?.duration || 0;

  return (
    <Container>
      <LightPlayer
        onClick={togglePlay}
        duration={duration}
        passed={startLocation + seconds}
        playing={playing}
        setStartLocation={setStartLocation}
        onOuterCircleClick={(index) => {
          if (audio) {
            setStartLocation(Math.floor((index / 15) * metadata?.data?.duration || 1));
            if (!playing) {
              setPlayingTrackId(postId);
            } else {
              audio.pause();
              audio.play();
              setPlaying(true);
              setPlayingTrackId(postId);
            }
            reset();
          }
        }}
      />
      <div style={{ paddingTop: "8px" }}>
        {metadata
          ? `${getTimeFromDuration(startLocation + elapsed)} / ${getTimeFromDuration(duration)}`
          : "0:00 / 0:00"}
      </div>
    </Container>
  );
};
