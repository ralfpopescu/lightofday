import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CompletednessSelector } from "./CompletednessSelector";
import { Button } from "../../Button";
import { getAudius } from "../../../util/audius";
import { AudiusTrackData } from "../../../types/audius";
import { Select } from "../../Select";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 20px;
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
    }
  }
`;

export const PostCreate = () => {
  const { data, loading, error } = useQuery(ME);
  const [title, setTitle] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [completedness, setCompletedness] = useState<number>(0);
  const [audiusTrackId, setTrackId] = useState<string>("");
  const [tracks, setTracks] = useState<AudiusTrackData[]>();
  const [inceptionDate, setInceptionDate] = useState<string>("");
  const [postCreate, postCreateRequest] = useMutation(POST_CREATE);

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

  return (
    <Container>
      <Button
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
              },
            },
          });
        }}
      >
        add
      </Button>
      <div>
        title: <input value={story} onChange={(e) => setStory(e.target.value)} />
      </div>
      <div>
        completedness: <CompletednessSelector count={completedness} setCount={setCompletedness} />
      </div>
      <div>
        track: <input value={audiusTrackId} onChange={(e) => setTrackId(e.target.value)} />
      </div>
      <div>
        story: <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <Select options={tracksToOptions()} onClick={(value) => setTrackId(value)} />
    </Container>
  );
};
