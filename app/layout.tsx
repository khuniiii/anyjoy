"use client";

import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";

import { initializeApollo } from "@/graphql/apollo";
import { OverlayProvider } from "@/components/common/hook/useOverlay";
import AuthContext from "./provider";
import { ServerStylesheet } from "@/lib/registry";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const apolloClient = initializeApollo();
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={apolloClient}>
          <ServerStylesheet>
            <AuthContext>
              <OverlayProvider>{children}</OverlayProvider>
            </AuthContext>
          </ServerStylesheet>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
