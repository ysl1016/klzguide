import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentlayer } from 'next-contentlayer2';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
    // Next.js already includes lucide-react in its default list, but we list
    // Radix packages explicitly to ensure per-module chunking.
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
};

export default withContentlayer(withNextIntl(nextConfig));
