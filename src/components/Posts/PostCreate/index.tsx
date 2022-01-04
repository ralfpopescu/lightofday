import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CompletednessSelector } from "./CompletednessSelector";
import { Button } from "../../Button";
import { getAudius } from "../../../util/audius";
import { AudiusTrackData } from "../../../types/audius";
import { Select } from "../../Select";
import { useMediaQuery } from "react-responsive";
import DatePicker from "react-datepicker";

import "./datepicker.css";

const DesktopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
  border: 1px solid #ebebeb;
  max-width: 1000px;
  padding: 20px;
  border-radius: 4px;
  background-color: white;
`;

const MobileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
  border: 1px solid #ebebeb;
  max-width: 1000px;
  padding: 20px;
  border-radius: 4px;
  background-color: white;
`;

const ME = gql`
  query PostCreateMe {
    me {
      id
      audiusUser {
        id
      }
    }
  }
`;

const POST_CREATE = gql`
  mutation PostCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      id
      completedness
      user {
        id
        posts {
          id
        }
      }
      track {
        audiusTrackId
      }
      story
      title
      inceptionDate
      inceptionDemo
    }
  }
`;

export const PostCreate = () => {
  const { data } = useQuery(ME);
  const [title, setTitle] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [inceptionDemo, setDemo] = useState<string>("");
  const [completedness, setCompletedness] = useState<number>(0);
  const [audiusTrackId, setTrackId] = useState<string>("");
  const [tracks, setTracks] = useState<AudiusTrackData[]>();
  const [inceptionDate, setInceptionDate] = useState<Date | null>(null);
  const [postCreate] = useMutation(POST_CREATE);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const Container = isTabletOrMobile ? MobileContainer : DesktopContainer;

  useEffect(() => {
    if (data?.me?.audiusUser) {
      const getTracks = async () => {
        const tracksResponse = await getAudius({}).getUserTracks({ userId: data.me.audiusUser.id });
        console.log({ tracksResponse });
        setTracks(tracksResponse.data.data);
      };
      getTracks();
    }
  }, [data]);

  const tracksToOptions = () => {
    if (tracks) {
      return tracks
        .sort((a, b) => {
          return new Date(a.release_date).valueOf() - new Date(b.release_date).valueOf();
        })
        .map((t) => ({ value: t.id, label: t.title }));
    }
    return [];
  };

  const disabled = story === "" || title === "" || audiusTrackId === "";

  return (
    <Container>
      <div>
        title:{" "}
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
      </div>
      <div>
        track ID:{" "}
        <input
          value={audiusTrackId}
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="Select track to set"
          disabled
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
        story:{" "}
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          style={{ height: "100%", width: "100%" }}
        />
        <div style={{ marginTop: "8px", marginBottom: "8px" }}>inception (optional)</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          date:{" "}
          <DatePicker selected={inceptionDate} onChange={(date: Date) => setInceptionDate(date)} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "8px" }}>
          soundcloud link to demo:{" "}
          <input value={inceptionDemo} onChange={(e) => setDemo(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            naked
            onClick={() => window.open("https://audius.co/upload")}
            style={{ marginRight: "8px", marginBottom: "8px", flexGrow: 1 }}
          >
            upload tracks
          </Button>
          <Button naked onClick={() => console.log()} style={{ marginBottom: "8px", flexGrow: 1 }}>
            refresh tracks
          </Button>
        </div>
        <Select
          activeValue={audiusTrackId}
          options={tracksToOptions()}
          onClick={(value) => setTrackId(value)}
        />
      </div>
      <div>
        completedness: <CompletednessSelector count={completedness} setCount={setCompletedness} />
      </div>
      <Button
        disabled={disabled}
        onClick={() => {
          console.log({
            title,
            story,
            completedness,
            audiusTrackId,
            inceptionDate,
          });
          postCreate({
            variables: {
              input: {
                title,
                story,
                completedness,
                audiusTrackId,
                inceptionDate,
                inceptionDemo,
              },
            },
          });
        }}
      >
        add
      </Button>
    </Container>
  );
};
