import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, Swords, Zap, Target, Lightbulb } from 'lucide-react';

export default async function GearSetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GearSetsContent locale={locale} />;
}

function GearSetsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const statPriorities = {
    dps: {
      title: l('DPS 영웅', 'Anh hùng DPS', 'DPS Heroes'),
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      stats: [
        { name: l('공격력 %', 'ATK %', 'ATK %'), priority: 1 },
        { name: l('데미지 %', 'Damage %', 'Damage %'), priority: 2 },
        { name: l('병력 HP', 'HP quân', 'Troop HP'), priority: 3 },
      ],
      gear: l('총 → 헬멧 우선', 'Súng → Mũ ưu tiên', 'Gun → Helmet priority'),
    },
    tank: {
      title: l('탱커 영웅', 'Anh hùng Tank', 'Tank Heroes'),
      icon: Shield,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      stats: [
        { name: l('HP %', 'HP %', 'HP %'), priority: 1 },
        { name: l('방어력 %', 'DEF %', 'DEF %'), priority: 2 },
        { name: l('데미지 저항', 'Kháng damage', 'Damage Resistance'), priority: 3 },
      ],
      gear: l('중장갑 → 부츠 우선', 'Giáp → Giày ưu tiên', 'Heavy Armor → Boots priority'),
    },
  };

  const gearSources = [
    {
      source: l('공훈상점 (Merit Shop)', 'Merit Shop', 'Merit Shop'),
      type: l('주황 장비', 'Trang bị cam', 'Orange Gear'),
      frequency: l('매주', 'Hàng tuần', 'Weekly'),
      priority: l('필수', 'Bắt buộc', 'Essential'),
      color: 'text-green-400',
    },
    {
      source: l('공훈상점 (용사훈장)', 'Black Market (Valor Medals)', 'Black Market (Valor Medals)'),
      type: l('주황 장비', 'Trang bị cam', 'Orange Gear'),
      frequency: l('SVS 후', 'Sau SVS', 'After SVS'),
      priority: l('높음', 'Cao', 'High'),
      color: 'text-yellow-400',
    },
    {
      source: l('난폭 두목 (Furylord)', 'Furylord', 'Furylord'),
      type: l('보라 장비', 'Trang bị tím', 'Purple Gear'),
      frequency: l('4회/일', '4 lần/ngày', '4x/day'),
      priority: l('보통', 'Trung bình', 'Medium'),
      color: 'text-purple-400',
    },
    {
      source: l('주황 장비 선택 상자', 'Orange Equipment Choice Box', 'Orange Equipment Choice Box'),
      type: l('주황 장비', 'Trang bị cam', 'Orange Gear'),
      frequency: l('이벤트', 'Sự kiện', 'Events'),
      priority: l('높음', 'Cao', 'High'),
      color: 'text-orange-400',
    },
  ];

  const setBonus = [
    {
      pieces: 2,
      bonus: l('소형 세트 보너스', 'Bonus set nhỏ', 'Minor Set Bonus'),
      description: l('같은 세트 2개 장착 시 추가 스탯', 'Stat thêm khi đeo 2 cái cùng set', 'Extra stats when equipping 2 pieces from the same set'),
    },
    {
      pieces: 4,
      bonus: l('완전 세트 보너스', 'Bonus set đầy đủ', 'Full Set Bonus'),
      description: l('같은 세트 4개 장착 시 최대 보너스', 'Bonus tối đa khi đeo 4 cái cùng set', 'Maximum bonus when equipping 4 pieces from the same set'),
    },
  ];

  const tips = [
    l(
      '세트 효과보다 개별 스탯이 더 중요할 수 있음 - 좋은 스탯의 비세트 장비가 나쁜 스탯의 세트 장비보다 나을 수 있음',
      'Stat riêng có thể quan trọng hơn bonus set - trang bị không set stat tốt có thể hơn trang bị set stat xấu',
      'Individual stats can matter more than set bonuses - non-set gear with good stats can outperform set gear with bad stats'
    ),
    l(
      'DPS 영웅에게는 총을 최우선으로 업그레이드 - 가장 큰 파워 스파이크',
      'Nâng súng ưu tiên nhất cho DPS - power spike lớn nhất',
      'Upgrade guns first for DPS heroes - biggest power spike'
    ),
    l(
      '공훈상점 주황 장비는 절대 놓치지 마세요',
      'Đừng bao giờ bỏ lỡ trang bị cam từ Merit Shop',
      'Never miss orange gear from the Merit Shop'
    ),
    l(
      '보라 장비 상자보다 주황 장비 선택 상자가 훨씬 효율적',
      'Orange Equipment Choice Box hiệu quả hơn nhiều so với hộp tím',
      'Orange Equipment Choice Boxes are much more efficient than purple gear boxes'
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Target className="h-8 w-8 text-highlight" />
            {l('장비 세트 & 스탯 가이드', 'Hướng dẫn Set & Stat trang bị', 'Gear Sets & Stats Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '장비 세트 효과와 스탯 우선순위를 알아봅니다.',
              'Tìm hiểu bonus set và ưu tiên stat trang bị.',
              'Learn about gear set effects and stat priorities.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('DPS: 공격% → 데미지% → 병력HP (총, 헬멧 우선)', 'DPS: ATK% → Damage% → HP quân (Súng, Mũ ưu tiên)', 'DPS: ATK% → Damage% → Troop HP (Gun, Helmet priority)')}</li>
              <li>• {l('탱커: HP% → 방어% → 저항 (중장갑, 부츠 우선)', 'Tank: HP% → DEF% → Kháng (Giáp, Giày ưu tiên)', 'Tank: HP% → DEF% → Resistance (Heavy Armor, Boots priority)')}</li>
              <li>• {l('공훈상점 주황 장비 매주 필수 구매', 'Mua trang bị cam Merit Shop hàng tuần bắt buộc', 'Buy orange gear from Merit Shop weekly - mandatory')}</li>
              <li>• {l('개별 스탯이 세트 효과보다 중요할 수 있음', 'Stat riêng có thể quan trọng hơn bonus set', 'Individual stats can be more important than set bonuses')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Stat Priorities by Role */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('역할별 스탯 우선순위', 'Ưu tiên stat theo vai trò', 'Stat Priorities by Role')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.values(statPriorities).map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.title} className={role.bg}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center gap-2 ${role.color}`}>
                      <Icon className="h-5 w-5" />
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {role.stats.map((stat) => (
                        <div key={stat.name} className="flex items-center gap-2">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${role.bg} ${role.color}`}>
                            {stat.priority}
                          </span>
                          <span className="text-sm text-muted-foreground">{stat.name}</span>
                        </div>
                      ))}
                    </div>
                    <Badge variant="outline" className={role.color}>
                      {role.gear}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Set Bonuses */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('세트 보너스', 'Bonus Set', 'Set Bonuses')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {setBonus.map((bonus) => (
              <Card key={bonus.pieces}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(bonus.pieces)].map((_, i) => (
                      <Shield key={i} className="h-5 w-5 text-highlight" />
                    ))}
                  </div>
                  <p className="font-semibold">{bonus.bonus}</p>
                  <p className="text-sm text-muted-foreground mt-1">{bonus.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Gear Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('장비 획득처', 'Nguồn trang bị', 'Gear Sources')}
          </h2>
          <div className="space-y-3">
            {gearSources.map((source) => (
              <Card key={source.source}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${source.color}`}>{source.source}</p>
                    <p className="text-sm text-muted-foreground">{source.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={source.color}>{source.priority}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{source.frequency}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
