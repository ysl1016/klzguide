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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  // Shop types with recommendations
  const shops = [
    {
      name: l('특권상점 (VIP Shop)', 'VIP Shop', 'VIP Shop'),
      icon: Crown,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      buy: [
        l('골드렌치', 'Golden Wrenches', 'Golden Wrenches'),
        l('할인 가속', 'Discounted Speedups', 'Discounted Speedups'),
      ],
      skip: [
        l('에너지코어 (이벤트 외)', 'Power Cores (outside events)', 'Power Cores (outside events)'),
        l('정가 가속', 'Full-price Speedups', 'Full-price Speedups'),
      ],
    },
    {
      name: l('영광상점 (Glory Shop)', 'Glory Shop', 'Glory Shop'),
      icon: Medal,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      buy: [
        l('주황 영웅 조각', 'Orange Hero Fragments', 'Orange Hero Fragments'),
        l('골드렌치 (주 5개)', 'Golden Wrenches (5/week)', 'Golden Wrenches (5/week)'),
        l('장비 프레임워크 조각', 'Equipment Framework Fragments', 'Equipment Framework Fragments'),
      ],
      skip: [
        l('보라 장비 박스', 'Purple Equipment Boxes', 'Purple Equipment Boxes'),
        l('기본 자원', 'Basic Resources', 'Basic Resources'),
      ],
    },
    {
      name: l('공훈상점 (Merit Shop)', 'Merit Shop', 'Merit Shop'),
      icon: Store,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      buy: [
        l('에너지코어 (이벤트 중)', 'Power Cores (during events)', 'Power Cores (during events)'),
        l('주황 조각', 'Orange Fragments', 'Orange Fragments'),
      ],
      skip: [
        l('보라 장비 박스', 'Purple Equipment Boxes', 'Purple Equipment Boxes'),
        l('기본 모집권', 'Basic Recruitment Tickets', 'Basic Recruitment Tickets'),
      ],
    },
    {
      name: l('시간제한 상점', 'Time-Limited Shop', 'Time-Limited Shop'),
      icon: Timer,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      buy: [
        l('모든 경찰휘장', 'All Badges', 'All Badges'),
        l('범용 주황 조각', 'Versatile Orange Fragments', 'Versatile Orange Fragments'),
      ],
      skip: [
        l('보라 영웅 조각', 'Purple Hero Fragments', 'Purple Hero Fragments'),
        l('다이아 효율 낮은 아이템', 'Low diamond-value items', 'Low diamond-value items'),
      ],
    },
    {
      name: l('에너지코어 상점', 'Power Core Shop', 'Power Core Shop'),
      icon: Zap,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      buy: [
        l('연료 (차량 업그레이드용)', 'Fuel (for vehicle upgrades)', 'Fuel (for vehicle upgrades)'),
        l('고급 텔레포터 (선택적)', 'Advanced Teleporters (situational)', 'Advanced Teleporters (situational)'),
      ],
      skip: [
        l('에너지코어 직접 구매 (이벤트로 주 150-250개 획득)', 'Power Cores (earn 150-250 weekly via events)', 'Power Cores (earn 150-250 weekly via events)'),
      ],
    },
  ];

  // Diamond spending priority
  const spendingPriority = [
    {
      tier: 'Tier 1',
      label: l('필수', 'Essential', 'Essential'),
      color: 'text-red-400',
      items: [
        { name: l('Key Licenses (전략, 개조, 연구)', 'Key Licenses (Strategy, Modification, Research)', 'Key Licenses (Strategy, Modification, Research)'), desc: l('1회 구매, 영구 혜택', 'One-time purchase, lifetime benefits', 'One-time purchase, lifetime benefits') },
        { name: l('4명의 건설자 (Builders)', 'All 4 Builders', 'All 4 Builders'), desc: l('건설 효율 대폭 향상', 'Dramatically improves construction', 'Dramatically improves construction') },
        { name: l('피난민 모집권', 'Refugee Recruitment Tickets', 'Refugee Recruitment Tickets'), desc: l('관리인(건설), 과학자(연구) 우선', 'Focus on Butlers & Scientists', 'Focus on Butlers & Scientists') },
        { name: l('주간 쉴드', 'Weekly Shields', 'Weekly Shields'), desc: l('금요일까지 최소 2,000 다이아 유지', 'Keep 2,000 diamonds by Friday', 'Keep 2,000 diamonds by Friday') },
      ],
    },
    {
      tier: 'Tier 2',
      label: l('고가치', 'High Value', 'High Value'),
      color: 'text-yellow-400',
      items: [
        { name: l('행운 할인 가속 (40%+ 할인)', 'Lucky Discounter Speedups (40%+ off)', 'Lucky Discounter Speedups (40%+ off)'), desc: l('약 4주마다 개최', 'Every ~4 weeks', 'Every ~4 weeks') },
        { name: l('특권상점 할인 가속', 'VIP Shop Discounted Speedups', 'VIP Shop Discounted Speedups'), desc: l('할인 시에만 구매', 'Only when discounted', 'Only when discounted') },
      ],
    },
  ];

  // VIP Shop vs Lucky Discounter comparison
  const efficiencyComparison = [
    {
      item: l('경찰휘장', 'Badges', 'Badges'),
      vipShop: l('100개 = 150 다이아 (1.5 다이아/개)', '100 = 150 diamonds (1.5/badge)', '100 = 150 diamonds (1.5/badge)'),
      luckyDiscount: l('2,000개 = 600 다이아 (0.3 다이아/개)', '2,000 = 600 diamonds (0.3/badge)', '2,000 = 600 diamonds (0.3/badge)'),
      efficiency: '5x',
    },
    {
      item: l('가속', 'Speedups', 'Speedups'),
      vipShop: l('~32시간 = 1,700 다이아', '~32h = 1,700 diamonds', '~32h = 1,700 diamonds'),
      luckyDiscount: l('90% 할인 시 훨씬 저렴', 'Much cheaper at 90% off', 'Much cheaper at 90% off'),
      efficiency: '3-5x',
    },
  ];

  // Lucky Discounter purchase guide
  const discountGuide = [
    { discount: '90%', badges: l('전부 구매', 'Buy All', 'Buy All'), speedups: l('전부 구매', 'Buy All', 'Buy All'), color: 'text-green-400', bg: 'bg-green-500/10' },
    { discount: '70%', badges: l('구매', 'Buy', 'Buy'), speedups: l('필요시만', 'If needed', 'If needed'), color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { discount: '50%', badges: l('선택적', 'Optional', 'Optional'), speedups: l('비권장', 'Skip', 'Skip'), color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { discount: '30%↓', badges: l('비권장', 'Skip', 'Skip'), speedups: l('구매 금지', 'Never', 'Never'), color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  // Never buy items
  const neverBuy = [
    { item: l('직접 가속 버튼 (Direct Speedup)', 'Direct Speedup Button', 'Direct Speedup Button'), reason: l('게임 내 최악의 거래 — 할인 가속 대비 3~5배 손해', 'Worst trade in game — 3-5x worse than discounted speedups', 'Worst trade in game — 3-5x worse than discounted speedups') },
    { item: l('보라 장비 박스', 'Purple Equipment Boxes', 'Purple Equipment Boxes'), reason: l('오렌지가 아니면 가치 없음', 'No value unless orange', 'No value unless orange') },
    { item: l('기본 모집권', 'Basic Recruitment Tickets', 'Basic Recruitment Tickets'), reason: l('효율 극히 낮음', 'Extremely low efficiency', 'Extremely low efficiency') },
    { item: l('자원 선택 상자', 'Resource Choice Crates', 'Resource Choice Crates'), reason: l('ROI 극히 낮음 — 채집이 10~50배 효율적', 'Very low ROI — gathering is 10-50x better', 'Very low ROI — gathering is 10-50x better') },
    { item: l('일반 보라 영웅 조각', 'Ordinary Purple Hero Fragments', 'Ordinary Purple Hero Fragments'), reason: l('오렌지 조각만 투자 가치 있음', 'Only orange fragments worth investing', 'Only orange fragments worth investing') },
    { item: l('이벤트 외 에너지코어 직접 구매', 'Power Cores outside events', 'Power Cores outside events'), reason: l('좀비폭군에서 주 500개 무료 획득 가능', 'Get 500 free weekly from Tyrant', 'Get 500 free weekly from Tyrant') },
    { item: l('정가 가속 (할인 없이)', 'Full-price Speedups', 'Full-price Speedups'), reason: l('연맹 대결 테마와 행운 할인에 맞춰 할인 구매만', 'Only buy discounted, timed with AD and Lucky Discounter', 'Only buy discounted, timed with Alliance Duel and Lucky Discounter') },
  ];

  // Free diamond sources
  const freeDiamondSources = [
    { source: l('난폭 두목 업적', 'Furylord Achievements', 'Furylord Achievements'), note: l('매일 4회 공격', 'Use all 4 daily attacks', 'Use all 4 daily attacks') },
    { source: l('아레나 순위 보상', 'Arena Rank Rewards', 'Arena Rank Rewards'), note: l('주간 1k-5k', '1k-5k weekly', '1k-5k weekly') },
    { source: l('월드맵 다이아 노드', 'World Map Diamond Nodes', 'World Map Diamond Nodes'), note: l('정기 확인', 'Check regularly', 'Check regularly') },
    { source: l('SVS 개인 박스', 'SVS Personal Boxes', 'SVS Personal Boxes'), note: l('적극 참여', 'Participate actively', 'Participate actively') },
    { source: l('이벤트 마일스톤', 'Event Milestones', 'Event Milestones'), note: l('목표 달성', 'Hit targets', 'Hit targets') },
    { source: l('리딤 코드', 'Redeem Codes', 'Redeem Codes'), note: l('공식 채널 확인', 'Check official channels', 'Check official channels') },
  ];

  const tips = [
    l(
      '행운 할인 90%에서 경찰휘장 구매 = 특권상점 대비 5배 효율',
      'Buying badges at 90% Lucky Discounter = 5x value vs VIP Shop',
      'Buying Badges at 90% Lucky Discounter = 5x value vs VIP Shop'
    ),
    l(
      '이벤트 일정에 맞춰 구매 - 골드렌치는 차량 개조 테마 때',
      'Match purchases with events - Golden Wrenches during Vehicle Boost',
      'Match purchases with events - Golden Wrenches during Vehicle Boost'
    ),
    l(
      '에너지코어는 이벤트로 주 150-250개 획득 가능 - 직접 구매 불필요',
      'Power Cores: earn 150-250 weekly via events - no need to buy',
      'Power Cores: earn 150-250 weekly via events - no need to buy'
    ),
    l(
      '실제 사례: 행운 할인으로 42,000 경찰휘장 = 30,700 다이아 (특권상점 63,000 다이아)',
      'Real case: 42,000 badges via Lucky Discounter = 30,700 diamonds (vs 63,000 in VIP Shop)',
      'Real example: 42,000 Badges via Lucky Discounter = 30,700 diamonds (vs 63,000 in VIP Shop)'
    ),
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
            {l('상점 & 다이아 사용 가이드', 'Shop & Diamond Spending Guide', 'Shop & Diamond Spending Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '각 상점별 구매 가이드와 효율적인 다이아 사용법을 알아봅니다.',
              'Learn shop-by-shop purchase recommendations and efficient diamond spending.',
              'Learn shop-by-shop purchase recommendations and efficient diamond spending.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Key Takeaways', 'Key Takeaways')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('행운 할인 90% = 특권상점 대비 5배 효율', 'Lucky Discounter 90% = 5x value vs VIP Shop', 'Lucky Discounter at 90% = 5x value vs VIP Shop')}</li>
              <li>• {l('필수 구매: Key Licenses, 4명 건설자, 피난민 모집권', 'Essential: Key Licenses, 4 Builders, Refugee Tickets', 'Essential: Key Licenses, 4 Builders, Refugee Recruitment Tickets')}</li>
              <li>• {l('직접 가속 버튼, 보라 장비 박스 = 절대 구매 금지', 'Never buy: Direct Speedup, Purple Equipment Boxes', 'Never buy: Direct Speedup, Purple Equipment Boxes')}</li>
              <li>• {l('이벤트 일정에 맞춰 구매 타이밍 조절', 'Time purchases with event schedules', 'Time purchases with event schedules')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Shop by Shop Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6 text-highlight" />
            {l('상점별 구매 가이드', 'Shop-by-Shop Guide', 'Shop-by-Shop Guide')}
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
                        <Check className="h-3 w-3" /> {l('구매 권장', 'Buy', 'Buy')}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-0.5">
                        {shop.buy.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-400 mb-1 flex items-center gap-1">
                        <X className="h-3 w-3" /> {l('비권장', 'Skip', 'Skip')}
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
            {l('다이아몬드 사용 우선순위', 'Diamond Spending Priority', 'Diamond Spending Priority')}
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
            {l('특권상점 vs 행운 할인 효율 비교', 'VIP Shop vs Lucky Discounter', 'VIP Shop vs Lucky Discounter')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{l('항목', 'Item', 'Item')}</th>
                      <th className="text-left p-2">{l('특권상점', 'VIP Shop', 'VIP Shop')}</th>
                      <th className="text-left p-2">{l('행운 할인 (90%)', 'Lucky Discounter (90%)', 'Lucky Discounter (90%)')}</th>
                      <th className="text-center p-2">{l('효율', 'Value', 'Value')}</th>
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
            {l('행운 할인 구매 기준', 'Lucky Discounter Purchase Guide', 'Lucky Discounter Purchase Guide')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {discountGuide.map((level) => (
              <Card key={level.discount} className={`${level.bg} border-none`}>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold ${level.color}`}>{level.discount}</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      {l('경찰휘장', 'Badges', 'Badges')}: <span className={level.color}>{level.badges}</span>
                    </p>
                    <p className="text-muted-foreground">
                      {l('가속', 'Speedups', 'Speedups')}: <span className={level.color}>{level.speedups}</span>
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
                  {l('절대 구매 금지 항목', 'Never Purchase', 'Never Purchase')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {neverBuy.map((entry, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X className="h-3 w-3 text-destructive shrink-0 mt-1" />
                      <div>
                        <span className="font-medium text-foreground/80">{entry.item}</span>
                        <span className="text-xs text-muted-foreground/70"> — {entry.reason}</span>
                      </div>
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
            {l('무료 다이아몬드 획득처', 'Free Diamond Sources', 'Free Diamond Sources')}
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
          <h2 className="text-2xl font-bold">{l('팁', 'Tips', 'Tips')}</h2>
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
