'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Compass,
  TrendingUp,
  FlaskConical,
  Users,
  Shield,
  Swords,
  Calendar,
  Coins,
  Wrench,
  Info,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchItem {
  key: string;
  href: string;
  parentKey: string;
  icon: React.ElementType;
}

// Navigation structure matching Sidebar.tsx
const searchItems: SearchItem[] = [
  // Beginner
  { key: 'intro', href: '/beginner/intro', parentKey: 'beginner', icon: Compass },
  { key: 'tips', href: '/beginner/tips', parentKey: 'beginner', icon: Compass },
  { key: 'faction', href: '/beginner/faction', parentKey: 'beginner', icon: Compass },
  { key: 'mistakes', href: '/beginner/mistakes', parentKey: 'beginner', icon: Compass },
  // Progression
  { key: 'hq', href: '/progression/hq', parentKey: 'progression', icon: TrendingUp },
  { key: 'combatPower', href: '/progression/combat-power', parentKey: 'progression', icon: TrendingUp },
  { key: 'dailyRoutine', href: '/progression/daily-routine', parentKey: 'progression', icon: TrendingUp },
  // Research
  { key: 'priority', href: '/research/priority', parentKey: 'research', icon: FlaskConical },
  { key: 'techTree', href: '/research/tech-tree', parentKey: 'research', icon: FlaskConical },
  // Heroes
  { key: 'tierList', href: '/heroes/tier-list', parentKey: 'heroes', icon: Users },
  { key: 'leveling', href: '/heroes/leveling', parentKey: 'heroes', icon: Users },
  { key: 'synergy', href: '/heroes/synergy', parentKey: 'heroes', icon: Users },
  // Gear
  { key: 'enhancement', href: '/gear/enhancement', parentKey: 'gear', icon: Shield },
  { key: 'sets', href: '/gear/sets', parentKey: 'gear', icon: Shield },
  // PvP
  { key: 'formations', href: '/pvp/formations', parentKey: 'pvp', icon: Swords },
  { key: 'strategy', href: '/pvp/strategy', parentKey: 'pvp', icon: Swords },
  // Events
  { key: 'fullPrep', href: '/events/full-prep', parentKey: 'events', icon: Calendar },
  { key: 'furylord', href: '/events/furylord', parentKey: 'events', icon: Calendar },
  { key: 'tyrant', href: '/events/tyrant', parentKey: 'events', icon: Calendar },
  { key: 'zombieSiege', href: '/events/zombie-siege', parentKey: 'events', icon: Calendar },
  { key: 'gachaGo', href: '/events/gacha-go', parentKey: 'events', icon: Calendar },
  { key: 'luckyDiscounter', href: '/events/lucky-discounter', parentKey: 'events', icon: Calendar },
  { key: 'allianceDuel', href: '/events/alliance-duel', parentKey: 'events', icon: Calendar },
  { key: 'canyonClash', href: '/events/canyon-clash', parentKey: 'events', icon: Calendar },
  { key: 'svs', href: '/events/svs', parentKey: 'events', icon: Calendar },
  // Economy
  { key: 'shopGuide', href: '/economy/shop-guide', parentKey: 'economy', icon: Coins },
  { key: 'farming', href: '/economy/farming', parentKey: 'economy', icon: Coins },
  { key: 'freeDiamonds', href: '/economy/free-diamonds', parentKey: 'economy', icon: Coins },
  { key: 'redeemCodes', href: '/economy/redeem-codes', parentKey: 'economy', icon: Coins },
  // Tools
  { key: 'cpCalculator', href: '/tools/cp-calculator', parentKey: 'tools', icon: Wrench },
  { key: 'heroCompare', href: '/tools/hero-compare', parentKey: 'tools', icon: Wrench },
  // Info
  { key: 'glossary', href: '/info/glossary', parentKey: 'info', icon: Info },
  { key: 'faq', href: '/info/faq', parentKey: 'info', icon: Info },
];

// Additional searchable keywords for better matching
const searchKeywords: Record<string, string[]> = {
  intro: ['시작', '입문', 'start', 'begin', 'new'],
  tips: ['팁', '필수', 'tip', 'essential', 'must'],
  faction: ['진영', '선택', 'faction', 'choose'],
  mistakes: ['실수', '주의', 'mistake', 'avoid', 'error'],
  hq: ['본부', 'HQ', 'headquarters', 'upgrade', '업그레이드'],
  combatPower: ['전투력', 'CP', 'power', 'combat'],
  dailyRoutine: ['일일', '루틴', 'daily', 'routine', '매일'],
  priority: ['우선순위', 'priority', '연구'],
  techTree: ['기술', '트리', 'tech', 'tree'],
  tierList: ['티어', '표', 'tier', 'list', 'ranking'],
  leveling: ['육성', '레벨', 'level', 'grow'],
  synergy: ['조합', '시너지', 'synergy', 'combo'],
  enhancement: ['강화', '장비', 'enhance', 'upgrade', '에너지코어'],
  sets: ['세트', '효과', 'set', 'bonus'],
  formations: ['진형', '배치', 'formation', 'layout'],
  strategy: ['전략', '전술', 'strategy', 'tactic'],
  fullPrep: ['전면전비', 'preparedness', 'daily'],
  furylord: ['난폭 두목', '퓨리로드', 'furylord', 'boss'],
  tyrant: ['좀비폭군', 'tyrant', 'rally', 'steel'],
  zombieSiege: ['좀비공성', 'siege', 'zombie', '포위'],
  gachaGo: ['가챠', 'gacha', '뽑기', 'pull'],
  luckyDiscounter: ['럭키', '할인', 'lucky', 'discount', '경찰휘장'],
  allianceDuel: ['연맹 대결', 'duel', 'alliance'],
  canyonClash: ['협곡', 'canyon', 'clash'],
  svs: ['서버 대전', 'SVS', 'server'],
  shopGuide: ['상점', '샵', 'shop', 'store', '공훈상점', '특권상점'],
  farming: ['파밍', '자원', 'farm', 'resource'],
  freeDiamonds: ['무과금', '다이아', 'free', 'diamond', 'F2P'],
  redeemCodes: ['리딤', '코드', 'redeem', 'code', '쿠폰'],
  cpCalculator: ['계산기', 'calculator', 'CP'],
  heroCompare: ['비교', 'compare', '영웅'],
  glossary: ['용어', '사전', 'glossary', 'term'],
  faq: ['FAQ', '질문', '답변', 'question', 'answer'],
};

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({ className, autoFocus, onClose }: SearchBarProps) {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();

    return searchItems.filter((item) => {
      // Get translated title
      const title = t(`submenu.${item.key}`).toLowerCase();
      const parentTitle = t(`nav.${item.parentKey}`).toLowerCase();

      // Check title match
      if (title.includes(lowerQuery)) return true;

      // Check parent title match
      if (parentTitle.includes(lowerQuery)) return true;

      // Check keywords match
      const keywords = searchKeywords[item.key] || [];
      if (keywords.some(kw => kw.toLowerCase().includes(lowerQuery))) return true;

      // Check href match
      if (item.href.toLowerCase().includes(lowerQuery)) return true;

      return false;
    }).slice(0, 8); // Limit to 8 results
  }, [query, t]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateTo(results[selectedIndex].href);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        onClose?.();
        break;
    }
  };

  const navigateTo = (href: string) => {
    router.push(href);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t('common.searchPlaceholder')}
          className="w-full pl-10 pr-8 bg-secondary/50 border-border"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <ScrollArea className="max-h-[300px]">
            <div className="py-2">
              {results.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.href}
                    onClick={() => navigateTo(item.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      isSelected ? 'bg-accent' : 'hover:bg-accent/50'
                    )}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {t(`submenu.${item.key}`)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t(`nav.${item.parentKey}`)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
          <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
            <span className="ml-1 mr-3">{t('common.searchPlaceholder').includes('검색') ? '이동' : 'Navigate'}</span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
            <span className="ml-1">{t('common.searchPlaceholder').includes('검색') ? '선택' : 'Select'}</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            {t('common.searchPlaceholder').includes('검색')
              ? `"${query}"에 대한 검색 결과가 없습니다.`
              : `No results found for "${query}".`}
          </div>
        </div>
      )}
    </div>
  );
}
