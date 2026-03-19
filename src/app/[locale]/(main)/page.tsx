import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  GuideCard,
  QuickStartCard,
  VisitorCounter,
  ActiveCodesWidget,
  HeroTierSnapshot,
  EventCalendarPreview,
} from '@/components/content';
import { Compass } from 'lucide-react';
import { getAllHeroes } from '@/lib/heroes';
import { getActiveCodes, getLastUpdated } from '@/lib/redeem-codes';
import { getSixDayRotation, getFullPrepThemes } from '@/lib/events';

const latestGuides = [
  {
    title: '게임 소개',
    titleVi: 'Giới thiệu game',
    description: 'Last Z: Survival Shooter의 기본 시스템과 게임 방법을 알아봅니다.',
    descriptionVi: 'Tìm hiểu hệ thống cơ bản và cách chơi của Last Z: Survival Shooter.',
    href: '/beginner/intro',
    difficulty: 'beginner' as const,
    readTime: 10,
    category: '입문',
    categoryVi: 'Cơ bản',
  },
  {
    title: '초보자 필수 팁 10가지',
    titleVi: '10 mẹo quan trọng cho người mới',
    description: '처음 시작하는 분들이 꼭 알아야 할 필수 팁을 정리했습니다.',
    descriptionVi: 'Tổng hợp các mẹo quan trọng mà người mới bắt đầu cần biết.',
    href: '/beginner/tips',
    difficulty: 'beginner' as const,
    readTime: 8,
    category: '입문',
    categoryVi: 'Cơ bản',
  },
  {
    title: '본부(HQ) 업그레이드 가이드',
    titleVi: 'Hướng dẫn nâng cấp Trụ sở',
    description: '본부(HQ) 레벨별 업그레이드 비용과 우선순위를 확인하세요.',
    descriptionVi: 'Xem chi phí và thứ tự ưu tiên nâng cấp theo cấp độ Trụ sở.',
    href: '/progression/hq',
    difficulty: 'basic' as const,
    readTime: 15,
    category: '성장',
    categoryVi: 'Phát triển',
  },
  {
    title: '영웅 티어표 (2026)',
    titleVi: 'Bảng xếp hạng anh hùng (2026)',
    description: '현재 메타에서 가장 강력한 영웅들의 순위를 확인하세요.',
    descriptionVi: 'Xem thứ hạng của các anh hùng mạnh nhất trong meta hiện tại.',
    href: '/heroes/tier-list',
    difficulty: 'intermediate' as const,
    readTime: 12,
    category: '영웅',
    categoryVi: 'Anh hùng',
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent locale={locale} />;
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const isKorean = locale === 'ko';

  const heroes = getAllHeroes();
  const activeCodes = getActiveCodes();
  const codesLastUpdated = getLastUpdated();
  const sixDayRotation = getSixDayRotation();
  const fullPrepThemes = getFullPrepThemes();

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('welcome')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </section>

        {/* Visitor Counter */}
        <VisitorCounter locale={locale} />

        {/* Active Redeem Codes + Today's Event - Side by Side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActiveCodesWidget codes={activeCodes} lastUpdated={codesLastUpdated} />
          <EventCalendarPreview
            sixDayRotation={sixDayRotation}
            fullPrepThemes={fullPrepThemes}
          />
        </div>

        {/* S+ Hero Tier Snapshot */}
        <HeroTierSnapshot heroes={heroes} />

        {/* Quick Start Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Compass className="h-6 w-6 text-highlight" />
            {t('quickStart')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <QuickStartCard
              title={t('forBeginners')}
              description={t('forBeginnersDesc')}
              href="/beginner/intro"
              iconName="compass"
              color="primary"
            />
            <QuickStartCard
              title={isKorean ? '전투력 올리기' : 'Tăng sức mạnh chiến đấu'}
              description={
                isKorean
                  ? '효율적인 전투력 상승 방법을 알아보세요.'
                  : 'Tìm hiểu cách tăng sức mạnh chiến đấu hiệu quả.'
              }
              href="/progression/combat-power"
              iconName="trending-up"
              color="warning"
            />
            <QuickStartCard
              title={isKorean ? '영웅 도감' : 'Cơ sở dữ liệu anh hùng'}
              description={
                isKorean
                  ? '37명 전체 영웅의 스킬, 시너지, 육성 가이드를 확인하세요.'
                  : 'Xem kỹ năng, hiệp lực, hướng dẫn phát triển của 37 anh hùng.'
              }
              href="/heroes/tier-list"
              iconName="users"
              color="highlight"
            />
            <QuickStartCard
              title={isKorean ? '리딤 코드' : 'Mã đổi thưởng'}
              description={
                isKorean
                  ? '무료 보상을 받을 수 있는 코드를 확인하세요.'
                  : 'Xem mã để nhận phần thưởng miễn phí.'
              }
              href="/economy/redeem-codes"
              iconName="gift"
              color="tip"
            />
          </div>
        </section>

        {/* Latest Guides */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {t('latestGuides')}
            </h2>
            <a
              href={`/${locale}/info/changelog`}
              className="text-sm text-highlight hover:underline"
            >
              {tc('viewAll')}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {latestGuides.map((guide) => (
              <GuideCard
                key={guide.href}
                title={isKorean ? guide.title : guide.titleVi}
                description={isKorean ? guide.description : guide.descriptionVi}
                href={guide.href}
                difficulty={guide.difficulty}
                readTime={guide.readTime}
                category={isKorean ? guide.category : guide.categoryVi}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
