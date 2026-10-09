/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;