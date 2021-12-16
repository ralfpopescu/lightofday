import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAudius } from "../../util/audius";
import { DebounceInput } from "react-debounce-input";
import { useMutation, gql, useQuery } from "@apollo/client";
import { AudiusUserData } from "../../types/audius";
import { Select } from "../Select";
import { Button } from "../Button";
import { Highlight } from "../Highlight";
import { Subheader } from "../Subheader";
import { Line } from "../Line";

const validateEmail = (email: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 16px;
`;

const ME = gql`
  query SetupMe {
    me {
      id
      email
      userName
      bio
      audiusUser {
        id
      }
    }
  }
`;

const USER_UPDATE = gql`
  mutation UserUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      id
      email
      userName
      bio
      audiusUser {
        id
      }
    }
  }
`;

const Section = styled.div`
  margin-top: 16px;
`;

type SetupProps = { isSetup?: boolean };

export const Setup = ({ isSetup = false }: SetupProps) => {
  const { data } = useQuery(ME);
  const [editMode, setEditMode] = useState<boolean>(isSetup);
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [response, setResponse] = useState<{ data: AudiusUserData[] }>();
  const [audiusUser, setAudiusUser] = useState<{ name: string; id: string }>();
  const [userUpdate] = useMutation(USER_UPDATE);

  useEffect(() => {
    if (data && data.me) {
      if (data.me.email) setEmail(data.me.email);
      if (data.me.bio) setBio(data.me.bio);
      if (data.me.userName) setUserName(data.me.userName);
      if (data.me.audiusUser) setAudiusUser({ id: data.me.audiusUser.id, name: "" });
    }
  }, [data]);

  useEffect(() => {
    console.log({ query });
    const getUsers = async () => {
      const resp = await getAudius({}).searchUsers({ query });
      console.log({ resp });
      setResponse(resp.data);
    };
    getUsers();
  }, [query]);

  const getOptions = () => {
    if (response?.data) {
      return response.data.map(({ name, id }) => ({ label: name, value: id })).slice(0, 5);
    }
    return [];
  };

  console.log(validateEmail(email));

  return (
    <Container>
      <Subheader>{isSetup ? `Let's get you set up.` : "You"}</Subheader>
      <Line />
      <Section>Email:</Section>
      {!data?.me?.email || editMode ? (
        <input value={email} onChange={(e: any) => setEmail(e.target.value)} name="email" />
      ) : (
        <Highlight>{email}</Highlight>
      )}
      <Section>Light of day username:</Section>
      {!data?.me?.userName || editMode ? (
        <input
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          name="username"
          autoComplete="none"
        />
      ) : (
        <Highlight>{userName}</Highlight>
      )}
      {(bio || editMode) && <Section>Bio:</Section>}
      {editMode ? (
        <textarea
          value={bio}
          onChange={(e: any) => setBio(e.target.value)}
          name="bio"
          autoComplete="none"
        />
      ) : (
        <>{bio && <Highlight>{bio}</Highlight>}</>
      )}
      <Section>Audius artist ID:</Section>
      {!data?.me?.audiusUser || editMode ? (
        <>
          {data?.me?.audiusUser && (
            <input
              value={audiusUser?.id}
              disabled
              placeholder="Search Audius artists to find your ID"
            />
          )}
          <Section style={{ display: "flex", marginBottom: "16px" }}>
            <div style={{ marginRight: "8px" }}>Search Audius artists:</div>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              name="audius-artist"
              autoComplete="none"
            />
          </Section>
          <Select
            options={getOptions()}
            onClick={(value, label) => setAudiusUser({ id: value, name: label })}
          />
        </>
      ) : (
        <Highlight>{audiusUser?.id}</Highlight>
      )}
      <ButtonRow>
        {editMode ? (
          <>
            <Button
              disabled={!validateEmail(email) || !audiusUser || userName === ""}
              onClick={async () => {
                console.log({ email, audiusUser });
                if (email && audiusUser && userName) {
                  await userUpdate({
                    variables: { input: { email, audiusUserId: audiusUser.id, userName } },
                  });
                  setEditMode(false);
                }
              }}
              style={{ marginTop: "12px" }}
            >
              save
            </Button>
            {!isSetup && (
              <Button
                naked
                onClick={() => {
                  setEditMode(false);
                }}
                style={{ marginTop: "12px" }}
              >
                cancel
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={() => {
              setEditMode(true);
            }}
            style={{ marginTop: "24px" }}
          >
            edit
          </Button>
        )}
      </ButtonRow>
    </Container>
  );
};
