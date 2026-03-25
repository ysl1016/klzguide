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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const starPriority = [
    {
      stars: 4,
      title: l('4성 먼저 달성', 'Đạt 4 sao trước', 'Reach 4-Star First'),
      description: l(
        '4성에서 4번째 스킬 해금! 4→5성보다 3→4성이 훨씬 중요합니다.',
        'Mở skill thứ 4 ở 4 sao! 3→4 sao quan trọng hơn nhiều so với 4→5 sao.',
        'Unlocks the 4th skill at 4-star! Going 3→4 star is far more important than 4→5 star.'
      ),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      stars: 5,
      title: l('5성은 메인 영웅만', '5 sao chỉ cho anh hùng chính', '5-Star for Main Heroes Only'),
      description: l(
        '4→5성은 효율이 낮습니다. 메인 5명에게만 투자하세요.',
        '4→5 sao hiệu quả thấp. Chỉ đầu tư cho 5 anh hùng chính.',
        '4→5 star is low efficiency. Only invest in your main 5 heroes.'
      ),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
  ];

  const upgradeOrder = [
    {
      tier: 'S+',
      name: l('유찬/리시아 (블러디 로즈)', 'Yu Chan/Licia (Blood Rose)', 'Yu Chan/Licia (Blood Rose)'),
      priority: 1,
      reason: l('돌격 진형 핵심 딜러, 최고 DPS', 'Dealer chính đội hình Assaulter, DPS cao nhất', 'Core Assaulter formation dealer, highest DPS'),
    },
    {
      tier: 'S+',
      name: l('퀴니/릴리아나 (새벽의 날개)', 'Queenie/Liliana (Cánh Bình Minh)', 'Queenie/Liliana (Wings of Dawn)'),
      priority: 2,
      reason: l('슈터 진형 핵심 딜러, F2P 메타 카운터', 'Dealer chính đội hình Shooter, counter meta F2P', 'Core Shooter formation dealer, F2P meta counter'),
    },
    {
      tier: 'S+',
      name: l('앰버/도데메키 (질서의 수호자)', 'Amber/Dodemeki (Người Bảo Vệ Trật Tự)', 'Amber/Dodemeki (Guard of Order)'),
      priority: 3,
      reason: l('라이더 진형 핵심, 높은 생존력', 'Chính đội hình Rider, sinh tồn cao', 'Core Rider formation, high survivability'),
    },
    {
      tier: 'S',
      name: l('S티어 영웅들 4성 먼저', 'S-tier 4 sao trước', 'S-Tier Heroes to 4-Star First'),
      priority: 4,
      reason: l('알마, 니콜스, 벨라, 셀레나 등 - 4번째 스킬 해금이 핵심', 'Alma, Nyx, Bella, Selena... - Mở skill thứ 4 là quan trọng nhất', 'Alma, Nyx, Bella, Selena, etc. - Unlocking the 4th skill is key'),
    },
  ];

  const fragmentSources = [
    { name: l('일일 임무', 'Nhiệm vụ hàng ngày', 'Daily Missions'), type: l('모든 등급', 'Mọi cấp', 'All grades') },
    { name: 'Full Preparedness', type: l('주황/보라/블루', 'Cam/Tím/Xanh', 'Orange/Purple/Blue') },
    { name: l('부머 이벤트', 'Sự kiện Boomer', 'Boomer Event'), type: l('주황', 'Cam', 'Orange') },
    { name: l('트럭 미션', 'Nhiệm vụ Truck', 'Truck Mission'), type: l('조각', 'Mảnh', 'Fragments') },
    { name: 'VS Event / SvS', type: l('대량', 'Số lượng lớn', 'Large amount') },
    { name: 'Canyon / Capital Clash', type: l('대량', 'Số lượng lớn', 'Large amount') },
  ];

  const equipmentTips = [
    {
      icon: Swords,
      title: l('공격형 영웅', 'Anh hùng tấn công', 'Offensive Heroes'),
      tip: l('최고 무기 장비 장착 → 공격력 보너스', 'Trang bị vũ khí tốt nhất → bonus tấn công', 'Equip best weapon gear → ATK bonus'),
      color: 'text-red-400',
    },
    {
      icon: Shield,
      title: l('방어형 영웅', 'Anh hùng phòng thủ', 'Defensive Heroes'),
      tip: l('최고 방어구/부츠 장착 → 방어력 보너스', 'Trang bị giáp/boots tốt nhất → bonus phòng thủ', 'Equip best armor/boots → DEF bonus'),
      color: 'text-blue-400',
    },
  ];

  const tips = [
    l(
      '장비는 승급 전에 레벨 최대로 - 승급 후 레벨업 비용 증가',
      'Max level trang bị trước khi thăng cấp - chi phí level tăng sau thăng',
      'Max gear level before promoting - upgrade costs increase after promotion'
    ),
    l(
      '영웅 스킬과 병종 매칭 - 슈터 버프 영웅은 슈터 병종과 조합',
      'Kết hợp skill anh hùng với loại quân - skill buff Shooter thì dùng Shooter',
      'Match hero skills with troop type - Shooter buff heroes pair with Shooter troops'
    ),
    l(
      '본부(HQ) 레벨이 영웅 최대 레벨 결정 - 본부(HQ) 업그레이드 필수',
      'HQ quyết định max level anh hùng - bắt buộc nâng HQ',
      'HQ level determines hero max level - HQ upgrade is essential'
    ),
    l(
      '조각은 이벤트에서 대량 획득 가능 - Full Preparedness 필참',
      'Mảnh có thể lấy nhiều từ sự kiện - tham gia Full Preparedness',
      'Fragments can be farmed in bulk from events - Full Preparedness is a must'
    ),
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
            {l('영웅 육성 가이드', 'Hướng dẫn nuôi Anh hùng', 'Hero Leveling Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '영웅 성급 올리기, 스킬 우선순위, 장비 팁을 알아봅니다.',
              'Tìm hiểu cách lên sao, ưu tiên skill, mẹo trang bị.',
              'Learn about star upgrades, skill priorities, and equipment tips.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('모든 메인 영웅 4성 먼저 (4번째 스킬 해금)', 'Tất cả anh hùng chính 4 sao trước (mở skill thứ 4)', 'Get all main heroes to 4-star first (unlocks 4th skill)')}</li>
              <li>• {l('5성은 메인 5명에게만 투자', '5 sao chỉ đầu tư cho 5 anh hùng chính', 'Only invest in 5-star for your main 5 heroes')}</li>
              <li>• {l('장비 승급 전 레벨 최대로', 'Max level trang bị trước khi thăng cấp', 'Max gear level before promoting')}</li>
              <li>• {l('영웅 스킬과 병종 타입 매칭 필수', 'Bắt buộc kết hợp skill anh hùng với loại quân', 'Matching hero skills with troop type is essential')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Star Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            {l('성급 업그레이드 우선순위', 'Ưu tiên nâng sao', 'Star Upgrade Priority')}
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
              {l(
                '4성에서 4번째 스킬이 해금됩니다. 이것이 가장 큰 파워 스파이크입니다!',
                'Skill thứ 4 mở ở 4 sao. Đây là power spike lớn nhất!',
                'The 4th skill unlocks at 4-star. This is the biggest power spike!'
              )}
            </p>
          </div>
        </section>

        {/* Upgrade Order */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('영웅 업그레이드 순서', 'Thứ tự nâng cấp anh hùng', 'Hero Upgrade Order')}
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
            {l('조각 획득처', 'Nguồn mảnh', 'Fragment Sources')}
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
            {l('장비 팁', 'Mẹo trang bị', 'Equipment Tips')}
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
              {l('영웅-병종 매칭의 중요성', 'Tầm quan trọng của kết hợp Anh hùng-Quân', 'Importance of Hero-Troop Matching')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {l(
                '각 진영 영웅의 3, 4번째 스킬은 특정 병종에 버프를 줍니다. 잘못된 병종 조합은 시너지를 낭비합니다.',
                'Skill 3, 4 của mỗi anh hùng phe buff loại quân cụ thể. Kết hợp sai loại quân lãng phí synergy.',
                'Each faction hero\'s 3rd and 4th skills buff specific troop types. Wrong troop combinations waste synergy.'
              )}
            </p>
            <div className="grid gap-2 sm:grid-cols-2 text-sm">
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="font-medium text-red-400">{l('블러디 로즈', 'Blood Rose', 'Blood Rose')}</p>
                <p className="text-muted-foreground">{l('→ 돌격과 조합', '→ Kết hợp với Assaulter', '→ Pair with Assaulter')}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="font-medium text-blue-400">{l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn')}</p>
                <p className="text-muted-foreground">{l('→ 슈터와 조합', '→ Kết hợp với Shooter', '→ Pair with Shooter')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('육성 팁', 'Mẹo nuôi', 'Leveling Tips')}
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
