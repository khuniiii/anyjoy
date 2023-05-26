// eslint-disable-next-line
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["github-production-user-asset-6210df.s3.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
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

module.exports = nextConfig;
