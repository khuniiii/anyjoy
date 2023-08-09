import { resolvers as scalarResolvers } from "graphql-scalars";

import { createAnimeInfo } from "./mutations/createAnimeInfo";

import { getAnimeList } from "./queries/animeList";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createAnimeInfo,
  },
  Query: {
    getAnimeList,
  },
};

export default resolvers;
