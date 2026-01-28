import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FlaskConical, AlertTriangle, Lightbulb, Target, Shield, Swords, Users } from 'lucide-react';

export default async function ResearchPriorityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ResearchPriorityContent locale={locale} />;
}

function ResearchPriorityContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const researchTrees = [
    {
      name: isKorean ? '영웅 훈련 (Hero Training)' : 'Hero Training',
      icon: Users,
      priority: 1,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      description: isKorean
        ? 'Cockpit까지만 진행. 이후는 배지 대비 효율이 극히 낮음 (배지 함정)'
        : 'Chỉ làm tới Cockpit. Sau đó hiệu quả badge cực thấp (bẫy badge)',
      tip: isKorean ? '※ 최대 레벨까지 하면 400 ATK/DEF 증가에 엄청난 배지 소모' : '※ Max level chỉ tăng 400 ATK/DEF với chi phí badge khổng lồ',
    },
    {
      name: isKorean ? '군사 전략 (Military Strategies)' : 'Military Strategies',
      icon: Swords,
      priority: 2,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      description: isKorean
        ? '병력 HP 버프에 집중. Elite Troops 100% 완료 후 해금'
        : 'Tập trung buff HP quân. Mở sau khi hoàn thành 100% Elite Troops',
      tip: isKorean ? '※ HP 연구는 생존력 + 전투력 동시 상승' : '※ NC HP tăng cả sinh tồn + sức mạnh',
    },
    {
      name: isKorean ? '평화 방패 (Peace Shield)' : 'Peace Shield',
      icon: Shield,
      priority: 3,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      description: isKorean
        ? 'Urgent Rescue 해금 (-20% 병력 손실). Shelter 50% + Military 45% 필요'
        : 'Mở Urgent Rescue (-20% mất quân). Cần Shelter 50% + Military 45%',
      tip: isKorean ? '※ Urgent Rescue: 10랭크, 방어 플레이어 필수' : '※ Urgent Rescue: 10 rank, bắt buộc cho phòng thủ',
    },
    {
      name: isKorean ? '공성전 (Siege to Seize)' : 'Siege to Seize',
      icon: Target,
      priority: 4,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      description: isKorean
        ? '공격 보너스 제공. Military Strategies 40% 필요. 방어 선호 시 스킵 가능'
        : 'Bonus tấn công. Cần Military Strategies 40%. Có thể bỏ qua nếu thích phòng thủ',
      tip: isKorean ? '※ 100% 완료 시 Field Research 해금' : '※ 100% hoàn thành mở Field Research',
    },
  ];

  const skipList = [
    {
      name: isKorean ? 'Hero Training 최대 레벨' : 'Hero Training max level',
      reason: isKorean ? '비용 대비 효과 극히 낮음' : 'Hiệu quả so với chi phí cực thấp',
    },
    {
      name: isKorean ? 'Move Out (레벨 10-20 이상)' : 'Move Out (trên level 10-20)',
      reason: isKorean ? '이동 속도 증가 미미' : 'Tăng tốc độ di chuyển không đáng kể',
    },
    {
      name: isKorean ? 'Fully Armed Alliance (초반)' : 'Fully Armed Alliance (đầu game)',
      reason: isKorean ? '나중에 필요할 때 진행' : 'Làm sau khi cần',
    },
    {
      name: isKorean ? 'Siege to Seize (방어 선호 시)' : 'Siege to Seize (nếu thích phòng thủ)',
      reason: isKorean ? '공격 성향이 아니면 스킵' : 'Bỏ qua nếu không thiên về tấn công',
    },
  ];

  const badgeCosts = [
    { name: 'Urgent Rescue', badges: '~50K', note: isKorean ? '10랭크' : '10 rank' },
    { name: 'T10 Units (UST)', badges: '~1.4M', note: isKorean ? 'F2P 수년 소요' : 'F2P mất nhiều năm' },
    { name: 'Recharge Shield', badges: '594K', note: isKorean ? 'Field Research' : 'Field Research' },
  ];

  const tips = [
    isKorean
      ? '두 번째 연구소 구매 필수 - 연구 속도 2배'
      : 'Bắt buộc mua Lab thứ 2 - gấp đôi tốc độ NC',
    isKorean
      ? '수도 버프와 동기화 - 연구 시간 1시간 감소'
      : 'Đồng bộ với buff thủ đô - giảm 1 giờ NC',
    isKorean
      ? '별과 가속 아이템은 연구 이벤트에 저장'
      : 'Lưu sao và tăng tốc cho sự kiện NC',
    isKorean
      ? '연맹 대결 "과학의 시대" 테마 날에 연구 가속 사용'
      : 'Dùng tăng tốc NC vào ngày theme "Age of Science" của Alliance Duel',
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
              15 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-highlight" />
            {isKorean ? '연구 우선순위 가이드' : 'Hướng dẫn ưu tiên Nghiên cứu'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '어떤 연구를 먼저 해야 하는지, 어떤 것을 스킵해야 하는지 알아봅니다.'
              : 'Tìm hiểu nên NC gì trước, nên bỏ qua gì.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '연맹 인정(AR) 최우선 - 일일 보상 2배' : 'Alliance Recognition ưu tiên nhất - gấp đôi phần thưởng'}</li>
              <li>• {isKorean ? 'Hero Training은 Cockpit까지만 (배지 함정 주의)' : 'Hero Training chỉ tới Cockpit (cẩn thận bẫy badge)'}</li>
              <li>• {isKorean ? 'HP 연구 집중 - 생존력 + 전투력 동시 증가' : 'Tập trung NC HP - tăng sinh tồn + sức mạnh'}</li>
              <li>• {isKorean ? '두 번째 연구소 구매로 속도 2배' : 'Mua Lab thứ 2 để gấp đôi tốc độ'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Alliance Recognition Priority */}
        <Card className="border-highlight/50 bg-highlight/5">
          <CardHeader>
            <CardTitle className="text-highlight flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              {isKorean ? '최우선: 연맹 인정 (Alliance Recognition)' : 'Ưu tiên nhất: Alliance Recognition'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {isKorean
                ? '다른 모든 연구보다 먼저 완료하세요. 일일 보상(배지, 합금, 조각)이 2배가 되어 이후 모든 성장이 가속화됩니다.'
                : 'Hoàn thành trước mọi NC khác. Phần thưởng hàng ngày (badge, hợp kim, mảnh) tăng gấp đôi, tăng tốc mọi phát triển sau đó.'}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <p className="text-xl font-bold text-yellow-400">2x</p>
                <p className="text-xs text-muted-foreground">{isKorean ? '배지' : 'Badge'}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <p className="text-xl font-bold text-purple-400">2x</p>
                <p className="text-xs text-muted-foreground">{isKorean ? '합금' : 'Hợp kim'}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-xl font-bold text-blue-400">2x</p>
                <p className="text-xs text-muted-foreground">{isKorean ? '조각' : 'Mảnh'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Trees */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '연구 트리 우선순위' : 'Thứ tự ưu tiên cây NC'}
          </h2>
          <div className="space-y-3">
            {researchTrees.map((tree) => {
              const Icon = tree.icon;
              return (
                <Card key={tree.priority} className={`${tree.border} ${tree.bg}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ${tree.color} font-bold text-lg`}>
                        {tree.priority}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-5 w-5 ${tree.color}`} />
                          <h3 className={`font-semibold ${tree.color}`}>{tree.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{tree.description}</p>
                        <p className="text-xs text-muted-foreground/70">{tree.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Badge Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '주요 연구 배지 비용' : 'Chi phí badge NC chính'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {badgeCosts.map((cost, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 text-center">
                  <p className="font-semibold">{cost.name}</p>
                  <p className="text-2xl font-bold text-yellow-400 my-2">{cost.badges}</p>
                  <p className="text-xs text-muted-foreground">{cost.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {isKorean
              ? '※ T10 병종(UST)은 F2P 기준 수년 소요, 과금 시 약 $15,000 필요'
              : '※ T10 (UST) F2P mất nhiều năm, nạp tiền cần ~$15,000'}
          </p>
        </section>

        {/* What to Skip */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {isKorean ? '스킵/지연 권장' : 'Nên bỏ qua/trì hoãn'}
          </h2>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 space-y-3">
              {skipList.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-destructive shrink-0 mt-2" />
                  <div>
                    <p className="font-medium text-destructive">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '연구 팁' : 'Mẹo NC'}
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

        {/* Unlock Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>{isKorean ? '연구 트리 해금 조건' : 'Điều kiện mở cây NC'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">Elite Troops 100%</span>
                <span className="text-muted-foreground">→</span>
                <span>Military Strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">Shelter 50% + Military 45%</span>
                <span className="text-muted-foreground">→</span>
                <span>Peace Shield</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">Military Strategies 40%</span>
                <span className="text-muted-foreground">→</span>
                <span>Siege to Seize</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">Siege to Seize 100%</span>
                <span className="text-muted-foreground">→</span>
                <span>Field Research</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
