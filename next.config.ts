// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- ADD THIS SECTION ---
  images: {
    domains: [
      'm.media-amazon.com', // <- ADD THIS HOSTNAME
      // If you added the scrollbar-hide plugin, you might have other config here
    ],
  },
  // -------------------------
};

module.exports = nextConfig;