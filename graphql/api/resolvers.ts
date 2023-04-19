import { resolvers as scalarResolvers } from "graphql-scalars";

import { createHello } from "./mutations/createHello";
import { hello } from "./queries/hello";
import { getAnimeList } from "./queries/animeList";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createHello,
  },
  Query: {
    hello,
    getAnimeList,
  },
};

export default resolvers;
