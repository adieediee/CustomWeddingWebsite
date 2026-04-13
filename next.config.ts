import type { NextConfig } from "next";

const anyIpv4HostPattern = "*.*.*.*";

const nextConfig: NextConfig = {
  allowedDevOrigins: [anyIpv4HostPattern],
  experimental: {
    serverActions: {
      allowedOrigins: [anyIpv4HostPattern],
    },
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
