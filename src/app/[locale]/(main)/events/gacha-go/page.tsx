import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Gem, Lightbulb, AlertTriangle, Key, Wrench, Gift, Calculator } from 'lucide-react';

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

  const costInfo = [
    {
      cost: '500',
      result: isKorean ? '1회 뽑기' : '1 lần quay',
      note: isKorean ? '기본 비용' : 'Chi phí cơ bản',
    },
    {
      cost: '5,000',
      result: isKorean ? '10연차 + 보너스' : '10 lần + bonus',
      note: isKorean ? '10연차 권장' : 'Khuyến nghị quay 10',
    },
  ];

  const keyExchangeRates = [
    {
      keys: '100',
      wrenches: '20',
      ratio: '5.0',
      efficiency: isKorean ? '낮음' : 'Thấp',
      color: 'text-red-400',
    },
    {
      keys: '200',
      wrenches: '50',
      ratio: '4.0',
      efficiency: isKorean ? '보통' : 'Trung bình',
      color: 'text-yellow-400',
    },
    {
      keys: '300',
      wrenches: '70',
      ratio: '4.3',
      efficiency: isKorean ? '최고' : 'Tốt nhất',
      color: 'text-green-400',
      recommended: true,
    },
  ];

  const rewards = [
    { name: isKorean ? '황금렌치' : 'Golden Wrench', desc: isKorean ? '희귀 차량 개조 아이템' : 'Item cải tạo xe hiếm', rarity: 'legendary' },
    { name: isKorean ? '청사진' : 'Blueprint', desc: isKorean ? '차량 업그레이드용' : 'Nâng cấp xe', rarity: 'epic' },
    { name: isKorean ? '기프트 박스' : 'Gift Box', desc: isKorean ? '랜덤 고급 아이템' : 'Item cao cấp ngẫu nhiên', rarity: 'epic' },
    { name: isKorean ? '열쇠' : 'Key', desc: isKorean ? '렌치 교환용' : 'Đổi lấy cờ lê', rarity: 'common' },
  ];

  const budgetGuide = [
    {
      budget: '30,000',
      pulls: '~60',
      keys: '~200',
      result: isKorean ? '기본 참여' : 'Tham gia cơ bản',
    },
    {
      budget: '45,000',
      pulls: '~90',
      keys: '~300',
      result: isKorean ? '최적 교환 1회' : '1 lần đổi tối ưu',
    },
    {
      budget: '55,000',
      pulls: '~110',
      keys: '~400',
      result: isKorean ? '권장 예산' : 'Ngân sách khuyến nghị',
    },
  ];

  const tips = [
    isKorean
      ? '키는 이벤트 간 이월됨! 300개 모을 때까지 저축하고 최적 교환'
      : 'Key chuyển tiếp giữa các event! Tích đến 300 rồi đổi tối ưu',
    isKorean
      ? '300 키 → 70 렌치 (4.3 키/렌치) = 최고 효율'
      : '300 key → 70 cờ lê (4.3 key/cờ lê) = hiệu quả nhất',
    isKorean
      ? '10연차가 단일 뽑기보다 효율적 - 보너스 포함'
      : 'Quay 10 hiệu quả hơn quay 1 - có bonus',
    isKorean
      ? '무과금/소과금은 키 저축에 집중, 대과금은 황금렌치 노림'
      : 'F2P/ít tiền tập trung tích key, whale nhắm Golden Wrench',
    isKorean
      ? '예산 한도 미리 정하고 초과 지출 금지'
      : 'Đặt giới hạn ngân sách trước và KHÔNG vượt quá',
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
            <Gem className="h-8 w-8 text-pink-400" />
            {isKorean ? '가챠 고 (Gacha Go) 가이드' : 'Hướng dẫn Gacha Go'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '다이아몬드로 참여하는 뽑기 이벤트입니다. 황금렌치와 렌치 획득의 핵심 콘텐츠입니다.'
              : 'Sự kiện quay thưởng bằng diamond. Nội dung chính để lấy Golden Wrench và cờ lê.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '비용: 500 다이아 = 1회 뽑기, 5,000 다이아 = 10연차' : 'Chi phí: 500 diamond = 1 lần, 5,000 diamond = 10 lần'}</li>
              <li>• {isKorean ? '핵심 보상: 황금렌치, 청사진, 기프트 박스' : 'Thưởng chính: Golden Wrench, Blueprint, Gift Box'}</li>
              <li>• {isKorean ? '최적 교환: 300 키 → 70 렌치 (4.3 키/렌치)' : 'Đổi tối ưu: 300 key → 70 cờ lê (4.3 key/cờ lê)'}</li>
              <li>• {isKorean ? '키는 이벤트 간 이월됨 - 300개 모아서 교환!' : 'Key chuyển tiếp - tích 300 rồi đổi!'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Cost Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gem className="h-6 w-6 text-highlight" />
            {isKorean ? '비용' : 'Chi phí'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {costInfo.map((info, idx) => (
              <Card key={idx} className={idx === 1 ? 'border-highlight/30 bg-highlight/5' : ''}>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-highlight">{info.cost}</p>
                  <p className="text-sm text-muted-foreground">{isKorean ? '다이아' : 'diamond'}</p>
                  <p className="font-semibold mt-2">{info.result}</p>
                  <p className="text-xs text-muted-foreground">{info.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Exchange Rates */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Key className="h-6 w-6 text-yellow-400" />
            {isKorean ? '키 → 렌치 교환 비율' : 'Tỷ lệ đổi Key → Cờ lê'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{isKorean ? '키' : 'Key'}</th>
                      <th className="text-right p-2">{isKorean ? '렌치' : 'Cờ lê'}</th>
                      <th className="text-right p-2">{isKorean ? '비율' : 'Tỷ lệ'}</th>
                      <th className="text-left p-2">{isKorean ? '효율' : 'Hiệu quả'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyExchangeRates.map((rate, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border/50 ${rate.recommended ? 'bg-green-500/10' : ''}`}
                      >
                        <td className="p-2 font-mono">{rate.keys}</td>
                        <td className="text-right p-2 font-mono text-highlight">{rate.wrenches}</td>
                        <td className="text-right p-2 font-mono">{rate.ratio}</td>
                        <td className={`p-2 font-semibold ${rate.color}`}>
                          {rate.efficiency}
                          {rate.recommended && <span className="ml-2">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {isKorean
                  ? '※ 300 키 교환이 최고 효율 - 키는 이벤트 간 이월되므로 모아서 교환!'
                  : '※ Đổi 300 key hiệu quả nhất - key chuyển tiếp nên tích rồi đổi!'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Carryover Info */}
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Key className="h-6 w-6 text-yellow-400 shrink-0" />
              <div>
                <p className="font-semibold text-yellow-400 mb-1">
                  {isKorean ? '키 이월 시스템' : 'Hệ thống chuyển tiếp Key'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '가챠 고에서 획득한 키는 이벤트가 끝나도 사라지지 않습니다. 다음 가챠 고 이벤트로 이월되므로, 300개를 모을 때까지 저축하고 최적 비율로 교환하세요.'
                    : 'Key nhận được trong Gacha Go không mất khi event kết thúc. Chuyển sang event Gacha Go tiếp theo nên tích đến 300 rồi đổi với tỷ lệ tối ưu.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-purple-400" />
            {isKorean ? '주요 보상' : 'Phần thưởng chính'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {rewards.map((reward, idx) => (
              <Card
                key={idx}
                className={
                  reward.rarity === 'legendary'
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : reward.rarity === 'epic'
                      ? 'border-purple-500/30 bg-purple-500/5'
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
                              : ''
                        }`}
                      >
                        {reward.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{reward.desc}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        reward.rarity === 'legendary'
                          ? 'text-yellow-400 border-yellow-400/30'
                          : reward.rarity === 'epic'
                            ? 'text-purple-400 border-purple-400/30'
                            : ''
                      }
                    >
                      {reward.rarity === 'legendary'
                        ? isKorean ? '레전드' : 'Legend'
                        : reward.rarity === 'epic'
                          ? isKorean ? '에픽' : 'Epic'
                          : isKorean ? '일반' : 'Common'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
                      <th className="text-right p-2">{isKorean ? '예상 키' : 'Key dự kiến'}</th>
                      <th className="text-left p-2">{isKorean ? '결과' : 'Kết quả'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetGuide.map((guide, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border/50 ${idx === 2 ? 'bg-green-500/10' : ''}`}
                      >
                        <td className="p-2 font-mono font-bold">{guide.budget}</td>
                        <td className="text-right p-2 font-mono">{guide.pulls}</td>
                        <td className="text-right p-2 font-mono text-highlight">{guide.keys}</td>
                        <td className="p-2">{guide.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  <li>• {isKorean ? '예산 한도를 미리 정하고 초과 지출 금지!' : 'Đặt giới hạn ngân sách trước và KHÔNG vượt quá!'}</li>
                  <li>• {isKorean ? '황금렌치 확률은 매우 낮음 - 기대하지 말 것' : 'Tỷ lệ Golden Wrench rất thấp - đừng kỳ vọng'}</li>
                  <li>• {isKorean ? '키 100개 교환은 비효율 - 300개 모을 때까지 기다림' : 'Đổi 100 key không hiệu quả - chờ đến 300'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
