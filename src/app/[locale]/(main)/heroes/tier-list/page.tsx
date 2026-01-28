import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Info } from 'lucide-react';
import { TierList } from '@/components/content';
import heroesData from '@/data/heroes.json';

export default async function TierListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TierListPageContent locale={locale} />;
}

function TierListPageContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const meta = heroesData.meta;

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
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Star className="h-8 w-8 text-highlight" />
            {t('submenu.tierList')}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '영웅 등급표와 육성 우선순위를 확인하세요. 최신 메타 기준으로 작성되었습니다.'
              : 'Xem bảng xếp hạng anh hùng và ưu tiên phát triển. Dựa trên meta mới nhất.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold text-foreground mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                •{' '}
                {isKorean
                  ? 'S+티어: 유찬, 리시아, 퀴니, 릴리아나, 앰버, 도데메키 - 시즌 영웅 필수 육성'
                  : 'Tier S+: Yu Chan, Licia, Queenie, Liliana, Amber, Dodemeki - Bắt buộc phát triển anh hùng mùa'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? 'S티어: 벨라, 셀레나, 알마, 닉스, 스칼렛, 로라, 할리에나, 사쿠라 - 핵심 전력'
                  : 'Tier S: Bella, Selena, Alma, Nyx, Scarlett, Laura, Harleyena, Sakura - Lực lượng chính'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? '무과금 필수: 소피아 (건설시간 버프), 로라 (유일한 프론트라인)'
                  : 'F2P bắt buộc: Sophia (buff xây dựng), Laura (frontline duy nhất)'}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Meta Info */}
        <div className="info-tip flex gap-3">
          <Info className="h-5 w-5 text-tip shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-tip mb-1">
              {isKorean ? '현재 메타' : 'Meta hiện tại'}
            </p>
            <p className="text-sm text-muted-foreground">
              {meta.notes[locale as 'ko' | 'vi']}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {meta.formationTip[locale as 'ko' | 'vi']}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-muted-foreground">
              {isKorean ? '추천 영웅' : 'Anh hùng khuyến nghị'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 bg-highlight/10 text-highlight border-highlight/30"
            >
              S4
            </Badge>
            <span className="text-muted-foreground">
              {isKorean ? '시즌 영웅' : 'Anh hùng mùa'}
            </span>
          </div>
        </div>

        {/* Tier List */}
        <TierList heroes={heroesData.heroes as any} />

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground text-center">
          {t('common.lastUpdated')}: {meta.lastUpdated}
        </p>
      </div>
    </div>
  );
}
