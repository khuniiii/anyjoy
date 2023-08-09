import { resolvers as scalarResolvers } from "graphql-scalars";

import { createAnimeInfo } from "./mutations/createAnimeInfo";

import { getAnimeList } from "./queries/animeList";
import { getAnimeById } from "./queries/getAnimeById";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createAnimeInfo,
  },
  Query: {
    getAnimeList,
    getAnimeById,
  },
};

export default resolvers;
