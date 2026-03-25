import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Lightbulb, Building2, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import hqData from '@/data/hq-costs.json';

export default async function HQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HQContent locale={locale} />;
}

function HQContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';
  const loc = locale as 'ko' | 'vi';

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

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
              15 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-highlight" />
            {isKorean ? '본부(HQ) 업그레이드 가이드' : 'Hướng dẫn nâng cấp Trụ sở'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '본부(HQ) 1-35 레벨별 업그레이드 비용, 소요 시간, 요구사항을 확인하세요.'
              : 'Xem chi phí, thời gian và yêu cầu nâng cấp HQ từ level 1-35.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '본부(HQ) 1-18: 보너스 포함 2일 이내 가능' : 'HQ 1-18: Có thể dưới 2 ngày với bonus'}</li>
              <li>• {isKorean ? '본부(HQ) 30: T10 병종 해금 핵심 목표 (140일 기본 시간)' : 'HQ 30: Mục tiêu chính T10 (140 ngày cơ bản)'}</li>
              <li>• {isKorean ? '소피아 5성 필수 - 건설 비용 10% 감소로 수십억 자원 절약' : 'Sophia 5 sao bắt buộc - giảm 10% chi phí tiết kiệm hàng tỷ'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Hero Level Cap */}
        <Card className="border-highlight/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-highlight" />
              {hqData.heroCapProgression.description[loc]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {hqData.heroCapProgression.examples.map((ex, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-highlight">HQ {ex.hq}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {isKorean ? `영웅 Lv.${ex.heroCap}` : `Anh hùng Lv.${ex.heroCap}`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirement Pattern */}
        <div className="info-tip flex gap-3">
          <Info className="h-5 w-5 text-tip shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-tip mb-1">
              {isKorean ? '요구 건물 패턴' : 'Pattern yêu cầu công trình'}
            </p>
            <p className="text-sm text-muted-foreground">
              {hqData.requirementPattern[loc]}
            </p>
          </div>
        </div>

        {/* Phases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '본부(HQ) 업그레이드 단계' : 'Các giai đoạn nâng cấp HQ'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hqData.phases.map((phase, idx) => (
              <Card key={idx} className={idx === 3 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-highlight border-highlight/30 mb-2">
                    HQ {phase.levels}
                  </Badge>
                  <p className="font-semibold text-sm">{phase.name[loc]}</p>
                  <p className="text-xs text-muted-foreground mt-1">{phase.duration[loc]}</p>
                  <p className="text-xs text-muted-foreground mt-1">{phase.description[loc]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Full Cost Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '본부(HQ) 레벨별 상세 비용표' : 'Bảng chi phí chi tiết theo cấp HQ'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isKorean
              ? '※ 표시된 시간은 보너스 없는 기본 시간입니다. 연구/피난민/버프로 크게 단축됩니다.'
              : '※ Thời gian hiển thị là cơ bản không bonus. Có thể rút ngắn nhiều với NC/người tị nạn/buff.'}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-2 font-semibold sticky left-0 bg-muted/30">Lv</th>
                  <th className="text-right p-2 font-semibold">
                    {isKorean ? '식량' : 'Thực phẩm'}
                  </th>
                  <th className="text-right p-2 font-semibold">
                    {isKorean ? '목재' : 'Gỗ'}
                  </th>
                  <th className="text-right p-2 font-semibold">Zent</th>
                  <th className="text-right p-2 font-semibold">
                    {isKorean ? '스틸' : 'Thép'}
                  </th>
                  <th className="text-center p-2 font-semibold">
                    {isKorean ? '시간' : 'Thời gian'}
                  </th>
                  <th className="text-right p-2 font-semibold">
                    {isKorean ? '전투력' : 'CP'}
                  </th>
                  <th className="text-center p-2 font-semibold">
                    {isKorean ? '영웅Lv' : 'Hero Lv'}
                  </th>
                  <th className="text-left p-2 font-semibold">
                    {isKorean ? '요구사항' : 'Yêu cầu'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {hqData.hqLevels.map((level) => {
                  const isHighlight = level.level === 30;
                  const isSteelLevel = level.level >= 31;
                  return (
                    <tr
                      key={level.level}
                      className={`border-b border-border/50 hover:bg-muted/20 ${
                        isHighlight ? 'bg-highlight/10' : ''
                      } ${isSteelLevel ? 'bg-warning/5' : ''}`}
                    >
                      <td className="p-2 font-bold text-highlight sticky left-0 bg-inherit">{level.level}</td>
                      <td className="p-2 text-right text-muted-foreground text-xs">
                        {formatNumber(level.food)}
                      </td>
                      <td className="p-2 text-right text-muted-foreground text-xs">
                        {formatNumber(level.wood)}
                      </td>
                      <td className="p-2 text-right text-yellow-400 text-xs">
                        {formatNumber(level.zent)}
                      </td>
                      <td className="p-2 text-right text-orange-400 text-xs">
                        {level.steel ? formatNumber(level.steel) : '-'}
                      </td>
                      <td className="p-2 text-center text-xs">
                        {level.time[loc]}
                      </td>
                      <td className="p-2 text-right text-tip text-xs">
                        +{formatNumber(level.power)}
                      </td>
                      <td className="p-2 text-center text-xs">
                        {level.heroCap}
                      </td>
                      <td className="p-2 text-xs text-muted-foreground max-w-[150px] truncate">
                        {level.requirements[loc]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Building Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '건물 우선순위' : 'Ưu tiên công trình'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-tip/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-tip text-lg">
                  {isKorean ? '필수 업그레이드' : 'Bắt buộc nâng cấp'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hqData.requiredBuildings[loc].map((building: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tip" />
                      {building}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-destructive text-lg">
                  {isKorean ? '스킵 권장' : 'Nên bỏ qua'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hqData.skipBuildings[loc].map((building: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      {building}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Steel Info */}
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              {isKorean ? '본부(HQ) 31+ 스틸(Steel) 자원' : 'Tài nguyên Thép (Steel) HQ 31+'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {hqData.steelInfo[loc].description}
            </p>
            <div>
              <p className="text-sm font-medium mb-2">
                {isKorean ? '획득처:' : 'Nguồn:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {hqData.steelInfo[loc].sources.map((source: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-warning">
              💡 {hqData.steelInfo[loc].tip}
            </p>
          </CardContent>
        </Card>

        {/* Construction Boosts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '건설 속도 부스트 쌓기' : 'Cộng dồn boost tốc độ xây dựng'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {isKorean
                  ? '이 보너스들을 최대한 활용하세요:'
                  : 'Tận dụng tối đa các bonus này:'}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {hqData.constructionBoosts[loc].map((boost: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
                    <span className="text-muted-foreground">{boost}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '업그레이드 팁' : 'Mẹo nâng cấp'}
          </h2>
          <div className="grid gap-3">
            {hqData.tips[loc].map((tip: string, idx: number) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
