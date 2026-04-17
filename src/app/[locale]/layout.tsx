import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Press_Start_2P, JetBrains_Mono, Noto_Sans_KR } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';

// Press_Start_2P: decorative display font, used only for English h1-h3.
// Disable preload — most users (ko/vi) never render it.
const pressStart2P = Press_Start_2P({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

// JetBrains_Mono: primary body font (globals.css `body { @apply font-mono }`).
// Must preload.
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
});

// Noto_Sans_KR: fallback for Korean glyphs. All four weights are in use
// (400 body, 500 medium, 700 bold, 800 for h1-h3 per globals.css line 151).
const notoSansKR = Noto_Sans_KR({
  variable: '--font-ko',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ko' | 'vi' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="KLZ Guide" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-title" content="KLZ Guide" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0E0E12" />

        {/* PWA Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
      </head>
      <body
        className={`${pressStart2P.variable} ${jetbrainsMono.variable} ${notoSansKR.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
