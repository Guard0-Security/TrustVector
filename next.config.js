/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Note: Security headers should be configured at your hosting provider
  // (Vercel, Netlify, etc.) since they don't work with static export
};

module.exports = nextConfig;
