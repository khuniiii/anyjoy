import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import { initializeApollo } from "@/graphql/apollo";
import { SessionProvider } from "next-auth/react";

const apolloClient = initializeApollo();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}
