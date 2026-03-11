import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    '9003-firebase-studio-1766518736913.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev',
  ],
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
  }
};

export default nextConfig;
