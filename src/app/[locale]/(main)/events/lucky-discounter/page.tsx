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
  const isKorean = locale === 'ko';

  const guaranteedDiscounts = [
    { attempt: '5', discount: '90%', note: isKorean ? '첫 보장' : 'Đảm bảo đầu' },
    { attempt: '9', discount: '90%', note: isKorean ? '두 번째 보장' : 'Đảm bảo thứ 2' },
    { attempt: '18', discount: '90%', note: isKorean ? '세 번째 보장' : 'Đảm bảo thứ 3' },
    { attempt: '32', discount: '90%', note: isKorean ? '네 번째 보장' : 'Đảm bảo thứ 4' },
  ];

  const ticketStrategies = [
    {
      tickets: '9',
      months: isKorean ? '~2개월' : '~2 tháng',
      result: isKorean ? '최소 투자' : 'Đầu tư tối thiểu',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '2회 90% 할인 보장' : '2 lần giảm 90% đảm bảo',
    },
    {
      tickets: '18',
      months: isKorean ? '~4-5개월' : '~4-5 tháng',
      result: isKorean ? '권장' : 'Khuyến nghị',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean ? '3회 90% 할인 보장' : '3 lần giảm 90% đảm bảo',
      recommended: true,
    },
    {
      tickets: '32',
      months: isKorean ? '~8개월' : '~8 tháng',
      result: isKorean ? '최대 효율' : 'Hiệu quả tối đa',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean ? '4회 90% 할인 보장' : '4 lần giảm 90% đảm bảo',
    },
  ];

  const valueComparison = [
    {
      source: isKorean ? '럭키 할인 (90%)' : 'Lucky Discounter (90%)',
      efficiency: '5x',
      note: isKorean ? 'VIP 샵 대비 5배 효율' : 'Hiệu quả gấp 5 lần VIP Shop',
      color: 'text-green-400',
    },
    {
      source: isKorean ? 'VIP 샵' : 'VIP Shop',
      efficiency: '1x',
      note: isKorean ? '기준 효율' : 'Hiệu quả cơ bản',
      color: 'text-gray-400',
    },
  ];

  const tips = [
    isKorean
      ? '뱃지 파밍의 핵심 이벤트 - 다른 곳에서 뱃지 구매 금지!'
      : 'Sự kiện chính để farm badge - KHÔNG mua badge ở nơi khác!',
    isKorean
      ? '티켓을 미리 모아두고 보장 횟수까지 사용'
      : 'Tích ticket trước và dùng đến số lần đảm bảo',
    isKorean
      ? '90% 할인이 아니면 재시도 - 낮은 할인율은 스킵'
      : 'Không được 90% thì thử lại - bỏ qua tỷ lệ giảm thấp',
    isKorean
      ? '약 4주마다 개최 - 티켓 획득 기회 놓치지 말 것'
      : 'Khoảng 4 tuần/lần - đừng bỏ lỡ cơ hội lấy ticket',
    isKorean
      ? '무과금/소과금은 9장 목표, 장기 투자 가능하면 18장+'
      : 'F2P/ít tiền nhắm 9 ticket, đầu tư dài hạn được thì 18+',
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
            {isKorean ? '럭키 할인 (Lucky Discounter) 가이드' : 'Hướng dẫn Lucky Discounter'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '뱃지 파밍의 핵심 이벤트입니다. 90% 할인 보장으로 VIP 샵 대비 5배 효율을 제공합니다.'
              : 'Sự kiện chính để farm badge. Giảm 90% đảm bảo hiệu quả gấp 5 lần VIP Shop.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '주기: 약 4주마다 개최' : 'Chu kỳ: khoảng 4 tuần/lần'}</li>
              <li>• {isKorean ? '90% 할인 보장: 5번째, 9번째, 18번째, 32번째 시도' : '90% đảm bảo: lần thứ 5, 9, 18, 32'}</li>
              <li>• {isKorean ? 'VIP 샵 대비 5배 효율 (뱃지 구매)' : 'Hiệu quả gấp 5 lần VIP Shop (mua badge)'}</li>
              <li>• {isKorean ? '권장 티켓: 최소 9장, 이상적 18장+' : 'Ticket khuyến nghị: tối thiểu 9, lý tưởng 18+'}</li>
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
                  {isKorean ? '이벤트 주기' : 'Chu kỳ sự kiện'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '럭키 할인은 약 4주마다 개최됩니다. 티켓을 미리 모아두고 이벤트가 열리면 보장 횟수까지 사용하세요.'
                    : 'Lucky Discounter diễn ra khoảng 4 tuần/lần. Tích ticket trước và dùng đến số lần đảm bảo khi event mở.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 90% Guarantee Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-green-400" />
            {isKorean ? '90% 할인 보장 횟수' : 'Số lần giảm 90% đảm bảo'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {guaranteedDiscounts.map((item, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-green-500/10">
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">{item.attempt}</p>
                    <p className="text-sm text-muted-foreground">{isKorean ? '번째 시도' : 'lần thử'}</p>
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
            {isKorean ? '티켓 전략' : 'Chiến lược ticket'}
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
                        {isKorean ? '추천' : 'Khuyến nghị'}
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
            {isKorean ? '효율 비교' : 'So sánh hiệu quả'}
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
                {isKorean
                  ? '※ 럭키 할인 90% 할인은 VIP 샵에서 뱃지를 직접 구매하는 것보다 5배 효율적입니다'
                  : '※ Giảm 90% Lucky Discounter hiệu quả gấp 5 lần mua badge trực tiếp từ VIP Shop'}
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
                  {isKorean ? '핵심 주의사항' : 'Lưu ý quan trọng'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? 'VIP 샵에서 뱃지 직접 구매 금지! 럭키 할인 기다리기' : 'KHÔNG mua badge trực tiếp từ VIP Shop! Chờ Lucky Discounter'}</li>
                  <li>• {isKorean ? '90% 할인이 아니면 구매 스킵 - 낮은 할인율은 비효율' : 'Không phải 90% thì bỏ qua - tỷ lệ thấp không hiệu quả'}</li>
                  <li>• {isKorean ? '티켓 없이 참여하면 손해 - 미리 모아두기' : 'Tham gia không có ticket bị thiệt - tích trước'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '작동 방식' : 'Cách hoạt động'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">1</span>
                  <span>{isKorean ? '티켓 1장으로 할인율 뽑기 시도' : 'Dùng 1 ticket để quay tỷ lệ giảm'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">2</span>
                  <span>{isKorean ? '랜덤 할인율이 표시됨 (10%~90%)' : 'Hiển thị tỷ lệ giảm ngẫu nhiên (10%~90%)'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">3</span>
                  <span>{isKorean ? '5/9/18/32번째 시도는 90% 보장' : 'Lần thứ 5/9/18/32 đảm bảo 90%'}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-xs">4</span>
                  <span>{isKorean ? '90% 할인 시 뱃지 구매 → 최고 효율' : 'Giảm 90% thì mua badge → hiệu quả nhất'}</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
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
