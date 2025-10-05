import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.parchment.com", "www.butte.edu", "edent.github.io"],
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
