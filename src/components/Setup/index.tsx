import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAudius } from "../../util/audius";
import { DebounceInput } from "react-debounce-input";
import { useMutation, gql, useQuery } from "@apollo/client";
import { AudiusUserData } from "../../types/audius";
import { Select } from "../Select";
import { Button } from "../Button";

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

export const Setup = () => {
  const { data } = useQuery(ME);
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [response, setResponse] = useState<{ data: AudiusUserData[] }>();
  const [selectedUser, setSelectedUser] = useState<{ name: string; id: string }>();
  const [userUpdate, userUpdateRequest] = useMutation(USER_UPDATE);

  useEffect(() => {
    if (data && data.me) {
      if (data.me.email) setEmail(data.me.email);
      if (data.me.userName) setUserName(data.me.userName);
      if (data.me.audiusUser) setSelectedUser({ id: data.me.audiusUser.id, name: "" });
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
      <div>Let's get you set up.</div>
      <div>Email:</div>
      <input value={email} onChange={(e: any) => setEmail(e.target.value)} name="email" />
      <div>Light of day username:</div>
      <input
        value={userName}
        onChange={(e: any) => setUserName(e.target.value)}
        name="username"
        autoComplete="none"
      />
      <div>Audius artist:</div>
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
        onClick={(value, label) => setSelectedUser({ id: value, name: label })}
      />
      {selectedUser && <div>{selectedUser.id}</div>}
      <Button
        disabled={!validateEmail(email) || !selectedUser || userName === ""}
        onClick={() => {
          console.log({ email, selectedUser });
          if (email && selectedUser && userName) {
            userUpdate({
              variables: { input: { email, audiusUserId: selectedUser.id, userName } },
            });
          }
        }}
      >
        save
      </Button>
      {JSON.stringify(userUpdateRequest.data)}
    </Container>
  );
};
