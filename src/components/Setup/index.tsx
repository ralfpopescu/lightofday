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

const validateEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ME = gql`
  query SetupMe {
    me {
      id
      email
      userName
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
      audiusUser {
        id
      }
    }
  }
`;

type SetupProps = { isSetup?: boolean };

export const Setup = ({ isSetup = false }: SetupProps) => {
  const { data } = useQuery(ME);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [response, setResponse] = useState<{ data: AudiusUserData[] }>();
  const [audiusUser, setAudiusUser] = useState<{ name: string; id: string }>();
  const [userUpdate, userUpdateRequest] = useMutation(USER_UPDATE);

  useEffect(() => {
    if (data && data.me) {
      if (data.me.email) setEmail(data.me.email);
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
      <div>Email:</div>
      {!data?.me?.email || editMode ? (
        <input value={email} onChange={(e: any) => setEmail(e.target.value)} name="email" />
      ) : (
        <Highlight>{email}</Highlight>
      )}
      <div>Light of day username:</div>
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
      <div>Audius artist ID:</div>
      {!data?.me?.audiusUser || editMode ? (
        <>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="audius-artist"
            autoComplete="none"
          />
          <Select
            options={getOptions()}
            onClick={(value, label) => setAudiusUser({ id: value, name: label })}
          />
        </>
      ) : (
        <Highlight>{audiusUser?.id}</Highlight>
      )}
      {editMode ? (
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
      ) : (
        <Button
          onClick={() => {
            setEditMode(true);
          }}
          style={{ marginTop: "12px" }}
        >
          edit
        </Button>
      )}
    </Container>
  );
};
