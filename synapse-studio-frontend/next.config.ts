import type { NextConfig } from "next";

/** 浏览器经同源路径转发时的真实后端（无末尾斜杠）。仅服务端读取，不写 NEXT_PUBLIC。 */
const apiProxyTarget =
  (process.env.API_PROXY_TARGET ?? "http://localhost:5000").replace(
    /\/+$/,
    "",
  );

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["three"],
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${apiProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
