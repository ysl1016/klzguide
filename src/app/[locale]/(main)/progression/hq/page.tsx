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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const loc = locale as 'ko' | 'vi' | 'en';

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
            {l('본부(HQ) 업그레이드 가이드', 'Hướng dẫn nâng cấp Trụ sở', 'HQ Upgrade Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '본부(HQ) 1-35 레벨별 업그레이드 비용, 소요 시간, 요구사항을 확인하세요.',
              'Xem chi phí, thời gian và yêu cầu nâng cấp HQ từ level 1-35.',
              'Check upgrade costs, build times, and requirements for HQ levels 1-35.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('본부(HQ) 1-18: 보너스 포함 2일 이내 가능', 'HQ 1-18: Có thể dưới 2 ngày với bonus', 'HQ 1-18: Achievable in under 2 days with bonuses')}</li>
              <li>• {l('본부(HQ) 30: T10 병종 해금 핵심 목표 (140일 기본 시간)', 'HQ 30: Mục tiêu chính T10 (140 ngày cơ bản)', 'HQ 30: Key goal to unlock T10 troops (140 days base time)')}</li>
              <li>• {l('소피아 5성 필수 - 건설 비용 10% 감소로 수십억 자원 절약', 'Sophia 5 sao bắt buộc - giảm 10% chi phí tiết kiệm hàng tỷ', 'Sophia 5-star is essential — 10% construction cost reduction saves billions')}</li>
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
                    {l(`영웅 Lv.${ex.heroCap}`, `Anh hùng Lv.${ex.heroCap}`, `Hero Lv.${ex.heroCap}`)}
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
              {l('요구 건물 패턴', 'Pattern yêu cầu công trình', 'Building Requirement Pattern')}
            </p>
            <p className="text-sm text-muted-foreground">
              {hqData.requirementPattern[loc]}
            </p>
          </div>
        </div>

        {/* Phases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('본부(HQ) 업그레이드 단계', 'Các giai đoạn nâng cấp HQ', 'HQ Upgrade Phases')}
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
            {l('본부(HQ) 레벨별 상세 비용표', 'Bảng chi phí chi tiết theo cấp HQ', 'Detailed HQ Upgrade Cost Table')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {l(
              '※ 표시된 시간은 보너스 없는 기본 시간입니다. 연구/피난민/버프로 크게 단축됩니다.',
              '※ Thời gian hiển thị là cơ bản không bonus. Có thể rút ngắn nhiều với NC/người tị nạn/buff.',
              '※ Times shown are base values without bonuses. Can be significantly reduced with research/refugees/buffs.'
            )}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-2 font-semibold sticky left-0 bg-muted/30">Lv</th>
                  <th className="text-right p-2 font-semibold">
                    {l('식량', 'Thực phẩm', 'Food')}
                  </th>
                  <th className="text-right p-2 font-semibold">
                    {l('목재', 'Gỗ', 'Wood')}
                  </th>
                  <th className="text-right p-2 font-semibold">Zent</th>
                  <th className="text-right p-2 font-semibold">
                    {l('스틸', 'Thép', 'Steel')}
                  </th>
                  <th className="text-center p-2 font-semibold">
                    {l('시간', 'Thời gian', 'Time')}
                  </th>
                  <th className="text-right p-2 font-semibold">
                    {l('전투력', 'CP', 'CP')}
                  </th>
                  <th className="text-center p-2 font-semibold">
                    {l('영웅Lv', 'Hero Lv', 'Hero Lv')}
                  </th>
                  <th className="text-left p-2 font-semibold">
                    {l('요구사항', 'Yêu cầu', 'Requirements')}
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
            {l('건물 우선순위', 'Ưu tiên công trình', 'Building Priority')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-tip/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-tip text-lg">
                  {l('필수 업그레이드', 'Bắt buộc nâng cấp', 'Must Upgrade')}
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
                  {l('스킵 권장', 'Nên bỏ qua', 'Skip These')}
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
              {l('본부(HQ) 31+ 스틸(Steel) 자원', 'Tài nguyên Thép (Steel) HQ 31+', 'Steel Resource for HQ 31+')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {(hqData.steelInfo.description as Record<string, string>)[loc]}
            </p>
            <div>
              <p className="text-sm font-medium mb-2">
                {l('획득처:', 'Nguồn:', 'Sources:')}
              </p>
              <div className="flex flex-wrap gap-2">
                {((hqData.steelInfo.sources as Record<string, string[]>)[loc] ?? []).map((source: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-warning">
              {(hqData.steelInfo.tip as Record<string, string>)[loc]}
            </p>
          </CardContent>
        </Card>

        {/* Construction Boosts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('건설 속도 부스트 쌓기', 'Cộng dồn boost tốc độ xây dựng', 'Stacking Construction Speed Boosts')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {l(
                  '이 보너스들을 최대한 활용하세요:',
                  'Tận dụng tối đa các bonus này:',
                  'Make the most of these bonuses:'
                )}
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
            {l('업그레이드 팁', 'Mẹo nâng cấp', 'Upgrade Tips')}
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
