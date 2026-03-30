'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';
import { HeroCard } from '@/components/content';
import type { Hero } from '@/types/hero';

const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];

interface HeroDatabaseFilterProps {
  heroes: Hero[];
}

export function HeroDatabaseFilter({ heroes }: HeroDatabaseFilterProps) {
  const t = useTranslations();
  const locale = useLocale();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [factionFilter, setFactionFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [seasonFilter, setSeasonFilter] = useState<string | null>(null);

  const seasons = useMemo(() => {
    const set = new Set<string>();
    heroes.forEach((h) => { if (h.season) set.add(h.season); });
    return ['S1', 'S2', 'S3', 'S4', 'Purple', 'Blue'].filter((s) => set.has(s));
  }, [heroes]);

  const seasonLabel = (s: string) => {
    if (s === 'Purple') return l('보라등급', 'Hạng Tím', 'Purple Grade');
    if (s === 'Blue') return l('블루등급', 'Hạng Xanh', 'Blue Grade');
    return s;
  };

  const filteredHeroes = useMemo(() => {
    let result = [...heroes];
    if (classFilter) result = result.filter((h) => h.class === classFilter);
    if (factionFilter) result = result.filter((h) => h.faction === factionFilter);
    if (tierFilter) result = result.filter((h) => h.tier === tierFilter);
    if (seasonFilter) {
      if (seasonFilter === '_none') {
        result = result.filter((h) => !h.season);
      } else {
        result = result.filter((h) => h.season === seasonFilter);
      }
    }
    result.sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));
    return result;
  }, [heroes, classFilter, factionFilter, tierFilter, seasonFilter]);

  const hasFilters = classFilter || factionFilter || tierFilter || seasonFilter;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {classFilter ? t(`class.${classFilter}`) : t('hero.allClasses')}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {factionFilter ? t(`faction.${factionFilter}`) : t('hero.allFactions')}
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
                <DropdownMenuItem onClick={() => setFactionFilter('wingsOfDawn')}>
                  {t('faction.wingsOfDawn')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFactionFilter('guardOfOrder')}>
                  {t('faction.guardOfOrder')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                  <DropdownMenuItem key={tier} onClick={() => setTierFilter(tier)}>
                    Tier {tier}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {seasonFilter
                    ? seasonFilter === '_none'
                      ? l('시즌 없음', 'Không mùa', 'No Season')
                      : seasonLabel(seasonFilter)
                    : l('전체 시즌', 'Tất cả mùa', 'All Seasons')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSeasonFilter(null)}>
                  {l('전체 시즌', 'Tất cả mùa', 'All Seasons')}
                </DropdownMenuItem>
                {seasons.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => setSeasonFilter(s)}>
                    {seasonLabel(s)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setSeasonFilter('_none')}>
                  {l('시즌 없음 (기본)', 'Không mùa (mặc định)', 'No Season (Base)')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setClassFilter(null);
                  setFactionFilter(null);
                  setTierFilter(null);
                  setSeasonFilter(null);
                }}
                className="text-muted-foreground"
              >
                {l('초기화', 'Xóa bộ lọc', 'Clear')}
              </Button>
            )}

            <span className="ml-auto text-sm text-muted-foreground">
              {filteredHeroes.length}{l('명', ' anh hùng', ' heroes')}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Hero Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>

      {filteredHeroes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {l(
              '조건에 맞는 영웅이 없습니다.',
              'Không có anh hùng phù hợp với điều kiện.',
              'No heroes match the selected filters.'
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
