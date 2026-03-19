'use client';

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Shield,
  Crosshair,
  Bike,
  Users,
  Swords,
  AlertTriangle,
  Sparkles,
  Share2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Zap,
  Crown,
} from 'lucide-react';
import { getAllHeroes } from '@/lib/heroes';
import type { Hero } from '@/types/hero';

type SlotIndex = 0 | 1 | 2 | 3 | 4;

// Wrap in Suspense for useSearchParams
export default function TeamBuilderPage() {
  return (
    <Suspense fallback={<div className="py-8 px-4 lg:px-8"><div className="max-w-5xl mx-auto text-center text-muted-foreground py-12">Loading...</div></div>}>
      <TeamBuilderContent />
    </Suspense>
  );
}

const FACTION_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  bloodRose: { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' },
  wingsOfDawn: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30' },
  guardOfOrder: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30' },
};

const FACTION_NAMES: Record<string, { ko: string; vi: string }> = {
  bloodRose: { ko: '블러디 로즈', vi: 'Blood Rose' },
  wingsOfDawn: { ko: '새벽의 날개', vi: 'Wings of Dawn' },
  guardOfOrder: { ko: '질서의 수호자', vi: 'Guard of Order' },
};

const CLASS_ICONS: Record<string, React.ElementType> = {
  assaulter: Shield,
  shooter: Crosshair,
  rider: Bike,
};

const CLASS_NAMES: Record<string, { ko: string; vi: string }> = {
  assaulter: { ko: '돌격', vi: 'Assaulter' },
  shooter: { ko: '슈터', vi: 'Shooter' },
  rider: { ko: '라이더', vi: 'Rider' },
};

const ROLE_NAMES: Record<string, { ko: string; vi: string }> = {
  tank: { ko: '탱크', vi: 'Tank' },
  dps: { ko: 'DPS', vi: 'DPS' },
  support: { ko: '서포트', vi: 'Support' },
  gatherer: { ko: '채집', vi: 'Gatherer' },
};

const COUNTER_MAP: Record<string, { strong: string; weak: string }> = {
  wingsOfDawn: { strong: 'bloodRose', weak: 'guardOfOrder' },
  bloodRose: { strong: 'guardOfOrder', weak: 'wingsOfDawn' },
  guardOfOrder: { strong: 'wingsOfDawn', weak: 'bloodRose' },
};

const PRESETS: { key: string; label: { ko: string; vi: string }; ids: string[] }[] = [
  {
    key: 'meta',
    label: { ko: 'Meta (3WoD+2BR)', vi: 'Meta (3WoD+2BR)' },
    ids: ['queenie', 'liliana', 'alma', 'yu-chan', 'licia'],
  },
  {
    key: 'f2p',
    label: { ko: 'F2P', vi: 'F2P' },
    ids: ['laura', 'amelia', 'christina', 'sophia', 'miranda'],
  },
  {
    key: 'goo',
    label: { ko: '질서의 수호자', vi: 'Guard of Order' },
    ids: ['amber', 'dodemeki', 'harleyena', 'sakura', 'mia'],
  },
];

function TeamBuilderContent() {
  const locale = useLocale();
  const isKorean = locale === 'ko';
  const searchParams = useSearchParams();
  const router = useRouter();

  const allHeroes = useMemo(() => getAllHeroes(), []);

  const [slots, setSlots] = useState<(Hero | null)[]>([null, null, null, null, null]);
  const [activeSlot, setActiveSlot] = useState<SlotIndex | null>(null);
  const [filterFaction, setFilterFaction] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  // Load from URL on mount
  useEffect(() => {
    const heroIds = searchParams.get('team');
    if (heroIds) {
      const ids = heroIds.split(',');
      const loaded = ids.map((id) => allHeroes.find((h) => h.id === id) || null);
      while (loaded.length < 5) loaded.push(null);
      setSlots(loaded.slice(0, 5));
    }
  }, []);

  const updateURL = useCallback(
    (newSlots: (Hero | null)[]) => {
      const ids = newSlots.filter(Boolean).map((h) => h!.id);
      if (ids.length > 0) {
        const params = new URLSearchParams();
        params.set('team', ids.join(','));
        router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        router.replace('?', { scroll: false });
      }
    },
    [router]
  );

  const assignHero = (hero: Hero, slotIdx: SlotIndex) => {
    const newSlots = [...slots];
    // Remove hero if already in another slot
    const existingIdx = newSlots.findIndex((h) => h?.id === hero.id);
    if (existingIdx !== -1) newSlots[existingIdx] = null;
    newSlots[slotIdx] = hero;
    setSlots(newSlots);
    setActiveSlot(null);
    updateURL(newSlots);
  };

  const removeHero = (slotIdx: SlotIndex) => {
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
    updateURL(newSlots);
  };

  const loadPreset = (ids: string[]) => {
    const newSlots = ids.map((id) => allHeroes.find((h) => h.id === id) || null);
    setSlots(newSlots);
    setActiveSlot(null);
    updateURL(newSlots);
  };

  const resetTeam = () => {
    setSlots([null, null, null, null, null]);
    setActiveSlot(null);
    router.replace('?', { scroll: false });
  };

  const shareTeam = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Analysis
  const teamHeroes = slots.filter(Boolean) as Hero[];
  const factionCounts: Record<string, number> = {};
  teamHeroes.forEach((h) => {
    factionCounts[h.faction] = (factionCounts[h.faction] || 0) + 1;
  });

  const majorityFaction = Object.entries(factionCounts).sort((a, b) => b[1] - a[1])[0];
  const hasSynergyBonus = majorityFaction && majorityFaction[1] >= 3;
  const frontRow = [slots[0], slots[1]];
  const backRow = [slots[2], slots[3], slots[4]];
  const hasTankInFront = frontRow.some((h) => h?.role === 'tank');
  const uniqueFactions = Object.keys(factionCounts).length;
  const isMixedFaction = uniqueFactions > 2 && teamHeroes.length >= 3;

  // Filtered heroes for picker
  const filteredHeroes = useMemo(() => {
    const usedIds = new Set(slots.filter(Boolean).map((h) => h!.id));
    return allHeroes
      .filter((h) => {
        if (usedIds.has(h.id)) return false;
        if (filterFaction !== 'all' && h.faction !== filterFaction) return false;
        if (filterClass !== 'all' && h.class !== filterClass) return false;
        if (filterTier !== 'all' && h.tier !== filterTier) return false;
        return true;
      })
      .sort((a, b) => {
        const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];
        return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
      });
  }, [allHeroes, slots, filterFaction, filterClass, filterTier]);

  const renderSlot = (index: SlotIndex, label: string) => {
    const hero = slots[index];
    const isActive = activeSlot === index;

    return (
      <div key={index} className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <button
          onClick={() => setActiveSlot(isActive ? null : index)}
          className={cn(
            'relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 border-dashed transition-all duration-200',
            'flex flex-col items-center justify-center gap-1',
            hero
              ? cn(
                  'border-solid',
                  FACTION_COLORS[hero.faction].border,
                  FACTION_COLORS[hero.faction].bg
                )
              : 'border-border/50 bg-secondary/30 hover:border-border hover:bg-secondary/50',
            isActive && 'ring-2 ring-highlight ring-offset-2 ring-offset-background'
          )}
        >
          {hero ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeHero(index);
                }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 z-10"
              >
                <X className="w-3 h-3" />
              </button>
              {(() => {
                const Icon = CLASS_ICONS[hero.class];
                return <Icon className={cn('w-6 h-6', FACTION_COLORS[hero.faction].text)} />;
              })()}
              <span className={cn('text-sm font-bold', FACTION_COLORS[hero.faction].text)}>
                {hero.name[locale as 'ko' | 'vi']}
              </span>
              <Badge
                variant="outline"
                className={cn('text-[10px] px-1.5 py-0', FACTION_COLORS[hero.faction].text)}
              >
                {hero.tier}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                {ROLE_NAMES[hero.role][locale as 'ko' | 'vi']}
              </span>
            </>
          ) : (
            <>
              <Users className="w-8 h-8 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/60">
                {isKorean ? '선택' : 'Select'}
              </span>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {isKorean ? '팀 빌더' : 'Team Builder'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '5명의 영웅으로 팀을 구성하고 시너지와 상성을 분석합니다.'
              : 'Build a team of 5 heroes and analyze synergies and counters.'}
          </p>
        </div>

        {/* Presets & Actions */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <Button
              key={p.key}
              variant="outline"
              size="sm"
              onClick={() => loadPreset(p.ids)}
              className="gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              {p.label[locale as 'ko' | 'vi']}
            </Button>
          ))}
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={resetTeam} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            {isKorean ? '초기화' : 'Reset'}
          </Button>
          <Button variant="outline" size="sm" onClick={shareTeam} className="gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? (isKorean ? '복사됨!' : 'Copied!') : isKorean ? '공유' : 'Share'}
          </Button>
        </div>

        {/* Formation Grid */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Swords className="w-5 h-5 text-highlight" />
              {isKorean ? '진형 배치' : 'Formation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Front Row */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {isKorean ? '전열 (프론트라인)' : 'Front Row'}
                  </Badge>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="flex justify-center gap-4">
                  {renderSlot(0, isKorean ? '전열 1' : 'Front 1')}
                  {renderSlot(1, isKorean ? '전열 2' : 'Front 2')}
                </div>
              </div>

              {/* Back Row */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {isKorean ? '후열 (딜러)' : 'Back Row'}
                  </Badge>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="flex justify-center gap-4">
                  {renderSlot(2, isKorean ? '후열 1' : 'Back 1')}
                  {renderSlot(3, isKorean ? '후열 2' : 'Back 2')}
                  {renderSlot(4, isKorean ? '후열 3' : 'Back 3')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Picker (inline expandable) */}
        {activeSlot !== null && (
          <Card className="border-highlight/30 bg-card/50 animate-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {isKorean ? '영웅 선택' : 'Select Hero'} -{' '}
                  {activeSlot < 2
                    ? isKorean
                      ? `전열 ${activeSlot + 1}`
                      : `Front ${activeSlot + 1}`
                    : isKorean
                      ? `후열 ${activeSlot - 1}`
                      : `Back ${activeSlot - 1}`}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveSlot(null)}>
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 pt-2">
                <select
                  value={filterFaction}
                  onChange={(e) => setFilterFaction(e.target.value)}
                  className="text-sm bg-secondary/50 border border-border/50 rounded-md px-2 py-1.5 text-foreground"
                >
                  <option value="all">{isKorean ? '전체 진영' : 'All Factions'}</option>
                  {Object.entries(FACTION_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name[locale as 'ko' | 'vi']}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="text-sm bg-secondary/50 border border-border/50 rounded-md px-2 py-1.5 text-foreground"
                >
                  <option value="all">{isKorean ? '전체 클래스' : 'All Classes'}</option>
                  {Object.entries(CLASS_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name[locale as 'ko' | 'vi']}
                    </option>
                  ))}
                </select>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="text-sm bg-secondary/50 border border-border/50 rounded-md px-2 py-1.5 text-foreground"
                >
                  <option value="all">{isKorean ? '전체 티어' : 'All Tiers'}</option>
                  {['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {filteredHeroes.map((hero) => {
                  const Icon = CLASS_ICONS[hero.class];
                  const colors = FACTION_COLORS[hero.faction];
                  return (
                    <button
                      key={hero.id}
                      onClick={() => assignHero(hero, activeSlot)}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-150',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        colors.border,
                        colors.bg,
                        'hover:ring-1 hover:ring-highlight/50'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 shrink-0', colors.text)} />
                      <div className="flex flex-col items-start min-w-0">
                        <span className="text-sm font-medium truncate w-full">
                          {hero.name[locale as 'ko' | 'vi']}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {hero.tier} / {ROLE_NAMES[hero.role][locale as 'ko' | 'vi']}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filteredHeroes.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    {isKorean ? '조건에 맞는 영웅이 없습니다.' : 'No heroes match the filters.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {teamHeroes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Faction Breakdown */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-highlight" />
                  {isKorean ? '진영 분석' : 'Faction Analysis'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(factionCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([faction, count]) => {
                    const colors = FACTION_COLORS[faction];
                    const percentage = (count / teamHeroes.length) * 100;
                    return (
                      <div key={faction} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className={cn('font-medium', colors.text)}>
                            {FACTION_NAMES[faction][locale as 'ko' | 'vi']}
                          </span>
                          <span className="text-muted-foreground">
                            {count}/{teamHeroes.length}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-500', {
                              'bg-red-500': faction === 'bloodRose',
                              'bg-blue-500': faction === 'wingsOfDawn',
                              'bg-yellow-500': faction === 'guardOfOrder',
                            })}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}

                {/* Synergy Bonus */}
                {hasSynergyBonus && majorityFaction && (
                  <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <Zap className="w-4 h-4" />
                      {isKorean
                        ? `${FACTION_NAMES[majorityFaction[0]].ko} 시너지 활성! (${majorityFaction[1]}명)`
                        : `${FACTION_NAMES[majorityFaction[0]].vi} Synergy Active! (${majorityFaction[1]})`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isKorean
                        ? '동일 진영 3명 이상 시 숨겨진 보너스가 활성화됩니다.'
                        : 'Hidden bonus activates with 3+ heroes from the same faction.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Counter Analysis */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Swords className="w-4 h-4 text-highlight" />
                  {isKorean ? '상성 분석' : 'Counter Analysis'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {majorityFaction && COUNTER_MAP[majorityFaction[0]] && (
                  <>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-400 font-medium">
                          {isKorean ? '강함' : 'Strong'} vs
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            FACTION_COLORS[COUNTER_MAP[majorityFaction[0]].strong].text
                          )}
                        >
                          {
                            FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].strong][
                              locale as 'ko' | 'vi'
                            ]
                          }
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isKorean
                          ? `${FACTION_NAMES[majorityFaction[0]].ko}은(는) ${FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].strong].ko}에 유리합니다.`
                          : `${FACTION_NAMES[majorityFaction[0]].vi} has advantage against ${FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].strong].vi}.`}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-red-400 font-medium">
                          {isKorean ? '약함' : 'Weak'} vs
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            FACTION_COLORS[COUNTER_MAP[majorityFaction[0]].weak].text
                          )}
                        >
                          {
                            FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].weak][
                              locale as 'ko' | 'vi'
                            ]
                          }
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isKorean
                          ? `${FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].weak].ko}을(를) 상대하면 불리합니다.`
                          : `You are at a disadvantage against ${FACTION_NAMES[COUNTER_MAP[majorityFaction[0]].weak].vi}.`}
                      </p>
                    </div>
                  </>
                )}

                {teamHeroes.length > 0 && !majorityFaction && (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    {isKorean
                      ? '영웅을 더 추가하여 상성을 확인하세요.'
                      : 'Add more heroes to see counter analysis.'}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Warnings */}
            {(teamHeroes.length >= 2 && !hasTankInFront) || isMixedFaction ? (
              <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    {isKorean ? '경고' : 'Warnings'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {teamHeroes.length >= 2 && !hasTankInFront && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {isKorean
                          ? '전열에 탱크가 없습니다. 프론트라인에 탱크 역할 영웅을 배치하세요.'
                          : 'No tank in the front row. Place a tank-role hero in the frontline.'}
                      </span>
                    </div>
                  )}
                  {isMixedFaction && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {isKorean
                          ? '3개 이상의 진영이 혼합되어 있습니다. 숨겨진 진영 버프를 잃을 수 있습니다.'
                          : 'More than 2 factions mixed. You may lose hidden faction buffs.'}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}

            {/* Team Summary */}
            {teamHeroes.length === 5 && (
              <Card className="border-border/50 bg-card/50 md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-highlight" />
                    {isKorean ? '팀 요약' : 'Team Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-3">
                    {slots.map((hero, i) => {
                      if (!hero) return null;
                      const Icon = CLASS_ICONS[hero.class];
                      const colors = FACTION_COLORS[hero.faction];
                      return (
                        <div
                          key={hero.id}
                          className={cn(
                            'flex flex-col items-center gap-1 p-3 rounded-lg border text-center',
                            colors.border,
                            colors.bg
                          )}
                        >
                          <Icon className={cn('w-5 h-5', colors.text)} />
                          <span className="text-sm font-bold">
                            {hero.name[locale as 'ko' | 'vi']}
                          </span>
                          <Badge variant="outline" className={cn('text-[10px]', colors.text)}>
                            {hero.tier}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {CLASS_NAMES[hero.class][locale as 'ko' | 'vi']} /{' '}
                            {ROLE_NAMES[hero.role][locale as 'ko' | 'vi']}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                            {hero.notes[locale as 'ko' | 'vi']}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {teamHeroes.length === 0 && (
          <Card className="border-border/50 bg-secondary/20">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {isKorean
                  ? '슬롯을 클릭하여 영웅을 선택하거나, 위의 프리셋을 사용해보세요.'
                  : 'Click a slot to select heroes, or try a preset above.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
