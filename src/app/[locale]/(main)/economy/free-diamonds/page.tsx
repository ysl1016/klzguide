import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Diamond, Calendar, Trophy, Target, Gift, Lightbulb } from 'lucide-react';

export default async function FreeDiamondsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FreeDiamondsContent locale={locale} />;
}

function FreeDiamondsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const diamondSources = [
    {
      name: isKorean ? '일일 임무' : 'Nhiệm vụ hàng ngày',
      icon: Calendar,
      diamonds: '50-100',
      frequency: isKorean ? '매일' : 'Hàng ngày',
      tip: isKorean ? '매일 완료 필수' : 'Bắt buộc hoàn thành mỗi ngày',
    },
    {
      name: isKorean ? '주간 임무' : 'Nhiệm vụ hàng tuần',
      icon: Calendar,
      diamonds: '200-500',
      frequency: isKorean ? '매주' : 'Hàng tuần',
      tip: isKorean ? '주간 목표 달성' : 'Đạt mục tiêu hàng tuần',
    },
    {
      name: isKorean ? '연맹 대결' : 'Alliance Duel',
      icon: Trophy,
      diamonds: '100-500',
      frequency: isKorean ? '주 3회' : '3 lần/tuần',
      tip: isKorean ? '활성 연맹 필수' : 'Cần LM hoạt động',
    },
    {
      name: 'SVS',
      icon: Trophy,
      diamonds: '500-2000',
      frequency: isKorean ? '정기' : 'Định kỳ',
      tip: isKorean ? '참여 보상 + 순위 보상' : 'Thưởng tham gia + xếp hạng',
    },
    {
      name: isKorean ? '업적/도전' : 'Thành tựu',
      icon: Target,
      diamonds: isKorean ? '다양' : 'Đa dạng',
      frequency: isKorean ? '1회' : '1 lần',
      tip: isKorean ? '장기 목표 달성 시' : 'Khi đạt mục tiêu dài hạn',
    },
    {
      name: isKorean ? '리딤 코드' : 'Redeem Code',
      icon: Gift,
      diamonds: isKorean ? '다양' : 'Đa dạng',
      frequency: isKorean ? '비정기' : 'Không định kỳ',
      tip: isKorean ? '공식 채널 확인' : 'Kiểm tra kênh chính thức',
    },
  ];

  const spendingPriority = [
    {
      item: isKorean ? '두 번째 연구소' : 'Lab thứ 2',
      priority: 1,
      reason: isKorean ? '연구 속도 2배 - 최우선 구매' : 'Gấp đôi tốc độ NC - ưu tiên mua nhất',
    },
    {
      item: 'VIP',
      priority: 2,
      reason: isKorean ? 'VIP 레벨 상승으로 다양한 보너스' : 'Tăng VIP level cho nhiều bonus',
    },
    {
      item: isKorean ? '영웅 조각' : 'Mảnh anh hùng',
      priority: 3,
      reason: isKorean ? '메인 영웅 성급 업그레이드용' : 'Để nâng sao anh hùng chính',
    },
  ];

  const tips = [
    isKorean
      ? '두 번째 연구소 구매가 가장 효율적인 다이아 사용처'
      : 'Mua Lab thứ 2 là cách dùng diamond hiệu quả nhất',
    isKorean
      ? '일일/주간 임무 놓치지 않기 - 꾸준한 다이아 수입원'
      : 'Không bỏ lỡ nhiệm vụ hàng ngày/tuần - nguồn diamond đều đặn',
    isKorean
      ? '리딤 코드 정기적으로 확인 (공식 SNS, 디스코드)'
      : 'Kiểm tra redeem code định kỳ (SNS, Discord chính thức)',
    isKorean
      ? 'VIP 포인트 아이템으로 VIP 레벨업 - 장기적 보너스'
      : 'Lên VIP bằng item VIP point - bonus dài hạn',
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
            <Diamond className="h-8 w-8 text-highlight" />
            {isKorean ? '무과금 다이아 가이드' : 'Hướng dẫn Diamond F2P'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '무료 다이아 획득처와 효율적인 사용법을 알아봅니다.'
              : 'Tìm hiểu nguồn diamond miễn phí và cách dùng hiệu quả.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '두 번째 연구소 = 다이아 최우선 사용처' : 'Lab thứ 2 = ưu tiên dùng diamond nhất'}</li>
              <li>• {isKorean ? '일일/주간 임무 매일 완료' : 'Hoàn thành nhiệm vụ hàng ngày/tuần mỗi ngày'}</li>
              <li>• {isKorean ? '연맹 대결, SVS 적극 참여' : 'Tích cực tham gia Alliance Duel, SVS'}</li>
              <li>• {isKorean ? '리딤 코드 정기 확인' : 'Kiểm tra redeem code định kỳ'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Diamond Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '다이아 획득처' : 'Nguồn Diamond'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {diamondSources.map((source) => {
              const Icon = source.icon;
              return (
                <Card key={source.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-highlight" />
                      <span className="font-semibold">{source.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-highlight">{source.diamonds}</span>
                      <Badge variant="outline" className="text-xs">{source.frequency}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{source.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Spending Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '다이아 사용 우선순위' : 'Ưu tiên dùng Diamond'}
          </h2>
          <div className="space-y-3">
            {spendingPriority.map((item) => (
              <Card key={item.priority} className={item.priority === 1 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold">
                    {item.priority}
                  </div>
                  <div>
                    <p className="font-semibold">{item.item}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
