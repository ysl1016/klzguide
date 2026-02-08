import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Gem, Lightbulb, AlertTriangle, Wrench, Gift, Calculator, Sparkles, Key, Target, TrendingUp } from 'lucide-react';

export default async function GachaGoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GachaGoContent locale={locale} />;
}

function GachaGoContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const keyExchangeRates = [
    {
      keys: '10',
      wrenches: '2',
      ratio: '5.0',
      efficiency: isKorean ? '최악' : 'Tệ nhất',
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30',
    },
    {
      keys: '60',
      wrenches: '12',
      ratio: '5.0',
      efficiency: isKorean ? '보통' : 'Trung bình',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/30',
    },
    {
      keys: '300',
      wrenches: '70',
      ratio: '4.3',
      efficiency: isKorean ? '최고' : 'Tốt nhất',
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/30',
      recommended: true,
    },
  ];

  const milestoneRewards = [
    {
      points: '5,000',
      rewards: isKorean
        ? '황금렌치 + 보너스 아이템'
        : 'Golden Wrench + bonus items',
    },
    {
      points: '8,000',
      rewards: isKorean
        ? '황금렌치 15개, 개조 청사진, 기프트 바우처'
        : '15 Golden Wrench, Blueprint, Gift Voucher',
    },
    {
      points: '10,000+',
      rewards: isKorean
        ? '추가 황금렌치 및 희귀 아이템'
        : 'Thêm Golden Wrench và item hiếm',
    },
  ];

  const rewards = [
    { name: isKorean ? '황금렌치' : 'Golden Wrench', desc: isKorean ? '최고 보상 - 프리미엄 차량 개조용' : 'Thưởng tốt nhất - cải tạo xe cao cấp', rarity: 'legendary' },
    { name: isKorean ? '키 (Key)' : 'Key', desc: isKorean ? '렌치 교환용 - 300개 모으기 권장' : 'Đổi lấy cờ lê - nên tích 300', rarity: 'epic' },
    { name: isKorean ? '개조 청사진' : 'Modification Blueprint', desc: isKorean ? '차량 개조 재료' : 'Nguyên liệu cải tạo xe', rarity: 'epic' },
    { name: isKorean ? '기프트 박스' : 'Gift Box', desc: isKorean ? '다양한 보상 포함' : 'Chứa nhiều phần thưởng', rarity: 'rare' },
    { name: isKorean ? '가속 아이템' : 'Speedup', desc: isKorean ? '각종 가속 아이템' : 'Các item tăng tốc', rarity: 'common' },
    { name: isKorean ? '기프트 바우처' : 'Gift Voucher', desc: isKorean ? '마일스톤 보상' : 'Thưởng milestone', rarity: 'rare' },
  ];

  const budgetGuide = [
    {
      budget: '15,000',
      pulls: '30',
      result: isKorean ? '최소 참여 (키 축적용)' : 'Tham gia tối thiểu (tích key)',
    },
    {
      budget: '30,000',
      pulls: '60',
      result: isKorean ? '기본 참여' : 'Tham gia cơ bản',
    },
    {
      budget: '55,000',
      pulls: '110',
      result: isKorean ? '적극 참여 (마일스톤 목표)' : 'Tham gia tích cực (nhắm milestone)',
      recommended: true,
    },
    {
      budget: '100,000+',
      pulls: '200+',
      result: isKorean ? '과금 유저' : 'Whale',
    },
  ];

  const tips = [
    isKorean
      ? '키는 다음 이벤트로 이월됨 - 300개 모을 때까지 교환하지 말 것!'
      : 'Key được chuyển sang event tiếp - KHÔNG đổi cho đến khi có 300!',
    isKorean
      ? '300키 → 70렌치 교환이 가장 효율적 (키당 4.3개)'
      : '300 key → 70 cờ lê hiệu quả nhất (4.3 key/cờ lê)',
    isKorean
      ? '렌치당 약 410 다이아 소요 - VIP 상점(300 다이아)보다 비효율'
      : '~410 diamond/cờ lê - kém hiệu quả hơn VIP shop (300 diamond)',
    isKorean
      ? '마일스톤 보상이 핵심 - 예산에 맞는 마일스톤 목표 설정'
      : 'Thưởng milestone là chính - đặt mục tiêu milestone theo ngân sách',
    isKorean
      ? '뽑기 애니메이션 스킵 가능 - 시간 절약'
      : 'Có thể bỏ qua animation quay - tiết kiệm thời gian',
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-pink-400" />
            {isKorean ? '행운의 흔들기 (Lucky Shake) 가이드' : 'Hướng dẫn Lucky Shake'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '다이아몬드로 참여하는 뽑기 이벤트입니다. 키를 모아 렌치로 교환하고, 마일스톤 보상으로 황금렌치를 획득하세요.'
              : 'Sự kiện quay thưởng bằng diamond. Tích key để đổi cờ lê, lấy Golden Wrench từ thưởng milestone.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-baseline gap-2">
                <span className="text-primary">•</span>
                <span>{isKorean ? '비용: 1회 뽑기 = 500 다이아몬드' : 'Chi phí: 1 lần quay = 500 diamond'}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-primary">•</span>
                <span>{isKorean ? '뽑기 → 키 획득 → 키로 렌치 교환' : 'Quay → nhận Key → đổi Key lấy Cờ lê'}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-primary">•</span>
                <span>{isKorean ? '300키 → 70렌치 교환이 최고 효율 (반드시 이것만 사용!)' : '300 key → 70 cờ lê hiệu quả nhất (CHỈ dùng cái này!)'}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-primary">•</span>
                <span>{isKorean ? '키는 다음 이벤트로 이월됨 - 장기 축적 가능' : 'Key chuyển sang event sau - có thể tích lũy dài hạn'}</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-primary">•</span>
                <span>{isKorean ? '마일스톤 포인트로 황금렌치 추가 획득' : 'Nhận thêm Golden Wrench từ điểm milestone'}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cost Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gem className="h-6 w-6 text-highlight" />
            {isKorean ? '비용' : 'Chi phí'}
          </h2>
          <Card className="border-highlight/30 bg-highlight/5">
            <CardContent className="p-6 text-center">
              <p className="text-5xl font-bold text-highlight">500</p>
              <p className="text-lg text-muted-foreground">{isKorean ? '다이아몬드 / 1회 뽑기' : 'diamond / 1 lần quay'}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {isKorean ? '5회 연속 뽑기 = 2,500 다이아' : '5 lần liên tục = 2,500 diamond'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            {isKorean ? '작동 방식' : 'Cách hoạt động'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="font-semibold">{isKorean ? '다이아로 뽑기' : 'Quay bằng diamond'}</p>
                <p className="text-sm text-muted-foreground">
                  {isKorean ? '500 다이아 = 1회' : '500 diamond = 1 lần'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="font-semibold">{isKorean ? '키 획득' : 'Nhận Key'}</p>
                <p className="text-sm text-muted-foreground">
                  {isKorean ? '뽑기마다 키 지급' : 'Mỗi lần quay nhận Key'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="font-semibold">{isKorean ? '키 → 렌치 교환' : 'Đổi Key → Cờ lê'}</p>
                <p className="text-sm text-muted-foreground">
                  {isKorean ? '300키 모아서 교환!' : 'Tích 300 key rồi đổi!'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Exchange Rates */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Key className="h-6 w-6 text-yellow-400" />
            {isKorean ? '키 교환 비율' : 'Tỷ lệ đổi Key'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{isKorean ? '키' : 'Key'}</th>
                      <th className="text-center p-2">{isKorean ? '렌치' : 'Cờ lê'}</th>
                      <th className="text-center p-2">{isKorean ? '키/렌치' : 'Key/Cờ lê'}</th>
                      <th className="text-right p-2">{isKorean ? '효율' : 'Hiệu quả'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyExchangeRates.map((rate, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border/50 ${rate.recommended ? rate.bg : ''}`}
                      >
                        <td className="p-2 font-mono font-bold">{rate.keys}</td>
                        <td className="text-center p-2 font-mono">{rate.wrenches}</td>
                        <td className="text-center p-2 font-mono">{rate.ratio}</td>
                        <td className={`text-right p-2 font-semibold ${rate.color}`}>
                          {rate.efficiency}
                          {rate.recommended && <span className="ml-2">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {isKorean
                  ? '※ 300키 교환만 사용할 것! 다른 옵션은 손해'
                  : '※ CHỈ dùng đổi 300 key! Các tùy chọn khác bị lỗ'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Carry-over Info */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Key className="h-6 w-6 text-green-400 shrink-0" />
              <div>
                <p className="font-semibold text-green-400 mb-1">
                  {isKorean ? '키 이월 시스템' : 'Hệ thống chuyển Key'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '키는 이벤트 종료 후에도 사라지지 않고 다음 행운의 흔들기 이벤트로 이월됩니다. 300개가 될 때까지 모은 후 한 번에 교환하세요!'
                    : 'Key KHÔNG biến mất sau event, được chuyển sang Lucky Shake tiếp theo. Tích cho đến khi có 300 rồi đổi một lần!'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestone Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-400" />
            {isKorean ? '마일스톤 보상' : 'Thưởng Milestone'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                {isKorean
                  ? '뽑기 시 포인트가 누적되며, 일정 포인트 달성 시 추가 보상을 받습니다.'
                  : 'Điểm tích lũy khi quay, đạt điểm nhất định sẽ nhận thêm thưởng.'}
              </p>
              <div className="space-y-3">
                {milestoneRewards.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <span className="font-mono font-bold text-purple-400">
                      {milestone.points} {isKorean ? '포인트' : 'điểm'}
                    </span>
                    <span className="text-sm text-muted-foreground">{milestone.rewards}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-purple-400" />
            {isKorean ? '획득 가능 보상' : 'Phần thưởng có thể nhận'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward, idx) => (
              <Card
                key={idx}
                className={
                  reward.rarity === 'legendary'
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : reward.rarity === 'epic'
                      ? 'border-purple-500/30 bg-purple-500/5'
                      : reward.rarity === 'rare'
                        ? 'border-blue-500/30 bg-blue-500/5'
                        : ''
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`font-semibold ${
                          reward.rarity === 'legendary'
                            ? 'text-yellow-400'
                            : reward.rarity === 'epic'
                              ? 'text-purple-400'
                              : reward.rarity === 'rare'
                                ? 'text-blue-400'
                                : ''
                        }`}
                      >
                        {reward.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{reward.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Golden Wrench Info */}
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Wrench className="h-6 w-6 text-yellow-400 shrink-0" />
              <div>
                <p className="font-semibold text-yellow-400 mb-1">
                  {isKorean ? '황금렌치 (Golden Wrench)' : 'Golden Wrench'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '행운의 흔들기에서 획득 가능한 최고 보상입니다. 프리미엄 차량 개조에 사용되며, 일반 렌치로는 할 수 없는 고급 업그레이드가 가능합니다. 마일스톤 보상에서 확정적으로 획득할 수 있으며, 뽑기에서 직접 나오기도 합니다.'
                    : 'Phần thưởng tốt nhất trong Lucky Shake. Dùng để cải tạo xe cao cấp, có thể nâng cấp mà cờ lê thường không làm được. Có thể nhận chắc chắn từ thưởng milestone, cũng có thể rơi trực tiếp khi quay.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Warning */}
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Calculator className="h-6 w-6 text-orange-400 shrink-0" />
              <div>
                <p className="font-semibold text-orange-400 mb-1">
                  {isKorean ? '효율 비교' : 'So sánh hiệu quả'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '행운의 흔들기에서 렌치 1개당 약 410 다이아가 소요됩니다. VIP 상점에서는 300 다이아에 렌치 구매가 가능하므로, 순수 렌치 획득 목적이라면 VIP 상점이 더 효율적입니다. 행운의 흔들기는 황금렌치와 마일스톤 보상이 목적일 때 참여하세요.'
                    : 'Lucky Shake tốn ~410 diamond/cờ lê. VIP shop bán 300 diamond/cờ lê, hiệu quả hơn nếu chỉ muốn cờ lê. Tham gia Lucky Shake khi muốn Golden Wrench và thưởng milestone.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-green-400" />
            {isKorean ? '예산 가이드' : 'Hướng dẫn ngân sách'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{isKorean ? '예산 (다이아)' : 'Ngân sách (diamond)'}</th>
                      <th className="text-right p-2">{isKorean ? '뽑기 횟수' : 'Số lần quay'}</th>
                      <th className="text-left p-2">{isKorean ? '평가' : 'Đánh giá'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetGuide.map((guide, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border/50 ${guide.recommended ? 'bg-green-500/10' : ''}`}
                      >
                        <td className="p-2 font-mono font-bold">{guide.budget}</td>
                        <td className="text-right p-2 font-mono text-highlight">{guide.pulls}</td>
                        <td className="p-2">
                          {guide.result}
                          {guide.recommended && <span className="ml-2 text-green-400">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {isKorean
                  ? '※ 권장 예산: 30,000~55,000 다이아 (마일스톤 달성 목표)'
                  : '※ Ngân sách khuyến nghị: 30,000~55,000 diamond (đạt milestone)'}
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
                  {isKorean ? '주의사항' : 'Lưu ý'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-baseline gap-2">
                    <span className="text-destructive">•</span>
                    <span>{isKorean ? '10키, 60키 교환은 손해! 반드시 300키 모아서 교환' : 'Đổi 10 key, 60 key bị lỗ! Nhất định phải tích 300 key'}</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-destructive">•</span>
                    <span>{isKorean ? '예산 한도를 미리 정하고 초과 지출 금지!' : 'Đặt giới hạn ngân sách trước và KHÔNG vượt quá!'}</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-destructive">•</span>
                    <span>{isKorean ? '가챠는 도박과 유사 - 충동적 소비 주의' : 'Gacha giống như cờ bạc - cẩn thận tiêu tiền bốc đồng'}</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-destructive">•</span>
                    <span>{isKorean ? '순수 렌치 목적이면 VIP 상점이 더 효율적' : 'Nếu chỉ muốn cờ lê, VIP shop hiệu quả hơn'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-tip" />
            {isKorean ? '팁' : 'Mẹo'}
          </h2>
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
