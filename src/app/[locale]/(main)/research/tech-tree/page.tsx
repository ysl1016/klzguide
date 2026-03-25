import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, GitBranch, Users, Swords, Shield, Target, Zap, ArrowRight } from 'lucide-react';

export default async function TechTreePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechTreeContent locale={locale} />;
}

function TechTreeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const techTrees = [
    {
      name: l('엘리트부대', 'Elite Troops', 'Elite Troops'),
      icon: Users,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      description: l(
        '병력 기본 스탯 강화. 모든 연구의 기초가 되는 트리',
        'Tăng stat cơ bản quân. Cây nền tảng cho mọi NC',
        'Boosts base troop stats. Foundation tree for all research'
      ),
      unlocks: l('100% 완료 시 군사이론 해금', '100% mở Military Strategies', '100% completion unlocks Military Strategies'),
      priority: l('필수', 'Bắt buộc', 'Essential'),
      priorityColor: 'text-green-400',
    },
    {
      name: l('영웅훈련', 'Hero Training', 'Hero Training'),
      icon: Zap,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      description: l(
        '영웅 스킬 및 스탯 강화. 조종석까지만 진행 권장',
        'Tăng kỹ năng và stat anh hùng. Chỉ nên làm tới Cockpit',
        'Enhances hero skills and stats. Only recommended up to Cockpit'
      ),
      unlocks: l('초반 해금됨', 'Mở sẵn từ đầu', 'Available from start'),
      priority: l('조종석까지만', 'Chỉ tới Cockpit', 'Cockpit only'),
      priorityColor: 'text-yellow-400',
    },
    {
      name: l('피난소건설', 'Shelter', 'Shelter'),
      icon: Shield,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      description: l(
        '방어 및 자원 보호. 전쟁수호 해금 조건 중 하나',
        'Phòng thủ và bảo vệ tài nguyên. Điều kiện mở Peace Shield',
        'Defense and resource protection. One of the unlock requirements for Peace Shield'
      ),
      unlocks: l('50% 완료 시 전쟁수호 해금 조건', '50% là điều kiện mở Peace Shield', '50% is a requirement to unlock Peace Shield'),
      priority: l('50%까지', 'Tới 50%', 'Up to 50%'),
      priorityColor: 'text-blue-400',
    },
    {
      name: l('군사이론', 'Military Strategies', 'Military Strategies'),
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      description: l(
        '병력 HP 및 전투 버프. HP 연구에 집중',
        'HP quân và buff chiến đấu. Tập trung NC HP',
        'Troop HP and combat buffs. Focus on HP research'
      ),
      unlocks: l('엘리트부대 100% 필요', 'Cần Elite Troops 100%', 'Requires Elite Troops 100%'),
      priority: l('HP 집중', 'Tập trung HP', 'Focus HP'),
      priorityColor: 'text-red-400',
    },
    {
      name: l('전쟁수호', 'Peace Shield', 'Peace Shield'),
      icon: Shield,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      description: l(
        '긴급구조 (-20% 손실) 포함. 방어 플레이어 필수',
        'Gồm Urgent Rescue (-20% mất). Bắt buộc cho phòng thủ',
        'Includes Urgent Rescue (-20% losses). Essential for defensive players'
      ),
      unlocks: l('피난소건설 50% + 군사이론 45% 필요', 'Cần Shelter 50% + Military 45%', 'Requires Shelter 50% + Military Strategies 45%'),
      priority: l('방어 필수', 'Bắt buộc phòng thủ', 'Defense essential'),
      priorityColor: 'text-cyan-400',
    },
    {
      name: l('도시함락', 'Siege to Seize', 'Siege to Seize'),
      icon: Target,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      description: l(
        '공격 보너스 제공. 공격 성향 플레이어용',
        'Bonus tấn công. Cho người chơi thiên về tấn công',
        'Provides attack bonuses. For offensive players'
      ),
      unlocks: l('군사이론 40% 필요', 'Cần Military Strategies 40%', 'Requires Military Strategies 40%'),
      priority: l('공격형만', 'Chỉ tấn công', 'Offense only'),
      priorityColor: 'text-orange-400',
    },
    {
      name: l('야전연구', 'Field Research', 'Field Research'),
      icon: GitBranch,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      description: l(
        'Recharge Shield 등 고급 연구. 엔드게임 콘텐츠',
        'NC cao cấp như Recharge Shield. Nội dung endgame',
        'Advanced research including Recharge Shield. Endgame content'
      ),
      unlocks: l('도시함락 100% 필요', 'Cần Siege to Seize 100%', 'Requires Siege to Seize 100%'),
      priority: l('후순위', 'Sau cùng', 'Low priority'),
      priorityColor: 'text-purple-400',
    },
  ];

  const unlockFlow = [
    { from: l('엘리트부대', 'Elite Troops', 'Elite Troops'), to: l('군사이론', 'Military Strategies', 'Military Strategies'), condition: '100%' },
    { from: l('피난소건설 + 군사이론', 'Shelter + Military', 'Shelter + Military Strategies'), to: l('전쟁수호', 'Peace Shield', 'Peace Shield'), condition: '50% + 45%' },
    { from: l('군사이론', 'Military Strategies', 'Military Strategies'), to: l('도시함락', 'Siege to Seize', 'Siege to Seize'), condition: '40%' },
    { from: l('도시함락', 'Siege to Seize', 'Siege to Seize'), to: l('야전연구', 'Field Research', 'Field Research'), condition: '100%' },
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
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <GitBranch className="h-8 w-8 text-highlight" />
            {l('기술 트리 개요', 'Tổng quan cây công nghệ', 'Tech Tree Overview')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '연구 기술 트리의 구조와 해금 조건을 이해합니다.',
              'Hiểu cấu trúc cây NC và điều kiện mở khóa.',
              'Understand the structure and unlock requirements of the research tech tree.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Takeaways')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('엘리트부대 100% → 군사이론 해금', 'Elite Troops 100% → mở Military Strategies', 'Elite Troops 100% → unlocks Military Strategies')}</li>
              <li>• {l('영웅훈련은 조종석에서 멈춤', 'Hero Training dừng ở Cockpit', 'Stop Hero Training at Cockpit')}</li>
              <li>• {l('군사이론에서 HP 연구 집중', 'Tập trung NC HP trong Military Strategies', 'Focus on HP research in Military Strategies')}</li>
              <li>• {l('전쟁수호의 긴급구조로 손실 -20%', 'Urgent Rescue trong Peace Shield giảm 20% mất quân', 'Urgent Rescue in Peace Shield reduces losses by 20%')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Unlock Flow Diagram */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('해금 흐름도', 'Sơ đồ mở khóa', 'Unlock Flow')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {unlockFlow.map((flow, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="px-3 py-1.5 rounded bg-muted font-medium min-w-[140px]">
                      {flow.from}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="text-highlight font-semibold">{flow.condition}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div className="px-3 py-1.5 rounded bg-highlight/10 text-highlight font-medium">
                      {flow.to}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tech Trees */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('기술 트리 상세', 'Chi tiết cây công nghệ', 'Tech Tree Details')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {techTrees.map((tree) => {
              const Icon = tree.icon;
              return (
                <Card key={tree.name} className={`${tree.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center gap-2 ${tree.color}`}>
                      <Icon className="h-5 w-5" />
                      {tree.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{tree.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{tree.unlocks}</span>
                      <Badge variant="outline" className={tree.priorityColor}>
                        {tree.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recommended Path */}
        <Card className="border-tip/30">
          <CardHeader>
            <CardTitle className="text-tip">
              {l('권장 연구 경로', 'Đường NC khuyến nghị', 'Recommended Research Path')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">1</span>
                <span className="text-muted-foreground">
                  {l(
                    '연맹표창 완료 (최우선)',
                    'Hoàn thành Alliance Recognition (ưu tiên nhất)',
                    'Complete Alliance Recognition (top priority)'
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">2</span>
                <span className="text-muted-foreground">
                  {l(
                    '엘리트부대 100% (군사이론 해금)',
                    'Elite Troops 100% (mở Military Strategies)',
                    'Elite Troops 100% (unlocks Military Strategies)'
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">3</span>
                <span className="text-muted-foreground">
                  {l(
                    '영웅훈련 → 조종석까지',
                    'Hero Training → tới Cockpit',
                    'Hero Training → up to Cockpit'
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">4</span>
                <span className="text-muted-foreground">
                  {l(
                    '군사이론 HP 연구 집중',
                    'Tập trung NC HP trong Military Strategies',
                    'Focus on HP research in Military Strategies'
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">5</span>
                <span className="text-muted-foreground">
                  {l(
                    '피난소건설 50% + 군사이론 45% → 전쟁수호',
                    'Shelter 50% + Military 45% → Peace Shield',
                    'Shelter 50% + Military Strategies 45% → Peace Shield'
                  )}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">6</span>
                <span className="text-muted-foreground">
                  {l(
                    '(공격 성향) 도시함락 → 야전연구',
                    '(Tấn công) Siege to Seize → Field Research',
                    '(Offensive) Siege to Seize → Field Research'
                  )}
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
