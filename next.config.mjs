/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "*"],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
