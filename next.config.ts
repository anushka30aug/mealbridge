import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "*",
      },
      // Add more as needed
    ],
  },
};

export default nextConfig;
