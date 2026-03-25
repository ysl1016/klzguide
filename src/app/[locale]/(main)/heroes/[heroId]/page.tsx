import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getAllHeroIds, getHeroById, getHeroSynergies } from '@/lib/heroes';
import { HeroDetail } from '@/components/content';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; heroId: string }>;
}

export async function generateStaticParams() {
  const heroIds = getAllHeroIds();
  const locales = ['ko', 'vi', 'en'];
  return locales.flatMap((locale) =>
    heroIds.map((heroId) => ({ locale, heroId }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, heroId } = await params;
  const hero = getHeroById(heroId);
  if (!hero) return { title: 'Hero Not Found' };

  const loc = locale as 'ko' | 'vi' | 'en';
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: `${hero.name[loc]} - ${hero.tier} ${l('영웅 가이드', 'Hướng dẫn anh hùng', 'Hero Guide')}`,
    description: hero.notes[loc],
  };
}

export default async function HeroDetailPage({ params }: PageProps) {
  const { locale, heroId } = await params;
  setRequestLocale(locale);

  const hero = getHeroById(heroId);
  if (!hero) {
    notFound();
  }

  const synergyHeroes = getHeroSynergies(heroId);

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <HeroDetail hero={hero} synergyHeroes={synergyHeroes} />
      </div>
    </div>
  );
}
