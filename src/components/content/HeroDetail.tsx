'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Star,
  Shield,
  Crosshair,
  Bike,
  ArrowLeft,
  Users,
  Zap,
  Target,
  ChevronRight,
} from 'lucide-react';
import { SkillCard } from './SkillCard';
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

const factionBgGradient: Record<string, string> = {
  bloodRose: 'from-red-500/5 to-transparent',
  wingsOfDawn: 'from-blue-500/5 to-transparent',
  guardOfOrder: 'from-yellow-500/5 to-transparent',
};

interface HeroDetailProps {
  hero: Hero;
  synergyHeroes: Hero[];
}

type Tab = 'overview' | 'skills' | 'synergy';

export function HeroDetail({ hero, synergyHeroes }: HeroDetailProps) {
  const locale = useLocale() as 'ko' | 'vi' | 'en';
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale] ?? en);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const ClassIcon = classIcons[hero.class];

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: l('개요', 'Tổng quan', 'Overview') },
    { key: 'skills', label: l('스킬', 'Kỹ năng', 'Skills') },
    { key: 'synergy', label: l('시너지', 'Hiệp lực', 'Synergy') },
  ];

  const roleLabels: Record<string, { ko: string; vi: string; en: string }> = {
    tank: { ko: '탱커', vi: 'Đỡ đòn', en: 'Tank' },
    dps: { ko: '딜러', vi: 'Sát thương', en: 'DPS' },
    support: { ko: '서포터', vi: 'Hỗ trợ', en: 'Support' },
    gatherer: { ko: '채집', vi: 'Thu thập', en: 'Gatherer' },
  };

  return (
    <div className={cn('space-y-6', `bg-gradient-to-b ${factionBgGradient[hero.faction]}`)}>
      {/* Back + Header */}
      <div className="space-y-4">
        <Link href={`/${locale}/heroes/tier-list`}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            {l('티어표로 돌아가기', 'Quay lại bảng xếp hạng', 'Back to Tier List')}
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl bg-background border-2',
              factionColors[hero.faction],
              hero.tier === 'S+' ? 'border-fuchsia-500/50' : 'border-border'
            )}
          >
            <ClassIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{hero.name[locale]}</h1>
              <Badge variant="outline" className={cn('text-lg px-3', tierColors[hero.tier])}>
                {hero.tier}
              </Badge>
              {hero.recommended && (
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{t(`class.${hero.class}`)}</Badge>
              <Badge variant="secondary">{t(`faction.${hero.faction}`)}</Badge>
              <Badge variant="secondary">{roleLabels[hero.role]?.[locale] ?? hero.role}</Badge>
              {hero.season && (
                <Badge
                  variant="outline"
                  className="bg-highlight/10 text-highlight border-highlight/30"
                >
                  {hero.season}
                </Badge>
              )}
              {hero.f2pFriendly && (
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  F2P
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2',
              activeTab === tab.key
                ? 'border-highlight text-highlight'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <p className="text-muted-foreground">{hero.notes[locale]}</p>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">PvP</div>
                <Badge variant="outline" className={cn(tierColors[hero.pvpTier])}>
                  {hero.pvpTier}
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">PvE</div>
                <Badge variant="outline" className={cn(tierColors[hero.pveTier])}>
                  {hero.pveTier}
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {l('육성 우선순위', 'Ưu tiên', 'Priority')}
                </div>
                <div className="text-sm font-medium">
                  {'★'.repeat(hero.investmentPriority)}
                  {'☆'.repeat(5 - hero.investmentPriority)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {l('등급', 'Độ hiếm', 'Rarity')}
                </div>
                <div className="text-sm font-medium capitalize">{hero.rarity}</div>
              </CardContent>
            </Card>
          </div>

          {/* Obtain Method */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                {l('획득 방법', 'Cách nhận', 'How to Obtain')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{hero.obtainMethod[locale]}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-highlight" />
            <h2 className="font-semibold">
              {l('스킬 목록', 'Danh sách kỹ năng', 'Skill List')}
            </h2>
          </div>
          {hero.skills.map((skill, idx) => (
            <SkillCard key={idx} skill={skill} />
          ))}
        </div>
      )}

      {activeTab === 'synergy' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-highlight" />
            <h2 className="font-semibold">
              {l('시너지 영웅', 'Anh hùng hiệp lực', 'Synergy Heroes')}
            </h2>
          </div>
          {synergyHeroes.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {synergyHeroes.map((synHero) => {
                const SynIcon = classIcons[synHero.class];
                return (
                  <Link
                    key={synHero.id}
                    href={`/${locale}/heroes/${synHero.id}`}
                  >
                    <Card className="transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg bg-background',
                            factionColors[synHero.faction]
                          )}
                        >
                          <SynIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {synHero.name[locale]}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t(`faction.${synHero.faction}`)} • {synHero.tier}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {l('시너지 정보가 아직 없습니다.', 'Chưa có thông tin hiệp lực.', 'No synergy info available yet.')}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
