import type { NextConfig } from "next";
import os from "os";

const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips: string[] = ["localhost", "127.0.0.1"];
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const net of iface) {
        if ((net.family === "IPv4" || (net.family as any) === 4) && !net.internal) {
          ips.push(net.address);
        }
      }
    }
  }
  return ips;
};

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
  allowedDevOrigins: getLocalIPs(),
};

export default nextConfig;
