import { resolvers as scalarResolvers } from "graphql-scalars";

import { createAnimeInfo } from "./mutations/createAnimeInfo";
import { createUserInfo } from "./mutations/createUser";

import { getAnimeList } from "./queries/animeList";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createAnimeInfo,
    createUserInfo,
  },
  Query: {
    getAnimeList,
  },
};

export default resolvers;
