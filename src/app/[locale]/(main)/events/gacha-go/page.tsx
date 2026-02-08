import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Gem, Lightbulb, AlertTriangle, Wrench, Gift, Calculator, Sparkles } from 'lucide-react';

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
      cost: '100',
      result: isKorean ? '1회 뽑기' : '1 lần quay',
      note: isKorean ? '기본 비용' : 'Chi phí cơ bản',
    },
    {
      cost: '500',
      result: isKorean ? '5회 연속뽑기' : '5 lần liên tục',
      note: isKorean ? '5연차 권장' : 'Khuyến nghị quay 5',
      recommended: true,
    },
  ];

  const rewards = [
    { name: isKorean ? '황금렌치' : 'Golden Wrench', desc: isKorean ? '희귀 차량 개조 아이템 - 최고 보상' : 'Item cải tạo xe hiếm - thưởng tốt nhất', rarity: 'legendary' },
    { name: isKorean ? '일반 렌치' : 'Wrench', desc: isKorean ? '차량 개조 기본 재화' : 'Tiền tệ cải tạo xe cơ bản', rarity: 'epic' },
    { name: isKorean ? '청사진' : 'Blueprint', desc: isKorean ? '차량 업그레이드용' : 'Nâng cấp xe', rarity: 'epic' },
    { name: isKorean ? '차량 부품' : 'Vehicle Parts', desc: isKorean ? '차량 강화 재료' : 'Nguyên liệu nâng cấp xe', rarity: 'rare' },
    { name: isKorean ? '가속 아이템' : 'Speedup', desc: isKorean ? '각종 가속 아이템' : 'Các item tăng tốc', rarity: 'common' },
    { name: isKorean ? '자원' : 'Resources', desc: isKorean ? '식량, 목재, 철강 등' : 'Thực phẩm, gỗ, thép...', rarity: 'common' },
  ];

  const budgetGuide = [
    {
      budget: '1,000',
      pulls: '10',
      result: isKorean ? '최소 참여' : 'Tham gia tối thiểu',
    },
    {
      budget: '2,500',
      pulls: '25',
      result: isKorean ? '기본 참여' : 'Tham gia cơ bản',
    },
    {
      budget: '5,000',
      pulls: '50',
      result: isKorean ? '적극 참여' : 'Tham gia tích cực',
    },
    {
      budget: '10,000',
      pulls: '100',
      result: isKorean ? '과금 유저 권장' : 'Khuyến nghị cho whale',
      recommended: true,
    },
  ];

  const tips = [
    isKorean
      ? '5회 연속뽑기가 1회씩 5번보다 효율적 - 보너스 포함 가능성'
      : 'Quay 5 lần liên tục hiệu quả hơn quay 1 lần x5 - có thể có bonus',
    isKorean
      ? '황금렌치 확률은 매우 낮음 - 렌치/청사진을 주 목표로'
      : 'Tỷ lệ Golden Wrench rất thấp - nhắm vào cờ lê/bản vẽ',
    isKorean
      ? '무과금/소과금은 예산 한도 미리 정하고 초과 금지'
      : 'F2P/ít tiền đặt giới hạn ngân sách trước và KHÔNG vượt quá',
    isKorean
      ? '차량 개조 관련 이벤트(연맹 대결 1일차)와 겹치면 활용 극대화'
      : 'Kết hợp với event cải tạo xe (Alliance Duel ngày 1) để tối ưu',
    isKorean
      ? '이벤트 마지막 날까지 기다렸다가 필요 시에만 추가 뽑기'
      : 'Chờ đến ngày cuối event rồi mới quay thêm nếu cần',
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
              6 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-pink-400" />
            {isKorean ? '행운의 흔들기 (Lucky Shake) 가이드' : 'Hướng dẫn Lucky Shake'}
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
              <li>• {isKorean ? '비용: 100 다이아 = 1회 뽑기, 500 다이아 = 5회 연속뽑기' : 'Chi phí: 100 diamond = 1 lần, 500 diamond = 5 lần liên tục'}</li>
              <li>• {isKorean ? '핵심 보상: 황금렌치, 일반 렌치, 청사진, 차량 부품' : 'Thưởng chính: Golden Wrench, Cờ lê, Blueprint, Linh kiện xe'}</li>
              <li>• {isKorean ? '황금렌치 확률 매우 낮음 - 과도한 기대 금지' : 'Tỷ lệ Golden Wrench rất thấp - đừng kỳ vọng quá'}</li>
              <li>• {isKorean ? '5회 연속뽑기가 효율적' : 'Quay 5 lần liên tục hiệu quả hơn'}</li>
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
              <Card key={idx} className={info.recommended ? 'border-highlight/30 bg-highlight/5' : ''}>
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-highlight">{info.cost}</p>
                  <p className="text-sm text-muted-foreground">{isKorean ? '다이아' : 'diamond'}</p>
                  <p className="font-semibold mt-2">{info.result}</p>
                  <p className="text-xs text-muted-foreground">{info.note}</p>
                  {info.recommended && (
                    <Badge className="mt-2 bg-highlight text-highlight-foreground">
                      {isKorean ? '권장' : 'Khuyến nghị'}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-purple-400" />
            {isKorean ? '주요 보상' : 'Phần thưởng chính'}
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
                    ? '행운의 흔들기에서 획득 가능한 최고 보상입니다. 프리미엄 차량 개조에 사용되며, 일반 렌치로는 할 수 없는 고급 업그레이드가 가능합니다. 단, 확률이 매우 낮으므로 황금렌치만을 목표로 과도한 다이아 소비는 권장하지 않습니다.'
                    : 'Phần thưởng tốt nhất trong Lucky Shake. Dùng để cải tạo xe cao cấp, có thể nâng cấp mà cờ lê thường không làm được. Tuy nhiên, tỷ lệ rất thấp nên không khuyến nghị tiêu quá nhiều diamond chỉ để nhắm vào Golden Wrench.'}
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
                  ? '※ 무과금/소과금 유저는 1,000~2,500 다이아 범위 권장'
                  : '※ F2P/ít tiền nên giới hạn 1,000~2,500 diamond'}
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
                  <li>• {isKorean ? '예산 한도를 미리 정하고 초과 지출 금지!' : 'Đặt giới hạn ngân sách trước và KHÔNG vượt quá!'}</li>
                  <li>• {isKorean ? '황금렌치 확률은 매우 낮음 - 기대하지 말 것' : 'Tỷ lệ Golden Wrench rất thấp - đừng kỳ vọng'}</li>
                  <li>• {isKorean ? '가챠는 도박과 유사 - 충동적 소비 주의' : 'Gacha giống như cờ bạc - cẩn thận tiêu tiền bốc đồng'}</li>
                  <li>• {isKorean ? '다이아는 다른 중요 용도에도 필요 - 분배 고려' : 'Diamond còn cần cho nhiều thứ khác - cân nhắc phân bổ'}</li>
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
