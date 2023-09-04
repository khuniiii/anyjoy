import { CodegenConfig } from "@graphql-codegen/cli";

const graphqlEnv = {
  localhost: "graphql/**/*.graphql",
};

const generatesConverter = (graphqlEnv: {
  [domainName: string]: (string | undefined)[];
}) => {
  const generates: Record<string, unknown> = {};

  Object.keys(graphqlEnv).forEach(key => {
    generates[`.cache/__types__.ts`] = {
      documents: [`graphql/**/*.gql`],
      schema: graphqlEnv[key][0], // GraphQL API URL
      plugins: ["typescript"],
    };
  });

  Object.keys(graphqlEnv).forEach(key => {
    generates[`${key}/`] = {
      preset: "near-operation-file",
      documents: [`graphql/**/*.gql`],
      schema: graphqlEnv[key][0], // GraphQL API URL
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
