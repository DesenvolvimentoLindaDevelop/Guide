import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "https://firebasestorage.googleapis.com",
      port: "",
      pathname: "/v0/b/guide-back.firebasestorage.app/o/**"
    }],
  },
};

export default nextConfig;
