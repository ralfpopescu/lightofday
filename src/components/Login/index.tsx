import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useMutation, useQuery, gql } from "@apollo/client";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Button } from "../Button";
import { useNavigate } from "react-router";

const GET_NONCE = gql`
  query GetNonce {
    getNonce {
      nonce
      appSignedNonce
    }
  }
`;

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      isNew
    }
  }
`;

export const Login = ({ refetch }: { refetch: () => void }) => {
  const provider = useWeb3React<Web3Provider>();
  console.log({ provider });
  const { library, account } = provider;
  const navigate = useNavigate();

  const nonceRequest = useQuery(GET_NONCE);
  const [login, loginRequest] = useMutation(LOGIN);

  useEffect(() => {
    const getWeb3 = async () => {
      if (!library) {
        await provider.activate(new InjectedConnector({}));
      }
    };
    getWeb3();
  }, [library, provider]);

  useEffect(() => {
    if (loginRequest.data) {
      const { accessToken } = loginRequest.data.login;
      localStorage.setItem("token", accessToken);
      console.log("triggered");
      refetch();
    }
  }, [loginRequest.data, refetch]);

  return !localStorage.getItem("token") ? (
    <Button
      secondary
      onClick={async () => {
        if (provider.error) {
          window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          );
        }
        if (nonceRequest.data && library) {
          const { nonce, appSignedNonce } = nonceRequest.data.getNonce;
          const userSignedNonce = await library?.getSigner().signMessage(nonce);
          console.log({
            nonce,
            appSignedNonce,
            account,
            userSignedNonce,
            library,
            signer: library?.getSigner(),
          });
          login({
            variables: {
              input: { nonce, appSignedNonce, publicAddress: account, userSignedNonce },
            },
          });
        }
      }}
    >
      {!provider.error ? "login" : "get metamask"}
    </Button>
  ) : (
    <Button
      secondary
      onClick={async () => {
        localStorage.removeItem("token");
        refetch();
        nonceRequest.client.resetStore();
        console.log("refetcjed");
        navigate("/");
      }}
    >
      logout
    </Button>
  );
};
