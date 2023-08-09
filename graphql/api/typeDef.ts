import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createAnimeInfo from "./mutations/createAnimeInfo/typeDef.graphql";

import getAnimeList from "./queries/animeList/typeDef.graphql";

const mutationTypeDefs = [createAnimeInfo];

const queryTypeDefs = [getAnimeList];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
