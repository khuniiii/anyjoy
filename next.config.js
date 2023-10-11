// eslint-disable-next-line
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["any-asset-khuniiii.s3.ap-northeast-2.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
    retmotePatterns: [
      {
        protocol: "https",
        hostname: "any-asset-khuniiii.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/next-s3-uploads/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
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
  https: process.env.VERCEL_ENV === "development" ? false : true,
};

module.exports = nextConfig;
