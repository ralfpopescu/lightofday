import { useState, useEffect } from "react";
import styled from "styled-components";
import { getAudius } from "../../util/audius";
import { DebounceInput } from "react-debounce-input";
import { useMutation, gql } from "@apollo/client";
import { AudiusUserData } from "../../types/audius";
import { Select } from "../Select";
import { Button } from "../Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const USER_UPDATE = gql`
  mutation UserUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      id
      email
      audiusUser {
        id
      }
    }
  }
`;

export const Setup = () => {
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<{ data: AudiusUserData[] }>();
  const [selectedUser, setSelectedUser] = useState<{ name: string; id: string }>();
  const [userUpdate, userUpdateRequest] = useMutation(USER_UPDATE);

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

  return (
    <Container>
      <div>Let's get you set up.</div>
      <div>Email:</div>
      <input value={email} onChange={(e: any) => setEmail(e.target.value)} />
      <div>Audius artist:</div>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Select
        options={getOptions()}
        onClick={(value, label) => setSelectedUser({ id: value, name: label })}
      />
      {selectedUser && <div>{selectedUser.name}</div>}
      <Button
        onClick={() => {
          console.log({ email, selectedUser });
          if (email && selectedUser) {
            userUpdate({
              variables: { input: { email, audiusUserId: selectedUser.id } },
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
