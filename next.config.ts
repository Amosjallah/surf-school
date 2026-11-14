import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Booking spots are read and written live. Do not enable cacheComponents:
  // it would cache availability and let two people take the last spot.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
