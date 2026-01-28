'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  Star,
  Shield,
  Crosshair,
  Bike,
  Filter,
  Info,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Hero {
  id: string;
  name: { ko: string; vi: string; en: string };
  class: 'assaulter' | 'shooter' | 'rider';
  faction: 'bloodRose' | 'wingsOfDawn' | 'guardOfOrder';
  tier: string;
  rarity: string;
  role: string;
  season?: string | null;
  recommended: boolean;
  pvpTier: string;
  pveTier: string;
  notes?: { ko: string; vi: string };
}

interface TierListProps {
  heroes: Hero[];
}

// Tier order for sorting and display
const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];

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

export function TierList({ heroes }: TierListProps) {
  const t = useTranslations();
  const locale = useLocale() as 'ko' | 'vi';

  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [factionFilter, setFactionFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'tier' | 'name'>('tier');

  const filteredHeroes = useMemo(() => {
    let result = [...heroes];

    if (classFilter) {
      result = result.filter((h) => h.class === classFilter);
    }
    if (factionFilter) {
      result = result.filter((h) => h.faction === factionFilter);
    }
    if (tierFilter) {
      result = result.filter((h) => h.tier === tierFilter);
    }

    if (sortBy === 'tier') {
      result.sort(
        (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
      );
    } else {
      result.sort((a, b) => a.name[locale].localeCompare(b.name[locale]));
    }

    return result;
  }, [heroes, classFilter, factionFilter, tierFilter, sortBy, locale]);

  const groupedByTier = useMemo(() => {
    const groups: Record<string, Hero[]> = {};
    filteredHeroes.forEach((hero) => {
      if (!groups[hero.tier]) {
        groups[hero.tier] = [];
      }
      groups[hero.tier].push(hero);
    });
    return groups;
  }, [filteredHeroes]);

  const clearFilters = () => {
    setClassFilter(null);
    setFactionFilter(null);
    setTierFilter(null);
  };

  const hasFilters = classFilter || factionFilter || tierFilter;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />

            {/* Class Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {classFilter
                    ? t(`class.${classFilter}`)
                    : t('hero.allClasses')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setClassFilter(null)}>
                  {t('hero.allClasses')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setClassFilter('assaulter')}>
                  {t('class.assaulter')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setClassFilter('shooter')}>
                  {t('class.shooter')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setClassFilter('rider')}>
                  {t('class.rider')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Faction Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {factionFilter
                    ? t(`faction.${factionFilter}`)
                    : t('hero.allFactions')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFactionFilter(null)}>
                  {t('hero.allFactions')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFactionFilter('bloodRose')}>
                  {t('faction.bloodRose')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFactionFilter('wingsOfDawn')}
                >
                  {t('faction.wingsOfDawn')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFactionFilter('guardOfOrder')}
                >
                  {t('faction.guardOfOrder')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tier Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {tierFilter ? `Tier ${tierFilter}` : t('hero.allTiers')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTierFilter(null)}>
                  {t('hero.allTiers')}
                </DropdownMenuItem>
                {tierOrder.map((tier) => (
                  <DropdownMenuItem
                    key={tier}
                    onClick={() => setTierFilter(tier)}
                  >
                    Tier {tier}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {t('hero.sortBy')}:{' '}
                  {sortBy === 'tier'
                    ? t('hero.sortByTier')
                    : t('hero.sortByName')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('tier')}>
                  {t('hero.sortByTier')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  {t('hero.sortByName')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tier Groups */}
      <div className="space-y-6">
        {tierOrder.map((tier) => {
          const tierHeroes = groupedByTier[tier];
          if (!tierHeroes || tierHeroes.length === 0) return null;

          return (
            <Card key={tier}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn('text-lg px-3 py-1', tierColors[tier])}
                  >
                    {tier}
                  </Badge>
                  <span className="text-muted-foreground text-sm font-normal">
                    {tierHeroes.length}{' '}
                    {locale === 'ko' ? '명' : 'anh hùng'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <TooltipProvider>
                    {tierHeroes.map((hero) => {
                      const ClassIcon = classIcons[hero.class];
                      const hasNote = hero.notes && hero.notes[locale];
                      return (
                        <div
                          key={hero.id}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg border bg-secondary/30 transition-colors hover:bg-secondary/50',
                            hero.recommended && 'border-highlight/30'
                          )}
                        >
                          <div
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-lg bg-background',
                              factionColors[hero.faction]
                            )}
                          >
                            <ClassIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">
                                {hero.name[locale]}
                              </span>
                              {hero.recommended && (
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 shrink-0" />
                              )}
                              {hero.season && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] px-1.5 py-0 h-4 shrink-0 bg-highlight/10 text-highlight border-highlight/30"
                                >
                                  {hero.season}
                                </Badge>
                              )}
                              {hasNote && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help shrink-0" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="max-w-xs text-sm"
                                  >
                                    {hero.notes![locale]}
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{t(`class.${hero.class}`)}</span>
                              <span>•</span>
                              <span>{t(`faction.${hero.faction}`)}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-xs">
                            <span className="text-muted-foreground">
                              PvP: {hero.pvpTier}
                            </span>
                            <span className="text-muted-foreground">
                              PvE: {hero.pveTier}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHeroes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {locale === 'ko'
              ? '조건에 맞는 영웅이 없습니다.'
              : 'Không có anh hùng phù hợp với điều kiện.'}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
