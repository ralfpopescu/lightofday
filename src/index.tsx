import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "http://localhost:3002/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log("authlink", { token });
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  return library;
}

const GlobalStyle = styled.div`
  font-family: "Space Mono", monospace;
  font-size: 12px;
`;

ReactDOM.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Open+Sans+Condensed:wght@300&family=Oxygen&family=Space+Mono&family=Yanone+Kaffeesatz:wght@300&display=swap');
    </style>
    <Router>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <GlobalStyle>
              <App />
            </GlobalStyle>
          </Web3ReactProvider>
        </CookiesProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
