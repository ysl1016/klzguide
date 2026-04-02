import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KLZ Guide - Last Z: Survival Shooter 공략',
    template: '%s | KLZ Guide',
  },
  description:
    '[KLZ] Alliance guide for Last Z: Survival Shooter - Korean/Vietnamese/English',
  keywords: [
    'Last Z',
    'Survival Shooter',
    '공략',
    '가이드',
    'guide',
    'KLZ',
    '연맹',
    'alliance',
    '한국어',
    '베트남어',
    'English',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KLZ Guide',
  },
  other: {
    'viewport': 'width=device-width, initial-scale=1, viewport-fit=cover',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
