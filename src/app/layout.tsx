import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KLZ Guide - Last Z: Survival Shooter 공략',
    template: '%s | KLZ Guide',
  },
  description:
    '[KLZ] 연맹원들을 위한 Last Z: Survival Shooter 한국어/베트남어 공략 사이트',
  keywords: [
    'Last Z',
    'Survival Shooter',
    '공략',
    '가이드',
    'KLZ',
    '연맹',
    '한국어',
    '베트남어',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
