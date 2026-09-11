import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://powderblue-dugong-794830.hostingersite.com/api/v1";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "powderblue-dugong-794830.hostingersite.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/manara-api/:path*",
        destination: `${API_URL.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
