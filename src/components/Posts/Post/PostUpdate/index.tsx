import styled from "styled-components";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { CompletednessSelector } from "../../PostCreate/CompletednessSelector";
import { Button } from "../../../Button";
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

const POST_UPDATE = gql`
  mutation PostUpdate($input: PostUpdateInput!) {
    postUpdate(input: $input) {
      id
      completedness
      story
      title
      inceptionDate
      inceptionDemo
      user {
        id
        posts {
          id
          completedness
          story
          title
          inceptionDate
          inceptionDemo
        }
      }
    }
  }
`;

type PostUpdateProps = {
  post: {
    id: string;
    title: string;
    story: string;
    inceptionDemo?: string;
    inceptionDate?: Date;
    completedness: number;
  };
  editModeOff: () => void;
};

export const PostUpdate = ({ post, editModeOff }: PostUpdateProps) => {
  const [title, setTitle] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [inceptionDemo, setDemo] = useState<string>("");
  const [completedness, setCompletedness] = useState<number>(0);
  const [inceptionDate, setInceptionDate] = useState<Date | null>(null);
  const [postUpdate] = useMutation(POST_UPDATE);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const Container = isTabletOrMobile ? MobileContainer : DesktopContainer;

  useEffect(() => {
    setTitle(post.title);
    setStory(post.story);
    if (post.inceptionDemo) {
      setDemo(post.inceptionDemo);
    }
    if (post.inceptionDate) {
      setInceptionDate(new Date(post.inceptionDate));
    }
    setCompletedness(post.completedness);
  }, [post]);

  return (
    <Container>
      <div>
        title:{" "}
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
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
      <div>
        completedness: <CompletednessSelector count={completedness} setCount={setCompletedness} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <Button onClick={() => editModeOff()} naked style={{ flexGrow: 1 }}>
          cancel
        </Button>
        <Button
          style={{ flexGrow: 1 }}
          onClick={async () => {
            await postUpdate({
              variables: {
                input: {
                  id: post.id,
                  payload: {
                    title,
                    story,
                    completedness,
                    inceptionDate,
                    inceptionDemo,
                  },
                },
              },
            });
            editModeOff();
          }}
        >
          save
        </Button>
      </div>
    </Container>
  );
};
