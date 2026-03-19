'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, Crosshair, Bike, Star, ChevronRight } from 'lucide-react';
import type { Hero } from '@/types/hero';

const classIcons: Record<string, React.ElementType> = {
  assaulter: Shield,
  shooter: Crosshair,
  rider: Bike,
};

const factionColors: Record<string, string> = {
  bloodRose: 'text-red-400 bg-red-500/10 border-red-500/20',
  wingsOfDawn: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  guardOfOrder: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
};

interface HeroTierSnapshotProps {
  heroes: Hero[];
}

export function HeroTierSnapshot({ heroes }: HeroTierSnapshotProps) {
  const locale = useLocale() as 'ko' | 'vi';
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const topHeroes = heroes.filter((h) => h.tier === 'S+');

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          {isKorean ? 'S+ 티어 영웅' : 'Anh hùng S+'}
        </h2>
        <Link
          href={`/${locale}/heroes/tier-list`}
          className="text-sm text-highlight hover:underline flex items-center gap-1"
        >
          {isKorean ? '티어표 보기' : 'Xem bảng xếp hạng'}
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {topHeroes.map((hero) => {
          const ClassIcon = classIcons[hero.class];
          return (
            <Link
              key={hero.id}
              href={`/${locale}/heroes/${hero.id}`}
              className="shrink-0"
            >
              <div
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105 hover:shadow-lg w-[120px]',
                  factionColors[hero.faction]
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background">
                  <ClassIcon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-sm text-center leading-tight">
                  {hero.name[locale]}
                </span>
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
                  >
                    S+
                  </Badge>
                  {hero.season && (
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4 bg-highlight/10 text-highlight border-highlight/30"
                    >
                      {hero.season}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {t(`faction.${hero.faction}`)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
