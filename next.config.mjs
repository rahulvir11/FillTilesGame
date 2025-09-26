/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Performance optimizations
  swcMinify: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },

  // Asset optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Environment variables for production
  env: {
    GAME_VERSION: '1.0.0',
    BUILD_TIME: new Date().toISOString(),
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/game',
        destination: '/',
        permanent: true,
      },
      {
        source: '/play',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
