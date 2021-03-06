import { useEffect, useState, memo } from "react";
import styled from "styled-components";
import { useStopwatch } from "react-timer-hook";
import { getAudius } from "../util/audius";
import { LightPlayer } from "./LightPlayer";
import { TrackContext, HostContext } from "../App";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type PlayerProps = { trackId: string; postId: string; scrollIntoView?: () => void };

const getTimeFromDuration = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Player = memo(({ trackId, postId, scrollIntoView }: PlayerProps) => {
  const { playingTrackId, setPlayingTrackId } = useContext(TrackContext);
  const host = useContext(HostContext);
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [metadata, setMetadata] = useState<any>();
  const [startLocation, setStartLocation] = useState<number>(0);
  const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });
  const elapsed = seconds + minutes * 60;
  const loc = useLocation();

  useEffect(() => {
    const getAudio = async () => {
      const audius = getAudius({ host });
      const fetchedAudio = await audius.getTrack({ trackId });
      setMetadata(fetchedAudio.data);
      const streamUrl = audius.streamUrl({ trackId });
      setAudio(new Audio(streamUrl));
    };
    getAudio();
  }, [trackId, host]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", function () {
        audio.currentTime = startLocation; // jump to start location
      });
    }
  }, [startLocation, audio]);

  useEffect(() => {
    if (audio) {
      if (playingTrackId === postId && !playing) {
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
        audio.pause();
        setPlaying(false);
        setStartLocation((sl) => sl + elapsed);
        reset();
        pause();
      }
    }
    return () => {
      setPlaying(false);
      audio?.pause();
    };
    // eslint-disable-next-line
  }, [playingTrackId, audio, loc]);

  const togglePlay = () => {
    if (scrollIntoView) {
      scrollIntoView();
    }
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
        passed={startLocation + elapsed}
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
});
