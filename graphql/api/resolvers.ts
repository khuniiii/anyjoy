import { resolvers as scalarResolvers } from "graphql-scalars";

import { createAnimeInfo } from "./mutations/createAnimeInfo";
import { createPost } from "./mutations/createPost";
import { deletePost } from "./mutations/deletePost";
import { incrementView } from "./mutations/incrementView";

import { getAnimeList } from "./queries/animeList";
import { getAnimeById } from "./queries/getAnimeById";
import { getPostByType } from "./queries/getPostByType";
import { getOnePostById } from "./queries/getOnePostById";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createAnimeInfo,
    createPost,
    deletePost,
    incrementView,
  },
  Query: {
    getAnimeList,
    getAnimeById,
    getPostByType,
    getOnePostById,
  },
};

export default resolvers;
