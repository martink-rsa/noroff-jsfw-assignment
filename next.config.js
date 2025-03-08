/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.noroff.dev',
        pathname: '/api/online-shop/**',
      },
    ],
  },
};

module.exports = nextConfig;
