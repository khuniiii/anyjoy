import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import NextCors from "nextjs-cors";

import resolvers from "@/graphql/api/resolvers";
import typeDefs from "@/graphql/api/typeDef";
import { NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  allowBatchedHttpRequests: true,
  nodeEnv: "development",
});

const apolloServerHandler = startServerAndCreateNextHandler(server, {});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  apolloServerHandler(req, res);
}
export default handler;
