import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: [
      "www.parchment.com",
      "www.butte.edu",
      "edent.github.io",
      "github.com",
      // allow private user images from GitHubusercontent (used by some project images)
    ],
    // Or use remotePatterns if you prefer a pattern-based allow list:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'www.parchment.com',
    //     pathname: '/u/award/**',
    //   },
    // ],
  },
};

export default nextConfig;
