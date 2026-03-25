import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Coins, MapPin, Truck, Target, Lightbulb, AlertTriangle } from 'lucide-react';

export default async function FarmingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FarmingContent locale={locale} />;
}

function FarmingContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const farmingSources = [
    {
      name: l('월드맵 채집', 'Thu thập bản đồ', 'World Map Gathering'),
      icon: MapPin,
      color: 'text-green-400',
      efficiency: l('높음', 'Cao', 'High'),
      description: l(
        '오프라인 시 채집 대기열 유지. 가장 안정적인 자원 확보',
        'Giữ hàng đợi thu thập khi offline. Nguồn tài nguyên ổn định nhất',
        'Keep gathering queues running while offline. Most stable resource income'
      ),
    },
    {
      name: l('레이더 미션', 'Nhiệm vụ Radar', 'Radar Missions'),
      icon: Target,
      color: 'text-blue-400',
      efficiency: l('높음', 'Cao', 'High'),
      description: l(
        '일일 미션 필수 완료. 자원 + 기타 보상',
        'Bắt buộc hoàn thành nhiệm vụ hàng ngày. Tài nguyên + thưởng khác',
        'Complete daily missions without fail. Resources + other rewards'
      ),
    },
    {
      name: l('트럭 미션', 'Nhiệm vụ Truck', 'Truck Missions'),
      icon: Truck,
      color: 'text-yellow-400',
      efficiency: l('중간', 'Trung bình', 'Medium'),
      description: l(
        '자원 + 영웅 조각. 꾸준히 진행',
        'Tài nguyên + mảnh anh hùng. Làm đều đặn',
        'Resources + hero fragments. Keep running consistently'
      ),
    },
    {
      name: l('이벤트 보상', 'Thưởng sự kiện', 'Event Rewards'),
      icon: Coins,
      color: 'text-purple-400',
      efficiency: l('매우 높음', 'Rất cao', 'Very High'),
      description: l(
        '이벤트 참여 시 대량 자원 획득 가능',
        'Tham gia sự kiện có thể nhận tài nguyên số lượng lớn',
        'Participating in events yields large amounts of resources'
      ),
    },
  ];

  const resourceTypes = [
    { name: l('식량', 'Thực phẩm', 'Food'), color: 'text-green-400', use: l('병력 훈련, 건설', 'Huấn luyện, xây dựng', 'Troop training, construction') },
    { name: l('목재', 'Gỗ', 'Wood'), color: 'text-yellow-600', use: l('건설, 연구', 'Xây dựng, NC', 'Construction, research') },
    { name: 'Zent', color: 'text-yellow-400', use: l('모든 활동', 'Mọi hoạt động', 'All activities') },
    { name: l('스틸 (본부(HQ) 31+)', 'Thép (HQ 31+)', 'Steel (HQ 31+)'), color: 'text-orange-400', use: l('고레벨 건설', 'Xây dựng level cao', 'High-level construction') },
  ];

  const tips = [
    l(
      '오프라인 시 항상 채집 대기열 유지 - 자원 자동 확보',
      'Luôn giữ hàng đợi thu thập khi offline - tự động có tài nguyên',
      'Always keep gathering queues running while offline - automatic resource income'
    ),
    l(
      '자원 생산 건물(농장 등)은 ROI가 낮아 업그레이드 스킵',
      'Công trình sản xuất (nông trại) ROI thấp, bỏ qua nâng cấp',
      'Resource production buildings (farms, etc.) have low ROI - skip upgrades'
    ),
    l(
      '전투 전 자원을 창고 용량 내로 유지하여 보호',
      'Giữ tài nguyên trong dung lượng kho trước chiến đấu để bảo vệ',
      'Keep resources within warehouse capacity before combat to protect them'
    ),
    l(
      '이벤트 기간에 자원 사용하여 보상 극대화',
      'Dùng tài nguyên trong sự kiện để tối đa phần thưởng',
      'Use resources during events to maximize rewards'
    ),
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Coins className="h-8 w-8 text-highlight" />
            {l('자원 파밍 가이드', 'Hướng dẫn farm tài nguyên', 'Resource Farming Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '효율적인 자원 확보 방법을 알아봅니다.',
              'Tìm hiểu cách thu thập tài nguyên hiệu quả.',
              'Learn efficient methods for gathering resources.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Takeaways')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('오프라인 시 채집 대기열 항상 유지', 'Luôn giữ hàng đợi thu thập khi offline', 'Always keep gathering queues running while offline')}</li>
              <li>• {l('레이더/트럭 미션 매일 완료', 'Hoàn thành nhiệm vụ Radar/Truck hàng ngày', 'Complete Radar/Truck missions daily')}</li>
              <li>• {l('자원 생산 건물 업그레이드 스킵 (ROI 낮음)', 'Bỏ qua nâng cấp công trình sản xuất (ROI thấp)', 'Skip upgrading production buildings (low ROI)')}</li>
              <li>• {l('이벤트 기간에 자원 사용 집중', 'Tập trung dùng tài nguyên trong sự kiện', 'Focus resource spending during events')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Farming Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('자원 획득처', 'Nguồn tài nguyên', 'Resource Sources')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {farmingSources.map((source) => {
              const Icon = source.icon;
              return (
                <Card key={source.name}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-6 w-6 ${source.color} shrink-0`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-semibold ${source.color}`}>{source.name}</p>
                          <Badge variant="outline" className="text-xs">{source.efficiency}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{source.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Resource Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('자원 종류', 'Loại tài nguyên', 'Resource Types')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourceTypes.map((resource) => (
              <Card key={resource.name}>
                <CardContent className="p-4 text-center">
                  <p className={`font-semibold ${resource.color}`}>{resource.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{resource.use}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Warning */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {l('자원 생산 건물 주의', 'Lưu ý công trình sản xuất', 'Warning: Production Buildings')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '농장, 거주지, 풍력발전기, 제련소는 ROI가 매우 낮습니다. 투자 자원 회수에 4개월 이상 소요되므로 업그레이드를 스킵하세요.',
                    'Nông trại, Khu dân cư, Turbine gió, Xưởng luyện kim có ROI rất thấp. Mất 4+ tháng thu hồi tài nguyên đầu tư, nên bỏ qua nâng cấp.',
                    'Farms, Residences, Wind Turbines, and Smelters have very low ROI. It takes 4+ months to recoup the invested resources, so skip upgrading them.'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('팁', 'Mẹo', 'Tips')}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
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
