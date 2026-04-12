import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { GoldBarStoreContent } from './GoldBarStoreContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: l('골드바 스토어 가이드', 'Hướng dẫn Cửa hàng Gold Bar', 'Gold Bar Store Guide'),
    description: l(
      'Last Z 공식 골드바 스토어 이용법, 충전 보너스, 리차지 이벤트 보상 총정리',
      'Hướng dẫn Cửa hàng Gold Bar chính thức Last Z - bonus nạp, phần thưởng mốc nạp',
      'Last Z official Gold Bar Store guide - recharge bonuses, milestone rewards, payment methods'
    ),
    openGraph: {
      title: l(
        '골드바 스토어 가이드 — KLZ Guide',
        'Hướng dẫn Cửa hàng Gold Bar — KLZ Guide',
        'Gold Bar Store Guide — KLZ Guide'
      ),
    },
  };
}

export default async function GoldBarStorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GoldBarStoreContent locale={locale} />;
}
