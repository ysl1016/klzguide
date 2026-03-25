'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, { ko: string; vi: string; en: string }> = {
  beginner: { ko: '입문 가이드', vi: 'Cơ bản', en: 'Beginner' },
  progression: { ko: '성장 가이드', vi: 'Phát triển', en: 'Progression' },
  research: { ko: '연구 & 기술', vi: 'Nghiên cứu', en: 'Research' },
  heroes: { ko: '영웅', vi: 'Anh hùng', en: 'Heroes' },
  gear: { ko: '장비', vi: 'Trang bị', en: 'Gear' },
  pvp: { ko: 'PvP & 진형', vi: 'PvP', en: 'PvP' },
  events: { ko: '이벤트', vi: 'Sự kiện', en: 'Events' },
  economy: { ko: '경제 & 무과금', vi: 'Kinh tế', en: 'Economy' },
  tools: { ko: '도구', vi: 'Công cụ', en: 'Tools' },
  info: { ko: '정보', vi: 'Thông tin', en: 'Info' },
  // Sub-pages
  intro: { ko: '게임 소개', vi: 'Giới thiệu', en: 'Introduction' },
  tips: { ko: '초보자 팁', vi: 'Mẹo', en: 'Tips' },
  faction: { ko: '진영 선택', vi: 'Phe phái', en: 'Faction' },
  mistakes: { ko: '초반 실수', vi: 'Sai lầm', en: 'Mistakes' },
  hq: { ko: 'HQ 업그레이드', vi: 'Nâng cấp HQ', en: 'HQ Upgrade' },
  'combat-power': { ko: '전투력', vi: 'Sức mạnh', en: 'Combat Power' },
  'daily-routine': { ko: '일일 루틴', vi: 'Thói quen', en: 'Daily Routine' },
  'base-building': { ko: '기지 건설', vi: 'Xây dựng', en: 'Base Building' },
  'vehicle-modification': { ko: '차량 개조', vi: 'Cải tiến xe', en: 'Vehicle Mod' },
  refugees: { ko: '피난민', vi: 'Người tị nạn', en: 'Refugees' },
  priority: { ko: '연구 우선순위', vi: 'Ưu tiên NC', en: 'Priority' },
  'tech-tree': { ko: '기술 트리', vi: 'Cây CN', en: 'Tech Tree' },
  'field-research': { ko: '야전연구', vi: 'Field Research', en: 'Field Research' },
  'tier-list': { ko: '티어표', vi: 'Xếp hạng', en: 'Tier List' },
  leveling: { ko: '영웅 육성', vi: 'Phát triển', en: 'Leveling' },
  synergy: { ko: '영웅 조합', vi: 'Kết hợp', en: 'Synergy' },
  enhancement: { ko: '장비 강화', vi: 'Nâng cấp', en: 'Enhancement' },
  sets: { ko: '세트 효과', vi: 'Hiệu ứng bộ', en: 'Set Effects' },
  arena: { ko: '아레나', vi: 'Đấu trường', en: 'Arena' },
  formations: { ko: '진형 조합', vi: 'Đội hình', en: 'Formations' },
  strategy: { ko: 'PvP 전략', vi: 'Chiến thuật', en: 'Strategy' },
  'full-prep': { ko: '전면전비', vi: 'Full Prep', en: 'Full Prep' },
  furylord: { ko: '난폭 두목', vi: 'Furylord', en: 'Furylord' },
  tyrant: { ko: '좀비폭군', vi: 'Tyrant', en: 'Tyrant' },
  'zombie-siege': { ko: '좀비공성', vi: 'Zombie Siege', en: 'Zombie Siege' },
  'gacha-go': { ko: '행운의 흔들기', vi: 'Lucky Shake', en: 'Lucky Shake' },
  'lucky-discounter': { ko: '행운 할인', vi: 'Lucky Disc.', en: 'Lucky Discounter' },
  'alliance-duel': { ko: '연맹 대결', vi: 'Đấu LM', en: 'Alliance Duel' },
  'battlefield-breakout': { ko: '전장 돌파', vi: 'Battlefield Breakout', en: 'Battlefield Breakout' },
  'canyon-clash': { ko: '협곡쟁탈전', vi: 'Canyon Clash', en: 'Canyon Clash' },
  svs: { ko: '서버 대전', vi: 'SVS', en: 'SVS' },
  calendar: { ko: '이벤트 캘린더', vi: 'Lịch SK', en: 'Calendar' },
  'shop-guide': { ko: '상점 가이드', vi: 'Shop', en: 'Shop Guide' },
  farming: { ko: '자원 파밍', vi: 'Farm', en: 'Farming' },
  'free-diamonds': { ko: '무과금 다이아', vi: 'Kim cương', en: 'Free Diamonds' },
  'redeem-codes': { ko: '리딤 코드', vi: 'Mã thưởng', en: 'Redeem Codes' },
  'cp-calculator': { ko: 'CP 계산기', vi: 'Máy tính CP', en: 'CP Calculator' },
  'hero-compare': { ko: '영웅 비교', vi: 'So sánh', en: 'Hero Compare' },
  'team-builder': { ko: '팀 빌더', vi: 'Xây đội', en: 'Team Builder' },
  glossary: { ko: '용어 사전', vi: 'Từ điển', en: 'Glossary' },
  faq: { ko: 'FAQ', vi: 'FAQ', en: 'FAQ' },
  changelog: { ko: '업데이트 내역', vi: 'Lịch sử', en: 'Changelog' },
  'shield-strategy': { ko: '방패 전략', vi: 'Khiên', en: 'Shield Strategy' },
  'steel-guide': { ko: 'Steel 가이드', vi: 'Steel', en: 'Steel Guide' },
  'diamond-reserve': { ko: '다이아 비축', vi: 'Tích kim cương', en: 'Diamond Reserve' },
  'farm-account': { ko: '팜 계정', vi: 'Tài khoản farm', en: 'Farm Account' },
  'shooter-stages': { ko: '슈터 스테이지', vi: 'Shooter Stages', en: 'Shooter Stages' },
  'trap-detection': { ko: '트랩 감지', vi: 'Phát hiện Bẫy', en: 'Trap Detection' },
};

export function Breadcrumb() {
  const locale = useLocale() as 'ko' | 'vi' | 'en';
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = routeLabels[seg]?.[locale] ?? seg;
    const isLast = idx === segments.length - 1;
    return { href, label, isLast, segment: seg };
  });

  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground px-4 lg:px-8 pt-4 overflow-x-auto">
      <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors shrink-0">
        <Home className="h-3 w-3" />
        <span>{locale === 'ko' ? '홈' : 'Home'}</span>

      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1 shrink-0">
          <ChevronRight className="h-3 w-3" />
          {crumb.isLast ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
