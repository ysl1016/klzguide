'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Star, Shield, Crosshair, Bike } from 'lucide-react';
import type { Hero } from '@/types/hero';

const tierColors: Record<string, string> = {
  'S+': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  S: 'bg-red-500/20 text-red-400 border-red-500/30',
  'A+': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  A: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'B+': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  B: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  C: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const classIcons: Record<string, React.ElementType> = {
  assaulter: Shield,
  shooter: Crosshair,
  rider: Bike,
};

const factionColors: Record<string, string> = {
  bloodRose: 'text-red-400',
  wingsOfDawn: 'text-blue-400',
  guardOfOrder: 'text-yellow-400',
};

const factionBg: Record<string, string> = {
  bloodRose: 'bg-red-500/10 border-red-500/20',
  wingsOfDawn: 'bg-blue-500/10 border-blue-500/20',
  guardOfOrder: 'bg-yellow-500/10 border-yellow-500/20',
};

interface HeroCardProps {
  hero: Hero;
  compact?: boolean;
}

export function HeroCard({ hero, compact = false }: HeroCardProps) {
  const locale = useLocale() as 'ko' | 'vi';
  const t = useTranslations();
  const ClassIcon = classIcons[hero.class];

  if (compact) {
    return (
      <Link href={`/${locale}/heroes/${hero.id}`}>
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer',
            factionBg[hero.faction]
          )}
        >
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg bg-background',
              factionColors[hero.faction]
            )}
          >
            <ClassIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-medium text-sm truncate block">
              {hero.name[locale]}
            </span>
            <span className="text-xs text-muted-foreground">
              {t(`faction.${hero.faction}`)}
            </span>
          </div>
          <Badge variant="outline" className={cn('text-xs', tierColors[hero.tier])}>
            {hero.tier}
          </Badge>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${locale}/heroes/${hero.id}`}>
      <Card
        className={cn(
          'transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer border',
          factionBg[hero.faction]
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl bg-background shrink-0',
                factionColors[hero.faction]
              )}
            >
              <ClassIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{hero.name[locale]}</h3>
                {hero.recommended && (
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span>{t(`class.${hero.class}`)}</span>
                <span>•</span>
                <span>{t(`faction.${hero.faction}`)}</span>
                {hero.season && (
                  <>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4 bg-highlight/10 text-highlight border-highlight/30"
                    >
                      {hero.season}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {hero.notes[locale]}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn('shrink-0 text-sm', tierColors[hero.tier])}
            >
              {hero.tier}
            </Badge>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span>PvP: {hero.pvpTier}</span>
            <span>PvE: {hero.pveTier}</span>
            <span className="ml-auto">
              {locale === 'ko' ? '우선순위' : 'Ưu tiên'}: {'★'.repeat(hero.investmentPriority)}
              {'☆'.repeat(5 - hero.investmentPriority)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
