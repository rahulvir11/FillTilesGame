/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
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
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              "media-src 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  },

  // Asset optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    gzipSize: true,
  },

  // Production-only optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Enable static optimization
    trailingSlash: false,
    
    // Asset optimization
    assetPrefix: process.env.ASSET_PREFIX || '',
    
    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        // Enable tree shaking
        config.optimization.usedExports = true;
        config.optimization.sideEffects = false;
        
        // Bundle analyzer (uncomment to analyze bundle size)
        // const BundleAnalyzer = require('@next/bundle-analyzer')({
        //   enabled: process.env.ANALYZE === 'true',
        // });
        // return BundleAnalyzer(config);
      }
      return config;
    },
  }),

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
