import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Note: It's needed to add the following config to seamlessly use prisma with nextjs.
    // See: https://github.com/prisma/prisma/issues/21937#issuecomment-1986323872
    // @ts-expect-error - `externals` is not in the type definition for some reason.
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
  turbopack: {},
};

export default nextConfig;
