import { CodegenConfig } from "@graphql-codegen/cli";

type GraphqlEnv = Record<string, (string | undefined)[]>;

const graphqlEnv = {
  localhost: [process.env.NEXT_PUBLIC_GRAPHQL_URI],
  dev: [process.env.NEXT_PUBLIC_GRAPHQL_URI],
  main: [process.env.NEXT_PUBLIC_GRAPHQL_URI],
};

const generatesConverter = (graphqlEnv: GraphqlEnv) => {
  const generates: Record<string, unknown> = {};

  Object.keys(graphqlEnv).forEach(key => {
    generates[`.cache/__types__.ts`] = {
      documents: [`graphql/**/*.gql`],
      schema: graphqlEnv[key], // GraphQL API URL
      plugins: ["typescript"],
    };
  });

  Object.keys(graphqlEnv).forEach(key => {
    generates[`${key}/`] = {
      preset: "near-operation-file",
      documents: [`graphql/**/*.gql`],
      schema: graphqlEnv[key], // GraphQL API URL
      presetConfig: {
        baseTypesPath: `~.cache/__types__`,
        extension: ".graphql.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    };
  });

  return generates as CodegenConfig["generates"];
};

const config: CodegenConfig = {
  overwrite: true,
  generates: generatesConverter(graphqlEnv),
  config: {
    scalars: {
      Date: "string",
      Datetime: "string",
    },
    enumsAsTypes: true,
  },
};

export default config;
