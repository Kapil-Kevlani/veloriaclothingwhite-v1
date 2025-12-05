/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'player.vimeo.com' }
    ],
    unoptimized: false, // Keep optimization enabled for better performance
  }
};

export default nextConfig;


