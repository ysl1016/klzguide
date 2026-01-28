import { defineRouting } from 'next-intl/routing';

export const locales = ['ko', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'ko',
  localePrefix: 'always',
});
