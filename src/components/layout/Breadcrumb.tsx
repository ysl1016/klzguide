'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, { ko: string; vi: string }> = {
  beginner: { ko: '입문 가이드', vi: 'Cơ bản' },
  progression: { ko: '성장 가이드', vi: 'Phát triển' },
  research: { ko: '연구 & 기술', vi: 'Nghiên cứu' },
  heroes: { ko: '영웅', vi: 'Anh hùng' },
  gear: { ko: '장비', vi: 'Trang bị' },
  pvp: { ko: 'PvP & 진형', vi: 'PvP' },
  events: { ko: '이벤트', vi: 'Sự kiện' },
  economy: { ko: '경제 & 무과금', vi: 'Kinh tế' },
  tools: { ko: '도구', vi: 'Công cụ' },
  info: { ko: '정보', vi: 'Thông tin' },
  // Sub-pages
  intro: { ko: '게임 소개', vi: 'Giới thiệu' },
  tips: { ko: '초보자 팁', vi: 'Mẹo' },
  faction: { ko: '진영 선택', vi: 'Phe phái' },
  mistakes: { ko: '초반 실수', vi: 'Sai lầm' },
  hq: { ko: 'HQ 업그레이드', vi: 'Nâng cấp HQ' },
  'combat-power': { ko: '전투력', vi: 'Sức mạnh' },
  'daily-routine': { ko: '일일 루틴', vi: 'Thói quen' },
  'base-building': { ko: '기지 건설', vi: 'Xây dựng' },
  'vehicle-modification': { ko: '차량 개조', vi: 'Cải tiến xe' },
  refugees: { ko: '피난민', vi: 'Người tị nạn' },
  priority: { ko: '연구 우선순위', vi: 'Ưu tiên NC' },
  'tech-tree': { ko: '기술 트리', vi: 'Cây CN' },
  'tier-list': { ko: '티어표', vi: 'Xếp hạng' },
  leveling: { ko: '영웅 육성', vi: 'Phát triển' },
  synergy: { ko: '영웅 조합', vi: 'Kết hợp' },
  enhancement: { ko: '장비 강화', vi: 'Nâng cấp' },
  sets: { ko: '세트 효과', vi: 'Hiệu ứng bộ' },
  arena: { ko: '아레나', vi: 'Đấu trường' },
  formations: { ko: '진형 조합', vi: 'Đội hình' },
  strategy: { ko: 'PvP 전략', vi: 'Chiến thuật' },
  'full-prep': { ko: '전면전비', vi: 'Full Prep' },
  furylord: { ko: '난폭 두목', vi: 'Furylord' },
  tyrant: { ko: '좀비폭군', vi: 'Tyrant' },
  'zombie-siege': { ko: '좀비공성', vi: 'Zombie Siege' },
  'gacha-go': { ko: '행운의 흔들기', vi: 'Lucky Shake' },
  'lucky-discounter': { ko: '행운 할인', vi: 'Lucky Disc.' },
  'alliance-duel': { ko: '연맹 대결', vi: 'Đấu LM' },
  'canyon-clash': { ko: '협곡쟁탈전', vi: 'Canyon Clash' },
  svs: { ko: '서버 대전', vi: 'SVS' },
  calendar: { ko: '이벤트 캘린더', vi: 'Lịch SK' },
  'shop-guide': { ko: '상점 가이드', vi: 'Shop' },
  farming: { ko: '자원 파밍', vi: 'Farm' },
  'free-diamonds': { ko: '무과금 다이아', vi: 'Kim cương' },
  'redeem-codes': { ko: '리딤 코드', vi: 'Mã thưởng' },
  'cp-calculator': { ko: 'CP 계산기', vi: 'Máy tính CP' },
  'hero-compare': { ko: '영웅 비교', vi: 'So sánh' },
  'team-builder': { ko: '팀 빌더', vi: 'Xây đội' },
  glossary: { ko: '용어 사전', vi: 'Từ điển' },
  faq: { ko: 'FAQ', vi: 'FAQ' },
  changelog: { ko: '업데이트 내역', vi: 'Lịch sử' },
  'shield-strategy': { ko: '방패 전략', vi: 'Khiên' },
  'steel-guide': { ko: 'Steel 가이드', vi: 'Steel' },
  'diamond-reserve': { ko: '다이아 비축', vi: 'Tích kim cương' },
  'farm-account': { ko: '팜 계정', vi: 'Tài khoản farm' },
  'shooter-stages': { ko: '슈터 스테이지', vi: 'Shooter Stages' },
};

export function Breadcrumb() {
  const locale = useLocale() as 'ko' | 'vi';
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
