import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import { HeroCard } from '@/components/content';
import { getAllHeroes, getHeroMeta } from '@/lib/heroes';
import { HeroDatabaseFilter } from './HeroDatabaseFilter';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '영웅 도감' : 'Cơ sở dữ liệu anh hùng',
    description:
      locale === 'ko'
        ? 'Last Z 전체 37명 영웅의 스킬, 시너지, 육성 가이드'
        : 'Hướng dẫn kỹ năng, hiệp lực, phát triển của 37 anh hùng Last Z',
  };
}

export default async function HeroDatabasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeroDatabaseContent locale={locale} />;
}

function HeroDatabaseContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';
  const heroes = getAllHeroes();
  const meta = getHeroMeta();

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />5 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {isKorean ? '영웅 도감' : 'Cơ sở dữ liệu anh hùng'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? `전체 ${heroes.length}명 영웅의 상세 정보를 확인하세요. 클릭하면 스킬, 시너지, 육성 가이드를 볼 수 있습니다.`
              : `Xem thông tin chi tiết của ${heroes.length} anh hùng. Nhấn để xem kỹ năng, hiệp lực, hướng dẫn phát triển.`}
          </p>
        </div>

        {/* Filterable Hero Grid */}
        <HeroDatabaseFilter heroes={heroes} />

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground text-center">
          {t('common.lastUpdated')}: {meta.lastUpdated}
        </p>
      </div>
    </div>
  );
}
