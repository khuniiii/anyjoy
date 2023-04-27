import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createAnimeInfo from "./mutations/createAnimeInfo/typeDef.graphql";
import createUserInfo from "./mutations/createUser/typeDef.graphql";

import getAnimeList from "./queries/animeList/typeDef.graphql";
import login from "./queries/login/typeDef.graphql";

const mutationTypeDefs = [createAnimeInfo, createUserInfo];

const queryTypeDefs = [getAnimeList, login];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
