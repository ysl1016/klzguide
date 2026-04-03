import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Percent, Lightbulb, AlertTriangle, Ticket, Award, Target, Calendar } from 'lucide-react';

export default async function LuckyDiscounterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LuckyDiscounterContent locale={locale} />;
}

function LuckyDiscounterContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const guaranteedDiscounts = [
    { attempt: '5', discount: '90%', note: l('첫 보장', 'Đảm bảo đầu', '1st guarantee') },
    { attempt: '9', discount: '90%', note: l('두 번째 보장', 'Đảm bảo thứ 2', '2nd guarantee') },
    { attempt: '18', discount: '90%', note: l('세 번째 보장', 'Đảm bảo thứ 3', '3rd guarantee') },
    { attempt: '32', discount: '90%', note: l('네 번째 보장', 'Đảm bảo thứ 4', '4th guarantee') },
  ];

  const ticketStrategies = [
    {
      tickets: '9',
      months: l('~2개월', '~2 tháng', '~2 months'),
      result: l('최소 투자', 'Đầu tư tối thiểu', 'Minimum investment'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: l('2회 90% 할인 보장', '2 lần giảm 90% đảm bảo', '2 guaranteed 90% discounts'),
    },
    {
      tickets: '18',
      months: l('~4-5개월', '~4-5 tháng', '~4-5 months'),
      result: l('권장', 'Khuyến nghị', 'Recommended'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: l('3회 90% 할인 보장', '3 lần giảm 90% đảm bảo', '3 guaranteed 90% discounts'),
      recommended: true,
    },
    {
      tickets: '32',
      months: l('~8개월', '~8 tháng', '~8 months'),
      result: l('최대 효율', 'Hiệu quả tối đa', 'Maximum efficiency'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: l('4회 90% 할인 보장', '4 lần giảm 90% đảm bảo', '4 guaranteed 90% discounts'),
    },
  ];

  const valueComparison = [
    {
      source: l('행운 할인 (90%)', 'Lucky Discounter (90%)', 'Lucky Discounter (90%)'),
      efficiency: '5x',
      note: l('특권상점 대비 5배 효율', 'Hiệu quả gấp 5 lần VIP Shop', '5x more efficient than VIP Shop'),
      color: 'text-green-400',
    },
    {
      source: l('특권상점', 'VIP Shop', 'VIP Shop'),
      efficiency: '1x',
      note: l('기준 효율', 'Hiệu quả cơ bản', 'Baseline efficiency'),
      color: 'text-gray-400',
    },
  ];

  const tips = [
    l(
      '경찰휘장 파밍의 핵심 이벤트 - 다른 곳에서 경찰휘장 구매 금지!',
      'Sự kiện chính để farm badge - KHÔNG mua badge ở nơi khác!',
      'The key event for Badge farming - do NOT buy Badges anywhere else!'
    ),
    l(
      '티켓을 미리 모아두고 보장 횟수까지 사용',
      'Tích ticket trước và dùng đến số lần đảm bảo',
      'Save tickets in advance and use them up to the guaranteed attempts'
    ),
    l(
      '90% 할인이 아니면 재시도 - 낮은 할인율은 스킵',
      'Không được 90% thì thử lại - bỏ qua tỷ lệ giảm thấp',
      'If it is not 90%, try again - skip low discount rates'
    ),
    l(
      '약 4주마다 개최 - 티켓 획득 기회 놓치지 말 것',
      'Khoảng 4 tuần/lần - đừng bỏ lỡ cơ hội lấy ticket',
      'Held roughly every 4 weeks - do not miss ticket acquisition opportunities'
    ),
    l(
      '무과금/소과금은 9장 목표, 장기 투자 가능하면 18장+',
      'F2P/ít tiền nhắm 9 ticket, đầu tư dài hạn được thì 18+',
      'F2P/low spenders should aim for 9 tickets; if long-term investing, go for 18+'
    ),
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-advanced">
              {t('difficulty.advanced')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Percent className="h-8 w-8 text-green-400" />
            {l('행운 할인 (Lucky Discounter) 가이드', 'Hướng dẫn Lucky Discounter', 'Lucky Discounter Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '경찰휘장 파밍의 핵심 이벤트입니다. 90% 할인 보장으로 특권상점 대비 5배 효율을 제공합니다.',
              'Sự kiện chính để farm badge. Giảm 90% đảm bảo hiệu quả gấp 5 lần VIP Shop.',
              'The key event for Badge farming. Guaranteed 90% discounts offer 5x efficiency compared to the VIP Shop.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('주기: 약 4주마다 개최', 'Chu kỳ: khoảng 4 tuần/lần', 'Frequency: roughly every 4 weeks')}</li>
              <li>• {l('90% 할인 보장: 5번째, 9번째, 18번째, 32번째 시도', '90% đảm bảo: lần thứ 5, 9, 18, 32', '90% discount guaranteed: 5th, 9th, 18th, 32nd attempt')}</li>
              <li>• {l('특권상점 대비 5배 효율 (경찰휘장 구매)', 'Hiệu quả gấp 5 lần VIP Shop (mua badge)', '5x efficiency vs VIP Shop (for Badge purchases)')}</li>
              <li>• {l('권장 티켓: 최소 9장, 이상적 18장+', 'Ticket khuyến nghị: tối thiểu 9, lý tưởng 18+', 'Recommended tickets: minimum 9, ideally 18+')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Event Schedule */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Calendar className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {l('이벤트 주기', 'Chu kỳ sự kiện', 'Event Frequency')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '행운 할인은 약 4주마다 개최됩니다. 티켓을 미리 모아두고 이벤트가 열리면 보장 횟수까지 사용하세요.',
                    'Lucky Discounter diễn ra khoảng 4 tuần/lần. Tích ticket trước và dùng đến số lần đảm bảo khi event mở.',
                    'Lucky Discounter runs roughly every 4 weeks. Save tickets in advance and use them up to the guaranteed attempts when the event opens.'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 90% Guarantee Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-green-400" />
            {l('90% 할인 보장 횟수', 'Số lần giảm 90% đảm bảo', '90% Discount Guarantee Attempts')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {guaranteedDiscounts.map((item, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-green-500/10">
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">{item.attempt}</p>
                    <p className="text-sm text-muted-foreground">{l('번째 시도', 'lần thử', 'attempt')}</p>
                    <Badge variant="outline" className="mt-2 text-green-400 border-green-400/30">
                      {item.discount} OFF
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ticket Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="h-6 w-6 text-yellow-400" />
            {l('티켓 전략', 'Chiến lược ticket', 'Ticket Strategy')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {ticketStrategies.map((strategy, idx) => (
              <Card
                key={idx}
                className={`${strategy.bg} border-none ${strategy.recommended ? 'ring-2 ring-green-500/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold ${strategy.color}`}>{strategy.tickets}</span>
                    {strategy.recommended && (
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        {l('추천', 'Khuyến nghị', 'Recommended')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{strategy.months}</p>
                  <p className={`font-semibold ${strategy.color} mt-2`}>{strategy.result}</p>
                  <p className="text-xs text-muted-foreground mt-1">{strategy.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Value Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-purple-400" />
            {l('효율 비교', 'So sánh hiệu quả', 'Efficiency Comparison')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {valueComparison.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${idx === 0 ? 'bg-green-500/10' : 'bg-muted/30'}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold ${item.color}`}>{item.source}</p>
                      <span className={`text-2xl font-bold ${item.color}`}>{item.efficiency}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{item.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {l(
                  '※ 행운 할인 90% 할인은 특권상점에서 경찰휘장을 직접 구매하는 것보다 5배 효율적입니다',
                  '※ Giảm 90% Lucky Discounter hiệu quả gấp 5 lần mua badge trực tiếp từ VIP Shop',
                  '※ Lucky Discounter at 90% discount is 5x more efficient than buying Badges directly from the VIP Shop'
                )}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {l('핵심 주의사항', 'Lưu ý quan trọng', 'Critical Notes')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {l('특권상점에서 경찰휘장 직접 구매 금지! 행운 할인 기다리기', 'KHÔNG mua badge trực tiếp từ VIP Shop! Chờ Lucky Discounter', 'Do NOT buy Badges directly from VIP Shop! Wait for Lucky Discounter')}</li>
                  <li>• {l('90% 할인이 아니면 구매 스킵 - 낮은 할인율은 비효율', 'Không phải 90% thì bỏ qua - tỷ lệ thấp không hiệu quả', 'Skip purchases if not 90% - lower discount rates are inefficient')}</li>
                  <li>• {l('티켓 없이 참여하면 손해 - 미리 모아두기', 'Tham gia không có ticket bị thiệt - tích trước', 'Participating without tickets is a waste - save them in advance')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('작동 방식', 'Cách hoạt động', 'How It Works')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">1</span>
                  <span>{l('티켓 1장으로 할인율 뽑기 시도', 'Dùng 1 ticket để quay tỷ lệ giảm', 'Use 1 ticket to spin for a discount rate')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">2</span>
                  <span>{l('랜덤 할인율이 표시됨 (10%~90%)', 'Hiển thị tỷ lệ giảm ngẫu nhiên (10%~90%)', 'A random discount rate is shown (10%-90%)')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">3</span>
                  <span>{l('5/9/18/32번째 시도는 90% 보장', 'Lần thứ 5/9/18/32 đảm bảo 90%', '5th/9th/18th/32nd attempts guarantee 90%')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">4</span>
                  <span>{l('90% 할인 시 경찰휘장 구매 → 최고 효율', 'Giảm 90% thì mua badge → hiệu quả nhất', 'Buy Badges at 90% discount → best efficiency')}</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Value Comparison */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4 space-y-3">
            <p className="font-semibold text-highlight">
              {l('경찰휘장 가치 비교', 'So sánh giá trị Badge', 'Badge Value Comparison')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 rounded-lg bg-green-500/10 text-center">
                <p className="text-green-400 font-bold">{l('행운 할인 90%', 'Lucky Discounter 90%', 'Lucky Discounter 90%')}</p>
                <p className="text-2xl font-bold text-green-400">0.3</p>
                <p className="text-xs text-muted-foreground">{l('다이아/경찰휘장', 'diamond/badge', 'diamond/badge')}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 text-center">
                <p className="text-red-400 font-bold">{l('특권상점 (VIP)', 'VIP Store', 'VIP Shop')}</p>
                <p className="text-2xl font-bold text-red-400">1.5</p>
                <p className="text-xs text-muted-foreground">{l('다이아/경찰휘장', 'diamond/badge', 'diamond/badge')}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {l('행운 할인 90% = VIP 대비 5배 효율', 'Lucky Discounter 90% = hiệu quả gấp 5 lần VIP', 'Lucky Discounter 90% = 5x efficiency vs VIP')}
            </p>
          </CardContent>
        </Card>

        {/* Discount Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('할인율별 구매 전략', 'Chiến lược mua theo mức giảm giá', 'Purchase Strategy by Discount Rate')}
          </h2>
          <div className="grid gap-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
              <Badge className="bg-green-500 text-white font-bold">90%</Badge>
              <span className="text-sm text-muted-foreground">
                {l('경찰휘장 + 가속 모두 구매 — 최고 효율', 'Mua badge + speed-up — hiệu quả nhất', 'Buy Badges + speedups — best efficiency')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
              <Badge className="bg-blue-500 text-white font-bold">70%</Badge>
              <span className="text-sm text-muted-foreground">
                {l('경찰휘장만 구매, 가속은 스킵', 'Chỉ mua badge, bỏ qua speed-up', 'Buy Badges only, skip speedups')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10">
              <Badge className="bg-yellow-500 text-white font-bold">50%</Badge>
              <span className="text-sm text-muted-foreground">
                {l('다이아 여유 있을 때만 경찰휘장 구매', 'Chỉ mua badge khi dư diamond', 'Buy Badges only if you have diamonds to spare')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10">
              <Badge className="bg-red-500 text-white font-bold">30%↓</Badge>
              <span className="text-sm text-muted-foreground">
                {l('전부 스킵 — 티켓 절약', 'Bỏ qua tất cả — tiết kiệm vé', 'Skip everything — save your tickets')}
              </span>
            </div>
          </div>
        </section>

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
