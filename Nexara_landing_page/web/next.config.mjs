/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Landing page ships with curated local imagery in /public/images.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Keep TypeScript type-checking on; skip ESLint in CI builds (code is hand-linted).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
