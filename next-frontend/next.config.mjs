/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during the build
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during the build
  },
};

export default nextConfig;
