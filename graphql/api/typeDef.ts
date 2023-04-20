import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

import createHello from "./mutations/createHello/typeDef.graphql";
import createAnimeInfo from "./mutations/createAnimeInfo/typeDef.graphql";
import hello from "./queries/hello/typeDef.graphql";
import getAnimeList from "./queries/animeList/typeDef.graphql";

const mutationTypeDefs = [createHello, createAnimeInfo];

const queryTypeDefs = [hello, getAnimeList];

export default mergeTypeDefs([
  ...scalarTypeDefs,
  ...mutationTypeDefs,
  ...queryTypeDefs,
]);
