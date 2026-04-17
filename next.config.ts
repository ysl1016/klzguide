import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentlayer } from 'next-contentlayer2';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const LONG_CACHE = 'public, max-age=31536000, immutable';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Tree-shake per-import for large icon/UI libraries — reduces client JS.
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
    ],
  },
  async headers() {
    return [
      // Hash-named build assets — safe to cache forever.
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
      // App icons — change with manifest version.
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: LONG_CACHE }],
      },
      // Security headers applied site-wide.
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withContentlayer(withNextIntl(nextConfig));
