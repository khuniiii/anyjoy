"use client";

import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";

import { initializeApollo } from "@/graphql/apollo";
import { OverlayProvider } from "@/components/common/hook/useOverlay";
import { NextAuthProvider } from "./provider";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const apolloClient = initializeApollo();
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          <OverlayProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </OverlayProvider>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
