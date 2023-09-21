import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { from } from "@apollo/client/link/core";
import { onError } from "@apollo/client/link/error";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import fetch from "cross-fetch";
import merge from "deepmerge";
import { useMemo } from "react";

const batchHttpLink = new BatchHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  batchMax: 5,
  batchInterval: 20,
  fetch,
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  fetch,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    if (graphQLErrors) {
      for (const { extensions } of graphQLErrors) {
        switch (extensions.code) {
          case "401": {
          }
        }
      }
    }
  },
);

const createApolloClient = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "test")
    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
    });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, batchHttpLink]),
    cache: new InMemoryCache(),
  });
};

type Apollo = ReturnType<typeof createApolloClient>;

let apolloClient: Apollo;
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export const initializeApollo = (initialState = null): Apollo => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (apolloClient !== null) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initialState: any): Apollo => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};
