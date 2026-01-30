import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ShoppingCart, Store, Crown, Medal, Timer, Zap, Lightbulb, AlertTriangle, Ban, Check, X } from 'lucide-react';

export default async function ShopGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShopGuideContent locale={locale} />;
}

function ShopGuideContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // Shop types with recommendations
  const shops = [
    {
      name: isKorean ? '특권상점 (VIP Shop)' : 'VIP Shop',
      icon: Crown,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      buy: [
        isKorean ? '황금렌치' : 'Golden Wrenches',
        isKorean ? '할인 가속' : 'Discounted Speedups',
      ],
      skip: [
        isKorean ? '에너지코어 (이벤트 외)' : 'Power Cores (outside events)',
        isKorean ? '정가 가속' : 'Full-price Speedups',
      ],
    },
    {
      name: isKorean ? '영광상점 (Glory Shop)' : 'Glory Shop',
      icon: Medal,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      buy: [
        isKorean ? '오렌지 영웅 조각' : 'Orange Hero Fragments',
        isKorean ? '황금렌치 (주 5개)' : 'Golden Wrenches (5/week)',
        isKorean ? '장비 프레임워크 조각' : 'Equipment Framework Fragments',
      ],
      skip: [
        isKorean ? '보라 장비 박스' : 'Purple Equipment Boxes',
        isKorean ? '기본 자원' : 'Basic Resources',
      ],
    },
    {
      name: isKorean ? '공훈상점 (Merit Shop)' : 'Merit Shop',
      icon: Store,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      buy: [
        isKorean ? '에너지코어 (이벤트 중)' : 'Power Cores (during events)',
        isKorean ? '오렌지 조각' : 'Orange Fragments',
      ],
      skip: [
        isKorean ? '보라 장비 박스' : 'Purple Equipment Boxes',
        isKorean ? '기본 모집 티켓' : 'Basic Recruitment Tickets',
      ],
    },
    {
      name: isKorean ? '시간제한 상점' : 'Time-Limited Shop',
      icon: Timer,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      buy: [
        isKorean ? '모든 경찰휘장' : 'All Badges',
        isKorean ? '범용 오렌지 조각' : 'Versatile Orange Fragments',
      ],
      skip: [
        isKorean ? '보라 영웅 조각' : 'Purple Hero Fragments',
        isKorean ? '다이아 효율 낮은 아이템' : 'Low diamond-value items',
      ],
    },
    {
      name: isKorean ? '에너지코어 상점' : 'Power Core Shop',
      icon: Zap,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      buy: [
        isKorean ? '연료 (차량 업그레이드용)' : 'Fuel (for vehicle upgrades)',
        isKorean ? '고급 텔레포터 (선택적)' : 'Advanced Teleporters (situational)',
      ],
      skip: [
        isKorean ? '에너지코어 직접 구매 (이벤트로 주 150-250개 획득)' : 'Power Cores (earn 150-250 weekly via events)',
      ],
    },
  ];

  // Diamond spending priority
  const spendingPriority = [
    {
      tier: 'Tier 1',
      label: isKorean ? '필수' : 'Essential',
      color: 'text-red-400',
      items: [
        { name: isKorean ? 'Key Licenses (전략, 개조, 연구)' : 'Key Licenses (Strategy, Modification, Research)', desc: isKorean ? '1회 구매, 영구 혜택' : 'One-time purchase, lifetime benefits' },
        { name: isKorean ? '4명의 건설자 (Builders)' : 'All 4 Builders', desc: isKorean ? '건설 효율 대폭 향상' : 'Dramatically improves construction' },
        { name: isKorean ? '난민 모집 티켓' : 'Refugee Recruitment Tickets', desc: isKorean ? '집사(건설), 과학자(연구) 우선' : 'Focus on Butlers & Scientists' },
        { name: isKorean ? '주간 쉴드' : 'Weekly Shields', desc: isKorean ? '금요일까지 최소 2,000 다이아 유지' : 'Keep 2,000 diamonds by Friday' },
      ],
    },
    {
      tier: 'Tier 2',
      label: isKorean ? '고가치' : 'High Value',
      color: 'text-yellow-400',
      items: [
        { name: isKorean ? '럭키 할인 가속 (40%+ 할인)' : 'Lucky Discounter Speedups (40%+ off)', desc: isKorean ? '약 4주마다 개최' : 'Every ~4 weeks' },
        { name: isKorean ? '특권상점 할인 가속' : 'VIP Shop Discounted Speedups', desc: isKorean ? '할인 시에만 구매' : 'Only when discounted' },
      ],
    },
  ];

  // VIP Shop vs Lucky Discounter comparison
  const efficiencyComparison = [
    {
      item: isKorean ? '경찰휘장' : 'Badges',
      vipShop: isKorean ? '100개 = 150 다이아 (1.5 다이아/개)' : '100 = 150 diamonds (1.5/badge)',
      luckyDiscount: isKorean ? '2,000개 = 600 다이아 (0.3 다이아/개)' : '2,000 = 600 diamonds (0.3/badge)',
      efficiency: '5x',
    },
    {
      item: isKorean ? '가속' : 'Speedups',
      vipShop: isKorean ? '~32시간 = 1,700 다이아' : '~32h = 1,700 diamonds',
      luckyDiscount: isKorean ? '90% 할인 시 훨씬 저렴' : 'Much cheaper at 90% off',
      efficiency: '3-5x',
    },
  ];

  // Lucky Discounter purchase guide
  const discountGuide = [
    { discount: '90%', badges: isKorean ? '전부 구매' : 'Buy All', speedups: isKorean ? '전부 구매' : 'Buy All', color: 'text-green-400', bg: 'bg-green-500/10' },
    { discount: '70%', badges: isKorean ? '구매' : 'Buy', speedups: isKorean ? '필요시만' : 'If needed', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { discount: '50%', badges: isKorean ? '선택적' : 'Optional', speedups: isKorean ? '비권장' : 'Skip', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { discount: '30%↓', badges: isKorean ? '비권장' : 'Skip', speedups: isKorean ? '구매 금지' : 'Never', color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  // Never buy items
  const neverBuy = [
    isKorean ? '직접 가속 버튼 (Direct Speedup)' : 'Direct Speedup Button',
    isKorean ? '보라 장비 박스' : 'Purple Equipment Boxes',
    isKorean ? '기본 모집 티켓' : 'Basic Recruitment Tickets',
    isKorean ? '자원 선택 상자' : 'Resource Choice Crates',
    isKorean ? '일반 보라 영웅 조각' : 'Ordinary Purple Hero Fragments',
  ];

  // Free diamond sources
  const freeDiamondSources = [
    { source: isKorean ? '난폭 두목 업적' : 'Furylord Achievements', note: isKorean ? '매일 4회 공격' : 'Use all 4 daily attacks' },
    { source: isKorean ? '아레나 순위 보상' : 'Arena Rank Rewards', note: isKorean ? '주간 1k-5k' : '1k-5k weekly' },
    { source: isKorean ? '월드맵 다이아 노드' : 'World Map Diamond Nodes', note: isKorean ? '정기 확인' : 'Check regularly' },
    { source: isKorean ? 'SVS 개인 박스' : 'SVS Personal Boxes', note: isKorean ? '적극 참여' : 'Participate actively' },
    { source: isKorean ? '이벤트 마일스톤' : 'Event Milestones', note: isKorean ? '목표 달성' : 'Hit targets' },
    { source: isKorean ? '리딤 코드' : 'Redeem Codes', note: isKorean ? '공식 채널 확인' : 'Check official channels' },
  ];

  const tips = [
    isKorean
      ? '럭키 할인 90%에서 경찰휘장 구매 = 특권상점 대비 5배 효율'
      : 'Buying badges at 90% Lucky Discounter = 5x value vs VIP Shop',
    isKorean
      ? '이벤트 일정에 맞춰 구매 - 황금렌치는 차량 개조 테마 때'
      : 'Match purchases with events - Golden Wrenches during Vehicle Boost',
    isKorean
      ? '에너지코어는 이벤트로 주 150-250개 획득 가능 - 직접 구매 불필요'
      : 'Power Cores: earn 150-250 weekly via events - no need to buy',
    isKorean
      ? '실제 사례: 럭키 할인으로 42,000 경찰휘장 = 30,700 다이아 (특권상점 63,000 다이아)'
      : 'Real case: 42,000 badges via Lucky Discounter = 30,700 diamonds (vs 63,000 in VIP Shop)',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-intermediate">
              {t('difficulty.intermediate')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-highlight" />
            {isKorean ? '상점 & 다이아 사용 가이드' : 'Shop & Diamond Spending Guide'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '각 상점별 구매 가이드와 효율적인 다이아 사용법을 알아봅니다.'
              : 'Learn shop-by-shop purchase recommendations and efficient diamond spending.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Key Takeaways'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '럭키 할인 90% = 특권상점 대비 5배 효율' : 'Lucky Discounter 90% = 5x value vs VIP Shop'}</li>
              <li>• {isKorean ? '필수 구매: Key Licenses, 4명 건설자, 난민 모집 티켓' : 'Essential: Key Licenses, 4 Builders, Refugee Tickets'}</li>
              <li>• {isKorean ? '직접 가속 버튼, 보라 장비 박스 = 절대 구매 금지' : 'Never buy: Direct Speedup, Purple Equipment Boxes'}</li>
              <li>• {isKorean ? '이벤트 일정에 맞춰 구매 타이밍 조절' : 'Time purchases with event schedules'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Shop by Shop Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6 text-highlight" />
            {isKorean ? '상점별 구매 가이드' : 'Shop-by-Shop Guide'}
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {shops.map((shop) => {
              const Icon = shop.icon;
              return (
                <Card key={shop.name} className={`${shop.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-lg flex items-center gap-2 ${shop.color}`}>
                      <Icon className="h-5 w-5" />
                      {shop.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-green-400 mb-1 flex items-center gap-1">
                        <Check className="h-3 w-3" /> {isKorean ? '구매 권장' : 'Buy'}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-0.5">
                        {shop.buy.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-400 mb-1 flex items-center gap-1">
                        <X className="h-3 w-3" /> {isKorean ? '비권장' : 'Skip'}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-0.5">
                        {shop.skip.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Diamond Spending Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '다이아몬드 사용 우선순위' : 'Diamond Spending Priority'}
          </h2>
          <div className="space-y-4">
            {spendingPriority.map((tier) => (
              <Card key={tier.tier}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg ${tier.color}`}>
                    {tier.tier} - {tier.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {tier.items.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-muted/30">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* VIP Shop vs Lucky Discounter */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '특권상점 vs 럭키 할인 효율 비교' : 'VIP Shop vs Lucky Discounter'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{isKorean ? '항목' : 'Item'}</th>
                      <th className="text-left p-2">{isKorean ? '특권상점' : 'VIP Shop'}</th>
                      <th className="text-left p-2">{isKorean ? '럭키 할인 (90%)' : 'Lucky Discounter (90%)'}</th>
                      <th className="text-center p-2">{isKorean ? '효율' : 'Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {efficiencyComparison.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="p-2 font-semibold">{row.item}</td>
                        <td className="p-2 text-muted-foreground">{row.vipShop}</td>
                        <td className="p-2 text-green-400">{row.luckyDiscount}</td>
                        <td className="p-2 text-center">
                          <Badge variant="outline" className="text-green-400 border-green-400/30">
                            {row.efficiency}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Lucky Discounter Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '럭키 할인 구매 기준' : 'Lucky Discounter Purchase Guide'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {discountGuide.map((level) => (
              <Card key={level.discount} className={`${level.bg} border-none`}>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold ${level.color}`}>{level.discount}</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      {isKorean ? '경찰휘장' : 'Badges'}: <span className={level.color}>{level.badges}</span>
                    </p>
                    <p className="text-muted-foreground">
                      {isKorean ? '가속' : 'Speedups'}: <span className={level.color}>{level.speedups}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Never Buy */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Ban className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-2">
                  {isKorean ? '절대 구매 금지 항목' : 'Never Purchase'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {neverBuy.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <X className="h-3 w-3 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Free Diamond Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '무료 다이아몬드 획득처' : 'Free Diamond Sources'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {freeDiamondSources.map((source, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <p className="font-semibold">{source.source}</p>
                  <p className="text-sm text-muted-foreground">{source.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Tips'}</h2>
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
