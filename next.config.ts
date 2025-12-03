import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.snappshop.ir" }],
  },
};

export default nextConfig;
