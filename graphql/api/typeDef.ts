import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createAnimeInfo from "./mutations/createAnimeInfo/typeDef.graphql";
import createPost from "./mutations/createPost/typeDef.graphql";
import createComment from "./mutations/createComment/typeDef.graphql";
import deletePost from "./mutations/deletePost/typeDef.graphql";
import incrementView from "./mutations/incrementView/typeDef.graphql";

import getAnimeList from "./queries/animeList/typeDef.graphql";
import getAnimeByTitle from "./queries/getAnimeByTitle/typeDef.graphql";
import getCommentList from "./queries/getCommentList/typeDef.graphql";
import getPostByType from "./queries/getPostByType/typeDef.graphql";
import getOnePostById from "./queries/getOnePostById/typeDef.graphql";

const mutationTypeDefs = [
  createAnimeInfo,
  createPost,
  createComment,
  incrementView,
  deletePost,
];

const queryTypeDefs = [
  getAnimeList,
  getAnimeByTitle,
  getCommentList,
  getPostByType,
  getOnePostById,
];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
