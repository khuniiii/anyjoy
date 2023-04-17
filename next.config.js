import { i18n } from "./next-i18next.config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    config.experiments.topLevelAwait = true;

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: "graphql-tag/loader" }],
    });

    return config;
  },
};

export default nextConfig;
