import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Star, Users, Lightbulb, AlertTriangle, Shield, Swords, Target } from 'lucide-react';

export default async function HeroLevelingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeroLevelingContent locale={locale} />;
}

function HeroLevelingContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const starPriority = [
    {
      stars: 4,
      title: isKorean ? '4성 먼저 달성' : 'Đạt 4 sao trước',
      description: isKorean
        ? '4성에서 4번째 스킬 해금! 4→5성보다 3→4성이 훨씬 중요합니다.'
        : 'Mở skill thứ 4 ở 4 sao! 3→4 sao quan trọng hơn nhiều so với 4→5 sao.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      stars: 5,
      title: isKorean ? '5성은 메인 영웅만' : '5 sao chỉ cho anh hùng chính',
      description: isKorean
        ? '4→5성은 효율이 낮습니다. 메인 5명에게만 투자하세요.'
        : '4→5 sao hiệu quả thấp. Chỉ đầu tư cho 5 anh hùng chính.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
  ];

  const upgradeOrder = [
    {
      tier: 'S+',
      name: isKorean ? '유찬/리시아 (블러디 로즈)' : 'Yu Chan/Licia (Blood Rose)',
      priority: 1,
      reason: isKorean ? '돌격 진형 핵심 딜러, 최고 DPS' : 'Dealer chính đội hình Assaulter, DPS cao nhất',
    },
    {
      tier: 'S+',
      name: isKorean ? '퀴니/릴리아나 (새벽의 날개)' : 'Queenie/Liliana (Cánh Bình Minh)',
      priority: 2,
      reason: isKorean ? '슈터 진형 핵심 딜러, F2P 메타 카운터' : 'Dealer chính đội hình Shooter, counter meta F2P',
    },
    {
      tier: 'S+',
      name: isKorean ? '앰버/도데메키 (질서의 수호자)' : 'Amber/Dodemeki (Người Bảo Vệ Trật Tự)',
      priority: 3,
      reason: isKorean ? '라이더 진형 핵심, 높은 생존력' : 'Chính đội hình Rider, sinh tồn cao',
    },
    {
      tier: 'S',
      name: isKorean ? 'S티어 영웅들 4성 먼저' : 'S-tier 4 sao trước',
      priority: 4,
      reason: isKorean ? '알마, 닉스, 벨라, 셀레나 등 - 4번째 스킬 해금이 핵심' : 'Alma, Nyx, Bella, Selena... - Mở skill thứ 4 là quan trọng nhất',
    },
  ];

  const fragmentSources = [
    { name: isKorean ? '일일 임무' : 'Nhiệm vụ hàng ngày', type: isKorean ? '모든 등급' : 'Mọi cấp' },
    { name: 'Full Preparedness', type: isKorean ? '오렌지/보라/블루' : 'Cam/Tím/Xanh' },
    { name: isKorean ? '부머 이벤트' : 'Sự kiện Boomer', type: isKorean ? '오렌지' : 'Cam' },
    { name: isKorean ? '트럭 미션' : 'Nhiệm vụ Truck', type: isKorean ? '조각' : 'Mảnh' },
    { name: 'VS Event / SvS', type: isKorean ? '대량' : 'Số lượng lớn' },
    { name: 'Canyon / Capital Clash', type: isKorean ? '대량' : 'Số lượng lớn' },
  ];

  const equipmentTips = [
    {
      icon: Swords,
      title: isKorean ? '공격형 영웅' : 'Anh hùng tấn công',
      tip: isKorean ? '최고 무기 장비 장착 → 공격력 보너스' : 'Trang bị vũ khí tốt nhất → bonus tấn công',
      color: 'text-red-400',
    },
    {
      icon: Shield,
      title: isKorean ? '방어형 영웅' : 'Anh hùng phòng thủ',
      tip: isKorean ? '최고 방어구/부츠 장착 → 방어력 보너스' : 'Trang bị giáp/boots tốt nhất → bonus phòng thủ',
      color: 'text-blue-400',
    },
  ];

  const tips = [
    isKorean
      ? '장비는 승급 전에 레벨 최대로 - 승급 후 레벨업 비용 증가'
      : 'Max level trang bị trước khi thăng cấp - chi phí level tăng sau thăng',
    isKorean
      ? '영웅 스킬과 병종 매칭 - 슈터 버프 영웅은 슈터 병종과 조합'
      : 'Kết hợp skill anh hùng với loại quân - skill buff Shooter thì dùng Shooter',
    isKorean
      ? '본부(HQ) 레벨이 영웅 최대 레벨 결정 - 본부(HQ) 업그레이드 필수'
      : 'HQ quyết định max level anh hùng - bắt buộc nâng HQ',
    isKorean
      ? '조각은 이벤트에서 대량 획득 가능 - Full Preparedness 필참'
      : 'Mảnh có thể lấy nhiều từ sự kiện - tham gia Full Preparedness',
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
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Star className="h-8 w-8 text-highlight" />
            {isKorean ? '영웅 육성 가이드' : 'Hướng dẫn nuôi Anh hùng'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '영웅 성급 올리기, 스킬 우선순위, 장비 팁을 알아봅니다.'
              : 'Tìm hiểu cách lên sao, ưu tiên skill, mẹo trang bị.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '모든 메인 영웅 4성 먼저 (4번째 스킬 해금)' : 'Tất cả anh hùng chính 4 sao trước (mở skill thứ 4)'}</li>
              <li>• {isKorean ? '5성은 메인 5명에게만 투자' : '5 sao chỉ đầu tư cho 5 anh hùng chính'}</li>
              <li>• {isKorean ? '장비 승급 전 레벨 최대로' : 'Max level trang bị trước khi thăng cấp'}</li>
              <li>• {isKorean ? '영웅 스킬과 병종 타입 매칭 필수' : 'Bắt buộc kết hợp skill anh hùng với loại quân'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Star Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            {isKorean ? '성급 업그레이드 우선순위' : 'Ưu tiên nâng sao'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {starPriority.map((item) => (
              <Card key={item.stars} className={`${item.bg} border-none`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${item.color} fill-current`} />
                    ))}
                  </div>
                  <h3 className={`font-semibold ${item.color} mb-1`}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="info-important flex gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '4성에서 4번째 스킬이 해금됩니다. 이것이 가장 큰 파워 스파이크입니다!'
                : 'Skill thứ 4 mở ở 4 sao. Đây là power spike lớn nhất!'}
            </p>
          </div>
        </section>

        {/* Upgrade Order */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '영웅 업그레이드 순서' : 'Thứ tự nâng cấp anh hùng'}
          </h2>
          <div className="space-y-3">
            {upgradeOrder.map((hero) => (
              <Card key={hero.priority} className={hero.tier === 'S' ? 'border-highlight/30 bg-highlight/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold">
                      {hero.priority}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={hero.tier === 'S' ? 'text-yellow-400 border-yellow-400/30' : 'text-blue-400 border-blue-400/30'}>
                          {hero.tier}-Tier
                        </Badge>
                        <span className="font-semibold">{hero.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{hero.reason}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fragment Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '조각 획득처' : 'Nguồn mảnh'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fragmentSources.map((source, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">{source.name}</span>
                  <Badge variant="outline" className="text-xs">{source.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Equipment Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '장비 팁' : 'Mẹo trang bị'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {equipmentTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4 flex gap-3">
                    <Icon className={`h-6 w-6 ${tip.color} shrink-0`} />
                    <div>
                      <p className={`font-semibold ${tip.color}`}>{tip.title}</p>
                      <p className="text-sm text-muted-foreground">{tip.tip}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Troop Matching */}
        <Card className="border-tip/30">
          <CardHeader>
            <CardTitle className="text-tip flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isKorean ? '영웅-병종 매칭의 중요성' : 'Tầm quan trọng của kết hợp Anh hùng-Quân'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '각 진영 영웅의 3, 4번째 스킬은 특정 병종에 버프를 줍니다. 잘못된 병종 조합은 시너지를 낭비합니다.'
                : 'Skill 3, 4 của mỗi anh hùng phe buff loại quân cụ thể. Kết hợp sai loại quân lãng phí synergy.'}
            </p>
            <div className="grid gap-2 sm:grid-cols-2 text-sm">
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="font-medium text-red-400">{isKorean ? '블러디 로즈' : 'Blood Rose'}</p>
                <p className="text-muted-foreground">{isKorean ? '→ 돌격과 조합' : '→ Kết hợp với Assaulter'}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="font-medium text-blue-400">{isKorean ? '새벽의 날개' : 'Cánh Bình Minh'}</p>
                <p className="text-muted-foreground">{isKorean ? '→ 슈터와 조합' : '→ Kết hợp với Shooter'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '육성 팁' : 'Mẹo nuôi'}
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
