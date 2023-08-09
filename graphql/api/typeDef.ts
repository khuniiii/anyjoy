import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createAnimeInfo from "./mutations/createAnimeInfo/typeDef.graphql";

import getAnimeList from "./queries/animeList/typeDef.graphql";
import getAnimeById from "./queries/getAnimeById/typeDef.graphql";

const mutationTypeDefs = [createAnimeInfo];

const queryTypeDefs = [getAnimeList, getAnimeById];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
