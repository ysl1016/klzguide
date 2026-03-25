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
  ChevronUp,
  Check,
  X,
  Zap,
  Crown,
  Save,
  FolderOpen,
  Trash2,
  Target,
  Heart,
  TrendingUp,
  Link2,
  Info,
  Star,
  CircuitBoard,
} from 'lucide-react';
import { getAllHeroes } from '@/lib/heroes';
import type { Hero } from '@/types/hero';
import {
  analyzeTeam,
  getSavedTeams,
  saveTeam,
  deleteSavedTeam,
  type SavedTeam,
  type TeamAnalysis,
} from '@/lib/team-analysis';

type SlotIndex = 0 | 1 | 2 | 3 | 4;

export default function TeamBuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto text-center text-muted-foreground py-12">
            Loading...
          </div>
        </div>
      }
    >
      <TeamBuilderContent />
    </Suspense>
  );
}

const FACTION_COLORS: Record<string, { text: string; bg: string; border: string; bar: string }> = {
  bloodRose: { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', bar: 'bg-red-500' },
  wingsOfDawn: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30', bar: 'bg-blue-500' },
  guardOfOrder: { text: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', bar: 'bg-yellow-500' },
};

const FACTION_NAMES: Record<string, { ko: string; vi: string; en: string }> = {
  bloodRose: { ko: '블러디 로즈', vi: 'Blood Rose', en: 'Blood Rose' },
  wingsOfDawn: { ko: '새벽의 날개', vi: 'Wings of Dawn', en: 'Dawn Wings' },
  guardOfOrder: { ko: '질서의 수호자', vi: 'Guard of Order', en: 'Order Keepers' },
};

const CLASS_ICONS: Record<string, React.ElementType> = {
  assaulter: Shield,
  shooter: Crosshair,
  rider: Bike,
};

const CLASS_NAMES: Record<string, { ko: string; vi: string; en: string }> = {
  assaulter: { ko: '돌격', vi: 'Assaulter', en: 'Assaulter' },
  shooter: { ko: '슈터', vi: 'Shooter', en: 'Shooter' },
  rider: { ko: '라이더', vi: 'Rider', en: 'Rider' },
};

const ROLE_NAMES: Record<string, { ko: string; vi: string; en: string }> = {
  tank: { ko: '탱크', vi: 'Tank', en: 'Tank' },
  dps: { ko: 'DPS', vi: 'DPS', en: 'DPS' },
  support: { ko: '서포트', vi: 'Support', en: 'Support' },
  gatherer: { ko: '채집', vi: 'Gatherer', en: 'Gatherer' },
};

const PRESETS: { key: string; label: { ko: string; vi: string; en: string }; ids: string[]; desc: { ko: string; vi: string; en: string } }[] = [
  {
    key: 'meta-wod',
    label: { ko: 'Meta PvP (WoD)', vi: 'Meta PvP (WoD)', en: 'Meta PvP (WoD)' },
    ids: ['queenie', 'liliana', 'alma', 'laura', 'scarlett'],
    desc: { ko: '순수 새벽의 날개', vi: 'Pure Wings of Dawn', en: 'Pure Dawn Wings' },
  },
  {
    key: 'meta-mix',
    label: { ko: 'Meta (3+2)', vi: 'Meta (3+2)', en: 'Meta (3+2)' },
    ids: ['queenie', 'liliana', 'alma', 'yu-chan', 'licia'],
    desc: { ko: 'WoD+BR 혼합', vi: 'WoD+BR Mix', en: 'WoD+BR Mix' },
  },
  {
    key: 'br-rush',
    label: { ko: 'BR 풀 공격', vi: 'BR Full Attack', en: 'BR Full Attack' },
    ids: ['yu-chan', 'licia', 'bella', 'selena', 'oliveira'],
    desc: { ko: '순수 블러디 로즈', vi: 'Pure Blood Rose', en: 'Pure Blood Rose' },
  },
  {
    key: 'goo',
    label: { ko: '질서의 수호자', vi: 'Guard of Order', en: 'Order Keepers' },
    ids: ['amber', 'dodemeki', 'harleyena', 'sakura', 'mia'],
    desc: { ko: '순수 GoO', vi: 'Pure GoO', en: 'Pure GoO' },
  },
  {
    key: 'f2p',
    label: { ko: 'F2P 초반', vi: 'F2P Early', en: 'F2P Early' },
    ids: ['laura', 'amelia', 'christina', 'sophia', 'miranda'],
    desc: { ko: '무과금 초반', vi: 'F2P Early Game', en: 'F2P Early Game' },
  },
  {
    key: 'event',
    label: { ko: '이벤트용', vi: 'Event', en: 'Event' },
    ids: ['sophia', 'katrina', 'chinatsu', 'laura', 'amelia'],
    desc: { ko: 'Big Six 기반', vi: 'Big Six Based', en: 'Big Six Based' },
  },
  {
    key: 'defense',
    label: { ko: '방어용', vi: 'Defense', en: 'Defense' },
    ids: ['laura', 'harleyena', 'mia', 'queenie', 'liliana'],
    desc: { ko: '탱커 중심 디펜스', vi: 'Tank-focused Defense', en: 'Tank-focused Defense' },
  },
];

function TeamBuilderContent() {
  const locale = useLocale();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const localeKey = (locale === 'ko' || locale === 'vi') ? locale : 'en';
  const searchParams = useSearchParams();
  const router = useRouter();

  const allHeroes = useMemo(() => getAllHeroes(), []);

  const [slots, setSlots] = useState<(Hero | null)[]>([null, null, null, null, null]);
  const [activeSlot, setActiveSlot] = useState<SlotIndex | null>(null);
  const [filterFaction, setFilterFaction] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTeamName, setSaveTeamName] = useState('');
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  // Load saved teams from localStorage
  useEffect(() => {
    setSavedTeams(getSavedTeams());
  }, []);

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

  const handleSaveTeam = () => {
    if (!saveTeamName.trim()) return;
    const ids = slots.filter(Boolean).map((h) => h!.id);
    if (ids.length === 0) return;
    const updated = saveTeam(saveTeamName.trim(), ids);
    setSavedTeams(updated);
    setShowSaveDialog(false);
    setSaveTeamName('');
  };

  const handleLoadTeam = (team: SavedTeam) => {
    const newSlots = team.heroIds.map((id) => allHeroes.find((h) => h.id === id) || null);
    while (newSlots.length < 5) newSlots.push(null);
    setSlots(newSlots.slice(0, 5));
    setActiveSlot(null);
    updateURL(newSlots);
    setShowLoadDialog(false);
  };

  const handleDeleteTeam = (name: string) => {
    const updated = deleteSavedTeam(name);
    setSavedTeams(updated);
  };

  // Analysis
  const teamHeroes = slots.filter(Boolean) as Hero[];
  const analysis = useMemo(() => analyzeTeam(slots, allHeroes), [slots, allHeroes]);

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

  const heroName = (hero: Hero) => {
    if (locale === 'ko') return hero.name.ko;
    if (locale === 'vi') return hero.name.vi;
    return hero.name.en ?? hero.name.ko;
  };

  const renderSlot = (index: SlotIndex, label: string, roleHint: string) => {
    const hero = slots[index];
    const isActive = activeSlot === index;

    return (
      <div key={index} className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <button
          onClick={() => setActiveSlot(isActive ? null : index)}
          className={cn(
            'relative w-24 h-32 sm:w-28 sm:h-36 rounded-xl border-2 border-dashed transition-all duration-200',
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
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  removeHero(index);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    removeHero(index);
                  }
                }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/80 z-10 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
              {(() => {
                const Icon = CLASS_ICONS[hero.class];
                return <Icon className={cn('w-5 h-5', FACTION_COLORS[hero.faction].text)} />;
              })()}
              <span className={cn('text-sm font-bold leading-tight text-center', FACTION_COLORS[hero.faction].text)}>
                {heroName(hero)}
              </span>
              <Badge
                variant="outline"
                className={cn('text-[10px] px-1.5 py-0', FACTION_COLORS[hero.faction].text)}
              >
                {hero.tier}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                {ROLE_NAMES[hero.role][localeKey]}
              </span>
              {/* Key skill one-liner */}
              {hero.skills[1] && (
                <span className="text-[9px] text-muted-foreground/70 leading-tight text-center px-1 line-clamp-1">
                  {locale === 'ko' ? hero.skills[1].name.ko : locale === 'vi' ? hero.skills[1].name.vi : (hero.skills[1].name.en ?? hero.skills[1].name.ko)}
                </span>
              )}
            </>
          ) : (
            <>
              <Users className="w-7 h-7 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/60">
                {l('선택', 'Select', 'Select')}
              </span>
              <span className="text-[9px] text-muted-foreground/40">{roleHint}</span>
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
            {l('팀 빌더', 'Team Builder', 'Team Builder')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '5명의 영웅으로 팀을 구성하고 진영 보너스, 시즌 시너지, 상성을 분석합니다.',
              'Build a team of 5 heroes and analyze faction bonuses, season synergies, and matchups.',
              'Build a team of 5 heroes and analyze faction bonuses, season synergies, and matchups.'
            )}
          </p>
        </div>

        {/* Presets */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Crown className="w-4 h-4 text-highlight" />
              {l('프리셋 팀', 'Preset Teams', 'Preset Teams')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => loadPreset(p.ids)}
                  className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors text-left"
                >
                  <span className="text-sm font-medium">{p.label[localeKey]}</span>
                  <span className="text-[10px] text-muted-foreground">{p.desc[localeKey]}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Row */}
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={resetTeam} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            {l('초기화', 'Reset', 'Reset')}
          </Button>
          <Button variant="outline" size="sm" onClick={shareTeam} className="gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? l('복사됨!', 'Copied!', 'Copied!') : l('공유', 'Share', 'Share')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSaveTeamName('');
              setShowSaveDialog(true);
            }}
            disabled={teamHeroes.length === 0}
            className="gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            {l('저장', 'Save', 'Save')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLoadDialog(true)}
            disabled={savedTeams.length === 0}
            className="gap-1.5"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            {l('불러오기', 'Load', 'Load')}
            {savedTeams.length > 0 && (
              <span className="text-[10px] bg-highlight/20 text-highlight px-1.5 rounded-full">
                {savedTeams.length}
              </span>
            )}
          </Button>
        </div>

        {/* Save Dialog */}
        {showSaveDialog && (
          <Card className="border-highlight/30 bg-card/50 animate-in slide-in-from-top-2 duration-200">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={saveTeamName}
                  onChange={(e) => setSaveTeamName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTeam()}
                  placeholder={l('팀 이름 입력...', 'Enter team name...', 'Enter team name...')}
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                  maxLength={20}
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveTeam} disabled={!saveTeamName.trim()}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowSaveDialog(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load Dialog */}
        {showLoadDialog && (
          <Card className="border-highlight/30 bg-card/50 animate-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {l('저장된 팀', 'Saved Teams', 'Saved Teams')}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowLoadDialog(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedTeams.map((team) => (
                <div
                  key={team.name}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/20"
                >
                  <button
                    onClick={() => handleLoadTeam(team)}
                    className="flex-1 text-left"
                  >
                    <div className="text-sm font-medium">{team.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {team.heroIds
                        .map((id) => {
                          const h = allHeroes.find((hero) => hero.id === id);
                          return h ? heroName(h) : id;
                        })
                        .join(', ')}
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTeam(team.name)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Formation Grid */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Swords className="w-5 h-5 text-highlight" />
              {l('진형 배치', 'Formation', 'Formation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Front Row */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {l('전열 (프론트라인)', 'Front Row', 'Front Row')}
                  </Badge>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="flex justify-center gap-4">
                  {renderSlot(0, l('전열 1', 'Front 1', 'Front 1'), l('탱커 추천', 'Tank', 'Tank'))}
                  {renderSlot(1, l('전열 2', 'Front 2', 'Front 2'), l('탱커 추천', 'Tank', 'Tank'))}
                </div>
              </div>

              {/* Back Row */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {l('후열 (딜러)', 'Back Row', 'Back Row')}
                  </Badge>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="flex justify-center gap-4">
                  {renderSlot(2, l('후열 1', 'Back 1', 'Back 1'), l('DPS 추천', 'DPS', 'DPS'))}
                  {renderSlot(3, l('후열 2', 'Back 2', 'Back 2'), l('DPS 추천', 'DPS', 'DPS'))}
                  {renderSlot(4, l('후열 3', 'Back 3', 'Back 3'), l('DPS 추천', 'DPS', 'DPS'))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Picker */}
        {activeSlot !== null && (
          <Card className="border-highlight/30 bg-card/50 animate-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {l('영웅 선택', 'Select Hero', 'Select Hero')} -{' '}
                  {activeSlot < 2
                    ? l(`전열 ${activeSlot + 1}`, `Front ${activeSlot + 1}`, `Front ${activeSlot + 1}`)
                    : l(`후열 ${activeSlot - 1}`, `Back ${activeSlot - 1}`, `Back ${activeSlot - 1}`)}
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
                  <option value="all">{l('전체 진영', 'All Factions', 'All Factions')}</option>
                  {Object.entries(FACTION_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name[localeKey]}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="text-sm bg-secondary/50 border border-border/50 rounded-md px-2 py-1.5 text-foreground"
                >
                  <option value="all">{l('전체 클래스', 'All Classes', 'All Classes')}</option>
                  {Object.entries(CLASS_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name[localeKey]}
                    </option>
                  ))}
                </select>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="text-sm bg-secondary/50 border border-border/50 rounded-md px-2 py-1.5 text-foreground"
                >
                  <option value="all">{l('전체 티어', 'All Tiers', 'All Tiers')}</option>
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
                  // Check if hero has synergy with current team
                  const hasSynergyWithTeam = teamHeroes.some(
                    (th) => th.synergies.includes(hero.id) || hero.synergies.includes(th.id)
                  );
                  return (
                    <button
                      key={hero.id}
                      onClick={() => assignHero(hero, activeSlot)}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-150',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        colors.border,
                        colors.bg,
                        'hover:ring-1 hover:ring-highlight/50',
                        hasSynergyWithTeam && 'ring-1 ring-green-500/50'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 shrink-0', colors.text)} />
                      <div className="flex flex-col items-start min-w-0">
                        <span className="text-sm font-medium truncate w-full">
                          {heroName(hero)}
                          {hasSynergyWithTeam && (
                            <Link2 className="w-3 h-3 inline ml-1 text-green-400" />
                          )}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {hero.tier} / {ROLE_NAMES[hero.role][localeKey]}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filteredHeroes.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    {l('조건에 맞는 영웅이 없습니다.', 'No heroes match the filters.', 'No heroes match the filters.')}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {teamHeroes.length > 0 && (
          <div className="space-y-4">
            {/* Overall Score */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-highlight" />
                  {l('종합 팀 점수', 'Overall Team Score', 'Overall Team Score')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  {/* Score circle */}
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary/50"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(analysis.overallScore / 100) * 264} 264`}
                        className={cn(
                          analysis.overallScore >= 70
                            ? 'text-green-500'
                            : analysis.overallScore >= 40
                              ? 'text-yellow-500'
                              : 'text-red-500'
                        )}
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{analysis.overallScore}</span>
                    </div>
                  </div>

                  {/* Sub scores */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <ScoreBar
                      label={l('시너지', 'Synergy', 'Synergy')}
                      value={Math.min(100, Math.round(
                        (analysis.factionBonuses[0]?.heroCount || 0) / Math.max(teamHeroes.length, 1) * 40 +
                        analysis.seasonSynergies.filter((s) => s.active).length * 10 +
                        Math.min(analysis.heroSynergies.length * 5, 20)
                      ))}
                    />
                    <ScoreBar
                      label={l('상성', 'Counter', 'Counter')}
                      value={Math.min(100, Math.max(0, Math.round(
                        50 + analysis.counterAnalysis.factionScores
                          .reduce((sum, f) => sum + (f.score > 0 ? f.score : f.score * 0.5), 0)
                      )))}
                    />
                    <ScoreBar
                      label={l('역할 밸런스', 'Role Balance', 'Role Balance')}
                      value={analysis.roleBalance.score}
                    />
                    <ScoreBar
                      label={l('진영 보너스', 'Faction Bonus', 'Faction Bonus')}
                      value={
                        analysis.factionBonuses.length === 1
                          ? 100
                          : analysis.factionBonuses.length === 2
                            ? 60
                            : 20
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Faction Placement Bonus */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-highlight" />
                    {l('진영 배치 보너스', 'Faction Placement Bonus', 'Faction Placement Bonus')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.factionBonuses.map((fb) => {
                    const colors = FACTION_COLORS[fb.faction];
                    return (
                      <div key={fb.faction} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={cn('font-medium', colors.text)}>
                            {FACTION_NAMES[fb.faction][localeKey]}
                          </span>
                          <span className="text-muted-foreground">
                            {fb.heroCount}/5
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-500', colors.bar)}
                            style={{ width: `${(fb.heroCount / 5) * 100}%` }}
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground pl-2 border-l-2 border-border/30">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3 h-3" />
                            <span>
                              {l('공격력/방어력', 'ATK/DEF', 'ATK/DEF')}: <span className={cn('font-medium', colors.text)}>+{fb.atkDefBonus}%</span>
                              {' '}({fb.heroCount}&times;5%)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3 h-3" />
                            <span>
                              {l('정원 보너스', 'Capacity', 'Capacity')}:{' '}
                              {fb.isFull ? (
                                <span className="text-green-400 font-medium">+10% {l('활성', 'Active', 'Active')}</span>
                              ) : (
                                <span className="text-muted-foreground/60">
                                  {l(`미활성 (5명 필요)`, `Inactive (need 5)`, `Inactive (need 5)`)}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {analysis.factionBonuses.length >= 2 && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        {l(
                          '혼합 진영: 보너스가 분산됩니다. 순수 진영 5명 시 정원 +10% 활성',
                          'Mixed factions: bonuses are split. Full same-faction team gets +10% capacity',
                          'Mixed factions: bonuses are split. Full same-faction team gets +10% capacity'
                        )}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Season Synergies */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-4 h-4 text-highlight" />
                    {l('시즌 시너지', 'Season Synergies', 'Season Synergies')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.seasonSynergies.map((syn) => {
                    const seasonLabels: Record<string, { ko: string; vi: string; en: string }> = {
                      s1_atkdef: { ko: 'S1 진영 지휘관', vi: 'S1 Faction Commander', en: 'S1 Faction Commander' },
                      s2_hp: { ko: 'S2 진영 결속', vi: 'S2 Faction Bond', en: 'S2 Faction Bond' },
                      s3_resistance: { ko: 'S3 시즌 시너지', vi: 'S3 Season Synergy', en: 'S3 Season Synergy' },
                      s4_counter: { ko: 'S4 상성 강화', vi: 'S4 Counter Boost', en: 'S4 Counter Boost' },
                    };
                    return (
                      <div
                        key={syn.type}
                        className={cn(
                          'p-3 rounded-lg border text-sm',
                          syn.active
                            ? 'bg-green-500/10 border-green-500/20'
                            : 'bg-secondary/20 border-border/30 opacity-60'
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {syn.active ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/40" />
                          )}
                          <span className={cn('font-medium', syn.active ? 'text-green-400' : 'text-muted-foreground')}>
                            {seasonLabels[syn.type][localeKey]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6">
                          {locale === 'ko' ? syn.description.ko : syn.description.vi}
                        </p>
                        {syn.active && syn.heroes.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 pl-6">
                            {syn.heroes.map((hId) => {
                              const h = allHeroes.find((hero) => hero.id === hId);
                              if (!h) return null;
                              return (
                                <Badge key={hId} variant="outline" className="text-[10px]">
                                  {heroName(h)}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Hero Synergies */}
              {analysis.heroSynergies.length > 0 && (
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-highlight" />
                      {l('영웅 시너지', 'Hero Synergies', 'Hero Synergies')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.heroSynergies.map((pair) => (
                      <div
                        key={`${pair.hero1Id}-${pair.hero2Id}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-green-500/5 border border-green-500/15"
                      >
                        <span className="text-sm font-medium">
                          {locale === 'ko' ? pair.hero1Name.ko : pair.hero1Name.vi}
                        </span>
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          {pair.mutual ? (
                            <>
                              <Link2 className="w-3 h-3" />
                              {l('상호 시너지', 'Mutual', 'Mutual')}
                            </>
                          ) : (
                            <>
                              <span>&rarr;</span>
                              {l('시너지', 'Synergy', 'Synergy')}
                            </>
                          )}
                        </span>
                        <span className="text-sm font-medium">
                          {locale === 'ko' ? pair.hero2Name.ko : pair.hero2Name.vi}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Counter Matchup Analysis */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-highlight" />
                    {l('상성 매치업', 'Counter Matchup', 'Counter Matchup')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.counterAnalysis.factionScores.map((fs) => {
                    const colors = FACTION_COLORS[fs.faction];
                    const absScore = Math.abs(fs.score);
                    return (
                      <div key={fs.faction} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            vs {FACTION_NAMES[fs.faction][localeKey]}
                          </span>
                          <span
                            className={cn(
                              'font-medium text-xs',
                              fs.label === 'strong'
                                ? 'text-green-400'
                                : fs.label === 'weak'
                                  ? 'text-red-400'
                                  : 'text-muted-foreground'
                            )}
                          >
                            {fs.label === 'strong'
                              ? l(`유리 (+${fs.score}%)`, `Strong (+${fs.score}%)`, `Strong (+${fs.score}%)`)
                              : fs.label === 'weak'
                                ? l(`불리 (${fs.score}%)`, `Weak (${fs.score}%)`, `Weak (${fs.score}%)`)
                                : l('중립', 'Neutral', 'Neutral')}
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-secondary/50 overflow-hidden relative">
                          {/* Center marker */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 z-10" />
                          {fs.score > 0 ? (
                            <div
                              className="absolute left-1/2 h-full bg-green-500 rounded-r-full transition-all duration-500"
                              style={{ width: `${Math.min(absScore, 100) / 2}%` }}
                            />
                          ) : fs.score < 0 ? (
                            <div
                              className="absolute h-full bg-red-500 rounded-l-full transition-all duration-500"
                              style={{
                                width: `${Math.min(absScore, 100) / 2}%`,
                                right: '50%',
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}

                  {analysis.counterAnalysis.hasS4Adjustment && (
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      {l(
                        'S4 상성 조정 적용됨 (유리 +10% / 불리 -10%)',
                        'S4 counter adjustment applied (+10% adv / -10% disadv)',
                        'S4 counter adjustment applied (+10% advantage / -10% disadvantage)'
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Role Balance */}
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="w-4 h-4 text-highlight" />
                    {l('역할 밸런스', 'Role Balance', 'Role Balance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <RoleBar
                      label={l('탱크', 'Tank', 'Tank')}
                      count={analysis.roleBalance.tanks}
                      total={teamHeroes.length}
                      color="bg-blue-500"
                    />
                    <RoleBar
                      label="DPS"
                      count={analysis.roleBalance.dps}
                      total={teamHeroes.length}
                      color="bg-red-500"
                    />
                    <RoleBar
                      label={l('서포트', 'Support', 'Support')}
                      count={analysis.roleBalance.supports}
                      total={teamHeroes.length}
                      color="bg-green-500"
                    />
                    {analysis.roleBalance.gatherers > 0 && (
                      <RoleBar
                        label={l('채집', 'Gather', 'Gather')}
                        count={analysis.roleBalance.gatherers}
                        total={teamHeroes.length}
                        color="bg-yellow-500"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {l('밸런스 점수', 'Balance Score', 'Balance Score')}
                    </span>
                    <span
                      className={cn(
                        'font-medium',
                        analysis.roleBalance.score >= 70
                          ? 'text-green-400'
                          : analysis.roleBalance.score >= 40
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      )}
                    >
                      {analysis.roleBalance.score}/100
                    </span>
                  </div>

                  {analysis.roleBalance.hasFrontlineTank && (
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <Check className="w-3.5 h-3.5" />
                      {l('전열 탱크 배치됨', 'Frontline tank deployed', 'Frontline tank deployed')}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Chip System Warning */}
              {analysis.factionBonuses.length >= 2 && teamHeroes.length >= 3 && (
                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-amber-400">
                      <CircuitBoard className="w-4 h-4" />
                      {l('칩 시스템 경고', 'Chip System Warning', 'Chip System Warning')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      {l(
                        '혼합 진영은 각 진영별 별도 칩 세트가 필요합니다. 칩 재투자 비용이 매우 높으므로 메인 진영을 S2 전에 결정하세요.',
                        'Mixed factions require separate chip sets per faction. Chip reinvestment cost is very high, so decide your main faction before S2.',
                        'Mixed factions require separate chip sets per faction. Chip reinvestment cost is very high, so decide your main faction before S2.'
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-400/80">
                      <Info className="w-3 h-3" />
                      {l('S2 이후 해금', 'Unlocked after S2', 'Unlocked after S2')}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <Card className="border-amber-500/30 bg-amber-500/5 md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      {l('경고', 'Warnings', 'Warnings')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.warnings.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {locale === 'ko' ? w.ko : w.vi}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {analysis.recommendations.length > 0 && (
                <Card className="border-green-500/30 bg-green-500/5 md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-green-400">
                      <Sparkles className="w-4 h-4" />
                      {l('추천', 'Recommendations', 'Recommendations')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.recommendations.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {locale === 'ko' ? r.ko : r.vi}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Hero Skills Summary */}
              {teamHeroes.length > 0 && (
                <Card className="border-border/50 bg-card/50 md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Swords className="w-4 h-4 text-highlight" />
                      {l('영웅 스킬 요약', 'Hero Skills Summary', 'Hero Skills Summary')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamHeroes.map((hero) => {
                        const colors = FACTION_COLORS[hero.faction];
                        const activeSkill = hero.skills.find((s) => s.type === 'active');
                        const deploymentSkill = hero.skills.find((s) => s.type === 'deployment');

                        return (
                          <div
                            key={hero.id}
                            className={cn(
                              'p-3 rounded-lg border',
                              colors.border,
                              colors.bg
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              {(() => {
                                const Icon = CLASS_ICONS[hero.class];
                                return <Icon className={cn('w-4 h-4', colors.text)} />;
                              })()}
                              <span className={cn('text-sm font-bold', colors.text)}>
                                {heroName(hero)}
                              </span>
                              <Badge variant="outline" className={cn('text-[10px]', colors.text)}>
                                {hero.tier}
                              </Badge>
                              {hero.season && (
                                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                  {hero.season}
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-1 pl-6">
                              {activeSkill && (
                                <div className="text-xs text-muted-foreground">
                                  <span className="text-foreground/70 font-medium">
                                    {locale === 'ko' ? activeSkill.name.ko : locale === 'vi' ? activeSkill.name.vi : (activeSkill.name.en ?? activeSkill.name.ko)}:
                                  </span>{' '}
                                  {locale === 'ko' ? activeSkill.description.ko : locale === 'vi' ? activeSkill.description.vi : (activeSkill.description.en ?? activeSkill.description.ko)}
                                </div>
                              )}
                              {deploymentSkill && (
                                <div className="text-xs text-muted-foreground">
                                  <span className="text-foreground/70 font-medium">
                                    [{l('전체효력', 'Deployment', 'Deployment')}] {locale === 'ko' ? deploymentSkill.name.ko : locale === 'vi' ? deploymentSkill.name.vi : (deploymentSkill.name.en ?? deploymentSkill.name.ko)}:
                                  </span>{' '}
                                  {locale === 'ko' ? deploymentSkill.description.ko : locale === 'vi' ? deploymentSkill.description.vi : (deploymentSkill.description.en ?? deploymentSkill.description.ko)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {teamHeroes.length === 0 && (
          <Card className="border-border/50 bg-secondary/20">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {l(
                  '슬롯을 클릭하여 영웅을 선택하거나, 위의 프리셋을 사용해보세요.',
                  'Click a slot to select heroes, or try a preset above.',
                  'Click a slot to select heroes, or try a preset above.'
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// --- Sub-components ---

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{Math.max(0, Math.min(100, value))}</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function RoleBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex-1 text-center">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="h-16 rounded-lg bg-secondary/30 relative overflow-hidden flex items-end justify-center">
        <div
          className={cn('w-full rounded-t-lg transition-all duration-500', color)}
          style={{ height: `${Math.max(pct, count > 0 ? 20 : 0)}%` }}
        />
      </div>
      <div className="text-sm font-bold mt-1">{count}</div>
    </div>
  );
}
