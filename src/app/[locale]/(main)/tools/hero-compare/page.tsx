'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllHeroes } from '@/lib/heroes';
import type { Hero } from '@/types/hero';
import {
  Users,
  Shield,
  Crosshair,
  Bike,
  Plus,
  X,
  Search,
  Star,
  ChevronDown,
} from 'lucide-react';

const TIER_ORDER = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];

const TIER_COLORS: Record<string, string> = {
  'S+': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  S: 'bg-red-500/20 text-red-400 border-red-500/30',
  'A+': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  A: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'B+': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  B: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  C: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const FACTION_COLORS: Record<string, string> = {
  bloodRose: 'text-red-400',
  wingsOfDawn: 'text-blue-400',
  guardOfOrder: 'text-yellow-400',
};

const FACTION_NAMES: Record<string, { ko: string; vi: string; en: string }> = {
  bloodRose: { ko: '블러디 로즈', vi: 'Blood Rose', en: 'Blood Rose' },
  wingsOfDawn: { ko: '새벽의 날개', vi: 'Cánh Bình Minh', en: 'Dawn Wings' },
  guardOfOrder: { ko: '질서의 수호자', vi: 'Người Bảo Vệ', en: 'Order Keepers' },
};

const CLASS_ICONS: Record<string, React.ElementType> = {
  assaulter: Shield,
  shooter: Crosshair,
  rider: Bike,
};

const CLASS_NAMES: Record<string, { ko: string; vi: string; en: string }> = {
  assaulter: { ko: '돌격', vi: 'Đột kích', en: 'Assaulter' },
  shooter: { ko: '사격', vi: 'Xạ thủ', en: 'Shooter' },
  rider: { ko: '기마', vi: 'Kỵ binh', en: 'Rider' },
};

const SKILL_TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-500/20 text-gray-400',
  active: 'bg-red-500/20 text-red-400',
  deployment: 'bg-green-500/20 text-green-400',
  potential: 'bg-purple-500/20 text-purple-400',
};

function getTierRank(tier: string): number {
  const idx = TIER_ORDER.indexOf(tier);
  return idx === -1 ? 99 : idx;
}

function isBetterTier(a: string, b: string): boolean {
  return getTierRank(a) < getTierRank(b);
}

function InvestmentStars({ priority }: { priority: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= priority
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

export default function HeroComparePage() {
  const locale = useLocale();
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const localeKey = (locale === 'ko' || locale === 'vi') ? locale : 'en';
  const allHeroes = getAllHeroes();

  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [factionFilter, setFactionFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const selectedHeroes = selectedIds.map((id) =>
    id ? allHeroes.find((h) => h.id === id) ?? null : null
  );

  const alreadySelectedIds = new Set(selectedIds.filter(Boolean) as string[]);

  const filteredHeroes = useMemo(() => {
    return allHeroes.filter((h) => {
      if (alreadySelectedIds.has(h.id)) return false;
      const name = ((h.name as Record<string, string>)[locale] ?? h.name.en ?? h.name.ko).toLowerCase();
      const en = h.name.en?.toLowerCase() ?? '';
      const q = searchQuery.toLowerCase();
      if (q && !name.includes(q) && !en.includes(q)) return false;
      if (factionFilter !== 'all' && h.faction !== factionFilter) return false;
      if (classFilter !== 'all' && h.class !== classFilter) return false;
      return true;
    });
  }, [allHeroes, searchQuery, factionFilter, classFilter, alreadySelectedIds, locale]);

  const selectHero = (heroId: string) => {
    if (activeSlot === null) return;
    const next = [...selectedIds];
    next[activeSlot] = heroId;
    setSelectedIds(next);
    setActiveSlot(null);
    setSearchQuery('');
    setFactionFilter('all');
    setClassFilter('all');
  };

  const removeHero = (slotIndex: number) => {
    const next = [...selectedIds];
    next[slotIndex] = null;
    setSelectedIds(next);
  };

  const heroName = (hero: Hero) => {
    if (locale === 'ko') return hero.name.ko;
    if (locale === 'vi') return hero.name.vi;
    return hero.name.en ?? hero.name.ko;
  };

  const selectedCount = selectedIds.filter(Boolean).length;

  // Determine best tier among selected for highlighting
  const selectedTiers = selectedHeroes
    .filter((h): h is Hero => h !== null)
    .map((h) => h.tier);
  const bestOverall =
    selectedTiers.length > 0
      ? selectedTiers.reduce((a, b) => (isBetterTier(a, b) ? a : b))
      : null;

  const selectedPvpTiers = selectedHeroes
    .filter((h): h is Hero => h !== null)
    .map((h) => h.pvpTier);
  const bestPvp =
    selectedPvpTiers.length > 0
      ? selectedPvpTiers.reduce((a, b) => (isBetterTier(a, b) ? a : b))
      : null;

  const selectedPveTiers = selectedHeroes
    .filter((h): h is Hero => h !== null)
    .map((h) => h.pveTier);
  const bestPve =
    selectedPveTiers.length > 0
      ? selectedPveTiers.reduce((a, b) => (isBetterTier(a, b) ? a : b))
      : null;

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {l('영웅 비교', 'So sanh Anh hung', 'Hero Compare')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '최대 4명의 영웅을 선택하여 상세 비교하세요.',
              'Chon toi da 4 anh hung de so sanh chi tiet.',
              'Select up to 4 heroes for a detailed comparison.'
            )}
          </p>
        </div>

        {/* Hero Selection Slots */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {selectedIds.map((id, idx) => {
            const hero = selectedHeroes[idx];
            if (hero) {
              const ClassIcon = CLASS_ICONS[hero.class] || Users;
              return (
                <Card key={idx} className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-60 group-hover:opacity-100 z-10"
                    onClick={() => removeHero(idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <ClassIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge
                        className={`text-xs ${TIER_COLORS[hero.tier] || ''}`}
                      >
                        {hero.tier}
                      </Badge>
                    </div>
                    <Link
                      href={`/${locale}/heroes/${hero.id}`}
                      className={`font-semibold text-sm hover:underline ${FACTION_COLORS[hero.faction]}`}
                    >
                      {heroName(hero)}
                    </Link>
                  </CardContent>
                </Card>
              );
            }
            return (
              <Card
                key={idx}
                className={`cursor-pointer border-dashed hover:border-highlight/50 transition-colors ${
                  activeSlot === idx ? 'border-highlight ring-1 ring-highlight/30' : ''
                }`}
                onClick={() => setActiveSlot(activeSlot === idx ? null : idx)}
              >
                <CardContent className="p-3 flex items-center justify-center min-h-[72px]">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Hero Picker Dropdown */}
        {activeSlot !== null && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {l('영웅 선택', 'Chon anh hung', 'Select Hero')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={l('이름 검색...', 'Tim kiem...', 'Search name...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <select
                  value={factionFilter}
                  onChange={(e) => setFactionFilter(e.target.value)}
                  className="bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">
                    {l('전체 진영', 'Tat ca phe', 'All Factions')}
                  </option>
                  <option value="bloodRose">
                    {FACTION_NAMES.bloodRose[localeKey]}
                  </option>
                  <option value="wingsOfDawn">
                    {FACTION_NAMES.wingsOfDawn[localeKey]}
                  </option>
                  <option value="guardOfOrder">
                    {FACTION_NAMES.guardOfOrder[localeKey]}
                  </option>
                </select>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="bg-background border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">
                    {l('전체 병종', 'Tat ca loai', 'All Classes')}
                  </option>
                  <option value="assaulter">{CLASS_NAMES.assaulter[localeKey]}</option>
                  <option value="shooter">{CLASS_NAMES.shooter[localeKey]}</option>
                  <option value="rider">{CLASS_NAMES.rider[localeKey]}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-60 overflow-y-auto">
                {filteredHeroes.map((hero) => {
                  const ClassIcon = CLASS_ICONS[hero.class] || Users;
                  return (
                    <button
                      key={hero.id}
                      onClick={() => selectHero(hero.id)}
                      className="flex items-center gap-2 p-2 rounded-md border border-border hover:bg-muted/50 transition-colors text-left text-sm"
                    >
                      <ClassIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span
                        className={`truncate ${FACTION_COLORS[hero.faction]}`}
                      >
                        {heroName(hero)}
                      </span>
                      <Badge
                        className={`text-[10px] px-1 py-0 ml-auto shrink-0 ${
                          TIER_COLORS[hero.tier] || ''
                        }`}
                      >
                        {hero.tier}
                      </Badge>
                    </button>
                  );
                })}
                {filteredHeroes.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground py-4 text-sm">
                    {l('검색 결과 없음', 'Khong tim thay', 'No results found')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedCount >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {l('상세 비교', 'So sanh chi tiet', 'Detailed Comparison')}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 min-w-[100px] text-muted-foreground">
                      {l('항목', 'Muc', 'Category')}
                    </th>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <th
                            key={idx}
                            className="text-center p-3 min-w-[120px]"
                          >
                            <Link
                              href={`/${locale}/heroes/${hero.id}`}
                              className={`hover:underline font-semibold ${FACTION_COLORS[hero.faction]}`}
                            >
                              {heroName(hero)}
                            </Link>
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Tier */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      {l('종합 티어', 'Tier tong', 'Overall Tier')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 text-center">
                            <Badge
                              className={`${TIER_COLORS[hero.tier] || ''} ${
                                bestOverall && hero.tier === bestOverall
                                  ? 'ring-1 ring-green-400/50'
                                  : ''
                              }`}
                            >
                              {hero.tier}
                            </Badge>
                          </td>
                        )
                    )}
                  </tr>
                  {/* PvP Tier */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      PvP
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 text-center">
                            <Badge
                              className={`${TIER_COLORS[hero.pvpTier] || ''} ${
                                bestPvp && hero.pvpTier === bestPvp
                                  ? 'ring-1 ring-green-400/50'
                                  : ''
                              }`}
                            >
                              {hero.pvpTier}
                            </Badge>
                          </td>
                        )
                    )}
                  </tr>
                  {/* PvE Tier */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      PvE
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 text-center">
                            <Badge
                              className={`${TIER_COLORS[hero.pveTier] || ''} ${
                                bestPve && hero.pveTier === bestPve
                                  ? 'ring-1 ring-green-400/50'
                                  : ''
                              }`}
                            >
                              {hero.pveTier}
                            </Badge>
                          </td>
                        )
                    )}
                  </tr>
                  {/* Role */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      {l('역할', 'Vai tro', 'Role')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td
                            key={idx}
                            className="p-3 text-center uppercase text-xs tracking-wide"
                          >
                            {hero.role}
                          </td>
                        )
                    )}
                  </tr>
                  {/* Faction */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      {l('진영', 'Phe', 'Faction')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td
                            key={idx}
                            className={`p-3 text-center text-xs ${FACTION_COLORS[hero.faction]}`}
                          >
                            {FACTION_NAMES[hero.faction]?.[localeKey]}
                          </td>
                        )
                    )}
                  </tr>
                  {/* Class */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      {l('병종', 'Loai quan', 'Class')}
                    </td>
                    {selectedHeroes.map((hero, idx) => {
                      if (!hero) return null;
                      const ClassIcon = CLASS_ICONS[hero.class] || Users;
                      return (
                        <td key={idx} className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <ClassIcon className="h-3.5 w-3.5" />
                            <span className="text-xs">
                              {CLASS_NAMES[hero.class]?.[localeKey]}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Investment Priority */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      {l('투자 우선도', 'Uu tien dau tu', 'Investment Priority')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3">
                            <div className="flex justify-center">
                              <InvestmentStars
                                priority={hero.investmentPriority}
                              />
                            </div>
                          </td>
                        )
                    )}
                  </tr>
                  {/* F2P Friendly */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium">
                      F2P
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 text-center">
                            <Badge
                              variant="outline"
                              className={
                                hero.f2pFriendly
                                  ? 'border-green-500/30 text-green-400'
                                  : 'border-red-500/30 text-red-400'
                              }
                            >
                              {hero.f2pFriendly
                                ? l('무과금 가능', 'OK', 'F2P Friendly')
                                : l('과금 권장', 'P2W', 'P2W Recommended')}
                            </Badge>
                          </td>
                        )
                    )}
                  </tr>
                  {/* Skills */}
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground font-medium align-top">
                      {l('스킬', 'Ky nang', 'Skills')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 align-top">
                            <div className="space-y-2">
                              {hero.skills.map((skill, si) => (
                                <div key={si} className="space-y-0.5">
                                  <div className="flex items-center gap-1 flex-wrap">
                                    <Badge
                                      className={`text-[10px] px-1 py-0 ${
                                        SKILL_TYPE_COLORS[skill.type] || ''
                                      }`}
                                    >
                                      {skill.type}
                                    </Badge>
                                    <span className="text-xs font-medium">
                                      {locale === 'ko'
                                        ? skill.name.ko
                                        : locale === 'vi'
                                          ? skill.name.vi
                                          : skill.name.en ?? skill.name.ko}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground leading-tight">
                                    {locale === 'ko'
                                      ? skill.description.ko
                                      : locale === 'vi'
                                        ? skill.description.vi
                                        : skill.description.en ?? skill.description.ko}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </td>
                        )
                    )}
                  </tr>
                  {/* Synergies */}
                  <tr>
                    <td className="p-3 text-muted-foreground font-medium align-top">
                      {l('시너지', 'Hiep dong', 'Synergies')}
                    </td>
                    {selectedHeroes.map(
                      (hero, idx) =>
                        hero && (
                          <td key={idx} className="p-3 align-top">
                            <div className="flex flex-wrap gap-1">
                              {hero.synergies.map((synId) => {
                                const synHero = allHeroes.find(
                                  (h) => h.id === synId
                                );
                                if (!synHero) return null;
                                return (
                                  <Link
                                    key={synId}
                                    href={`/${locale}/heroes/${synId}`}
                                    className="text-xs hover:underline"
                                  >
                                    <Badge
                                      variant="outline"
                                      className={`text-[10px] ${FACTION_COLORS[synHero.faction]}`}
                                    >
                                      {heroName(synHero)}
                                    </Badge>
                                  </Link>
                                );
                              })}
                            </div>
                          </td>
                        )
                    )}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {selectedCount < 2 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>
                {l(
                  '위에서 2명 이상의 영웅을 선택하면 비교표가 나타납니다.',
                  'Chon it nhat 2 anh hung o tren de xem bang so sanh.',
                  'Select at least 2 heroes above to see the comparison table.'
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
