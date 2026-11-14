import type { NextConfig } from "next";
import path from "node:path";

// GitHub Pages serves a project repo under /<repo>; the deploy workflow passes that prefix in.
// Empty for a user site (<name>.github.io) and for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
