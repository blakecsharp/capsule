import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloProvider, HttpLink } from "@apollo/client";
import * as serviceWorker from "./lib/serviceWorker";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:5000/capsule-1d048/us-central1/api",
});

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
