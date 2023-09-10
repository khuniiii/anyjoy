import { resolvers as scalarResolvers } from "graphql-scalars";

import { createAnimeInfo } from "./mutations/createAnimeInfo";
import { createPost } from "./mutations/createPost";
import { createComment } from "./mutations/createComment";
import { deletePost } from "./mutations/deletePost";
import { incrementView } from "./mutations/incrementView";

import { getAnimeList } from "./queries/animeList";
import { getAnimeByTitle } from "./queries/getAnimeByTitle";
import { getCommentList } from "./queries/getCommentList";
import { getPostByType } from "./queries/getPostByType";
import { getOnePostById } from "./queries/getOnePostById";

const resolvers = {
  ...scalarResolvers,
  Mutation: {
    createAnimeInfo,
    createPost,
    createComment,
    deletePost,
    incrementView,
  },
  Query: {
    getAnimeList,
    getAnimeByTitle,
    getCommentList,
    getPostByType,
    getOnePostById,
  },
};

export default resolvers;
