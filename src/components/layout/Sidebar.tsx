'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
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
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  key: string;
  href: string;
  icon: React.ElementType;
  children?: { key: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    key: 'beginner',
    href: '/beginner',
    icon: Compass,
    children: [
      { key: 'intro', href: '/beginner/intro' },
      { key: 'tips', href: '/beginner/tips' },
      { key: 'faction', href: '/beginner/faction' },
      { key: 'mistakes', href: '/beginner/mistakes' },
    ],
  },
  {
    key: 'progression',
    href: '/progression',
    icon: TrendingUp,
    children: [
      { key: 'hq', href: '/progression/hq' },
      { key: 'combatPower', href: '/progression/combat-power' },
      { key: 'dailyRoutine', href: '/progression/daily-routine' },
    ],
  },
  {
    key: 'research',
    href: '/research',
    icon: FlaskConical,
    children: [
      { key: 'priority', href: '/research/priority' },
      { key: 'techTree', href: '/research/tech-tree' },
    ],
  },
  {
    key: 'heroes',
    href: '/heroes',
    icon: Users,
    children: [
      { key: 'tierList', href: '/heroes/tier-list' },
      { key: 'leveling', href: '/heroes/leveling' },
      { key: 'synergy', href: '/heroes/synergy' },
    ],
  },
  {
    key: 'gear',
    href: '/gear',
    icon: Shield,
    children: [
      { key: 'enhancement', href: '/gear/enhancement' },
      { key: 'sets', href: '/gear/sets' },
    ],
  },
  {
    key: 'pvp',
    href: '/pvp',
    icon: Swords,
    children: [
      { key: 'formations', href: '/pvp/formations' },
      { key: 'strategy', href: '/pvp/strategy' },
    ],
  },
  {
    key: 'events',
    href: '/events',
    icon: Calendar,
    children: [
      { key: 'fullPrep', href: '/events/full-prep' },
      { key: 'furylord', href: '/events/furylord' },
      { key: 'tyrant', href: '/events/tyrant' },
      { key: 'zombieSiege', href: '/events/zombie-siege' },
      { key: 'gachaGo', href: '/events/gacha-go' },
      { key: 'luckyDiscounter', href: '/events/lucky-discounter' },
      { key: 'allianceDuel', href: '/events/alliance-duel' },
      { key: 'canyonClash', href: '/events/canyon-clash' },
      { key: 'svs', href: '/events/svs' },
    ],
  },
  {
    key: 'economy',
    href: '/economy',
    icon: Coins,
    children: [
      { key: 'farming', href: '/economy/farming' },
      { key: 'freeDiamonds', href: '/economy/free-diamonds' },
      { key: 'redeemCodes', href: '/economy/redeem-codes' },
    ],
  },
  {
    key: 'tools',
    href: '/tools',
    icon: Wrench,
    children: [
      { key: 'cpCalculator', href: '/tools/cp-calculator' },
      { key: 'heroCompare', href: '/tools/hero-compare' },
    ],
  },
  {
    key: 'info',
    href: '/info',
    icon: Info,
    children: [
      { key: 'glossary', href: '/info/glossary' },
      { key: 'faq', href: '/info/faq' },
    ],
  },
];

export function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  const getDefaultOpenValues = () => {
    const openItems: string[] = [];
    navItems.forEach((item) => {
      if (pathname.startsWith(item.href)) {
        openItems.push(item.key);
      }
    });
    return openItems;
  };

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:pt-16">
      <div className="flex flex-col flex-1 bg-sidebar border-r border-sidebar-border overflow-hidden">
        <ScrollArea className="h-full py-4">
          <nav className="px-3 space-y-1">
            <Accordion
              type="multiple"
              defaultValue={getDefaultOpenValues()}
              className="space-y-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <AccordionItem
                    key={item.key}
                    value={item.key}
                    className="border-none"
                  >
                    <AccordionTrigger
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:no-underline',
                        isActive
                          ? 'bg-sidebar-accent text-highlight'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{t(`nav.${item.key}`)}</span>
                      </div>
                    </AccordionTrigger>
                    {item.children && (
                      <AccordionContent className="pb-0 pt-1">
                        <div className="ml-8 space-y-1 border-l border-sidebar-border pl-3">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.key}
                                href={child.href}
                                className={cn(
                                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                                  isChildActive
                                    ? 'bg-sidebar-accent text-highlight font-medium'
                                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                                )}
                              >
                                <ChevronRight className="h-3 w-3" />
                                {t(`submenu.${child.key}`)}
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
