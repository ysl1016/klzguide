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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const researchTrees = [
    {
      name: l('영웅훈련 (Hero Training)', 'Hero Training', 'Hero Training'),
      icon: Users,
      priority: 1,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      description: l(
        '조종석까지만 진행. 이후는 배지 대비 효율이 극히 낮음 (배지 함정)',
        'Chỉ làm tới Cockpit. Sau đó hiệu quả badge cực thấp (bẫy badge)',
        'Only progress to Cockpit. After that, Badge efficiency is extremely low (Badge trap)'
      ),
      tip: l('※ 최대 레벨까지 하면 400 ATK/DEF 증가에 엄청난 배지 소모', '※ Max level chỉ tăng 400 ATK/DEF với chi phí badge khổng lồ', '※ Maxing out only gives 400 ATK/DEF for an enormous Badge cost'),
    },
    {
      name: l('군사이론 (Military Strategies)', 'Military Strategies', 'Military Strategies'),
      icon: Swords,
      priority: 2,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      description: l(
        '병력 HP 버프에 집중. 엘리트부대 100% 완료 후 해금',
        'Tập trung buff HP quân. Mở sau khi hoàn thành 100% Elite Troops',
        'Focus on troop HP buffs. Unlocks after completing Elite Troops 100%'
      ),
      tip: l('※ HP 연구는 생존력 + 전투력 동시 상승', '※ NC HP tăng cả sinh tồn + sức mạnh', '※ HP research boosts both survivability and combat power'),
    },
    {
      name: l('전쟁수호 (Peace Shield)', 'Peace Shield', 'Peace Shield'),
      icon: Shield,
      priority: 3,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      description: l(
        '긴급 구조 해금 (-20% 병력 손실). 피난소건설 50% + 군사이론 45% 필요',
        'Mở Urgent Rescue (-20% mất quân). Cần Shelter 50% + Military 45%',
        'Unlocks Urgent Rescue (-20% troop loss). Requires Shelter 50% + Military Strategies 45%'
      ),
      tip: l('※ 긴급 구조: 10랭크, 방어 플레이어 필수', '※ Urgent Rescue: 10 rank, bắt buộc cho phòng thủ', '※ Urgent Rescue: 10 ranks, essential for defensive players'),
    },
    {
      name: l('도시함락 (Siege to Seize)', 'Siege to Seize', 'Siege to Seize'),
      icon: Target,
      priority: 4,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      description: l(
        '공격 보너스 제공. 군사이론 40% 필요. 방어 선호 시 스킵 가능',
        'Bonus tấn công. Cần Military Strategies 40%. Có thể bỏ qua nếu thích phòng thủ',
        'Provides attack bonuses. Requires Military Strategies 40%. Can skip if you prefer defense'
      ),
      tip: l('※ 100% 완료 시 야전연구 해금', '※ 100% hoàn thành mở Field Research', '※ 100% completion unlocks Field Research'),
    },
  ];

  const skipList = [
    {
      name: l('영웅훈련 최대 레벨', 'Hero Training max level', 'Hero Training max level'),
      reason: l('비용 대비 효과 극히 낮음', 'Hiệu quả so với chi phí cực thấp', 'Extremely low returns for the cost'),
    },
    {
      name: l('Move Out (레벨 10-20 이상)', 'Move Out (trên level 10-20)', 'Move Out (above level 10-20)'),
      reason: l('이동 속도 증가 미미', 'Tăng tốc độ di chuyển không đáng kể', 'March speed increase is negligible'),
    },
    {
      name: l('Fully Armed Alliance (초반)', 'Fully Armed Alliance (đầu game)', 'Fully Armed Alliance (early game)'),
      reason: l('나중에 필요할 때 진행', 'Làm sau khi cần', 'Do it later when needed'),
    },
    {
      name: l('도시함락 (방어 선호 시)', 'Siege to Seize (nếu thích phòng thủ)', 'Siege to Seize (if you prefer defense)'),
      reason: l('공격 성향이 아니면 스킵', 'Bỏ qua nếu không thiên về tấn công', 'Skip if you are not an offensive player'),
    },
  ];

  const badgeCosts = [
    { name: l('긴급구조', 'Urgent Rescue', 'Urgent Rescue'), badges: '~50K', note: l('10랭크', '10 rank', '10 ranks') },
    { name: 'T10 Units (UST)', badges: '~1.4M', note: l('F2P 수년 소요', 'F2P mất nhiều năm', 'Takes years for F2P') },
    { name: l('에너지 실드', 'Recharge Shield', 'Recharge Shield'), badges: '594K', note: l('야전연구 (총 경찰휘장 594,430개)', 'Field Research (tổng 594,430 badge)', 'Field Research (594,430 Badges total)') },
  ];

  const tips = [
    l(
      '두 번째 연구소 구매 필수 - 연구 속도 2배',
      'Bắt buộc mua Lab thứ 2 - gấp đôi tốc độ NC',
      'Buying the 2nd Research Lab is essential - doubles research speed'
    ),
    l(
      '수도 버프와 동기화 - 연구 시간 1시간 감소',
      'Đồng bộ với buff thủ đô - giảm 1 giờ NC',
      'Sync with capital buff - reduces research time by 1 hour'
    ),
    l(
      '별과 가속 아이템은 연구 이벤트에 저장',
      'Lưu sao và tăng tốc cho sự kiện NC',
      'Save stars and speedups for research events'
    ),
    l(
      '연맹 대결 "과학의 시대" 테마 날에 연구 가속 사용',
      'Dùng tăng tốc NC vào ngày theme "Age of Science" của Alliance Duel',
      'Use research speedups on Alliance Duel "Age of Science" theme days'
    ),
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
            {l('연구 우선순위 가이드', 'Hướng dẫn ưu tiên Nghiên cứu', 'Research Priority Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '어떤 연구를 먼저 해야 하는지, 어떤 것을 스킵해야 하는지 알아봅니다.',
              'Tìm hiểu nên NC gì trước, nên bỏ qua gì.',
              'Learn which research to prioritize and which to skip.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Takeaways')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('연맹표창(AR) 최우선 - 일일 보상 2배', 'Alliance Recognition ưu tiên nhất - gấp đôi phần thưởng', 'Alliance Recognition first - doubles daily rewards')}</li>
              <li>• {l('영웅훈련은 조종석까지만 (배지 함정 주의)', 'Hero Training chỉ tới Cockpit (cẩn thận bẫy badge)', 'Hero Training only to Cockpit (beware the Badge trap)')}</li>
              <li>• {l('HP 연구 집중 - 생존력 + 전투력 동시 증가', 'Tập trung NC HP - tăng sinh tồn + sức mạnh', 'Focus on HP research - boosts both survivability and combat power')}</li>
              <li>• {l('두 번째 연구소 구매로 속도 2배', 'Mua Lab thứ 2 để gấp đôi tốc độ', 'Buy 2nd Research Lab to double speed')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Alliance Recognition Priority */}
        <Card className="border-highlight/50 bg-highlight/5">
          <CardHeader>
            <CardTitle className="text-highlight flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              {l('최우선: 연맹표창 (Alliance Recognition)', 'Ưu tiên nhất: Alliance Recognition', 'Top Priority: Alliance Recognition')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {l(
                '다른 모든 연구보다 먼저 완료하세요. 일일 보상(경찰휘장, 합금, 조각)이 2배가 되어 이후 모든 성장이 가속화됩니다. 단, 9상자 이상 과투자는 금물 — 전투력 성장이 2~3개월 지연됩니다.',
                'Hoàn thành trước mọi NC khác. Phần thưởng hàng ngày (badge, hợp kim, mảnh) tăng gấp đôi. Nhưng KHÔNG đầu tư quá 9 hộp — sẽ chậm sức mạnh 2-3 tháng.',
                'Complete before all other research. Daily rewards (Badges, alloys, fragments) are doubled, accelerating all subsequent growth. However, do NOT over-invest beyond 9 chests — it delays combat power growth by 2-3 months.'
              )}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <p className="text-xl font-bold text-yellow-400">2x</p>
                <p className="text-xs text-muted-foreground">{l('배지', 'Badge', 'Badges')}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <p className="text-xl font-bold text-purple-400">2x</p>
                <p className="text-xs text-muted-foreground">{l('합금', 'Hợp kim', 'Alloys')}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-xl font-bold text-blue-400">2x</p>
                <p className="text-xs text-muted-foreground">{l('조각', 'Mảnh', 'Fragments')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Trees */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('연구 트리 우선순위', 'Thứ tự ưu tiên cây NC', 'Research Tree Priority')}
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

        {/* HP Stacking Strategy */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {l('HP 스택 전략 (35~40% 추가 HP)', 'Chiến lược HP Stack (35-40% HP thêm)', 'HP Stacking Strategy (35-40% bonus HP)')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {l(
                '군사이론 + 전쟁수호 + 도시함락의 에너지 실드를 모두 조합하면 35~40%의 추가 HP를 확보합니다. 이것은 게임 체인저입니다.',
                'Kết hợp Military Strategies + Peace Shield + Siege to Seize Recharge Shield = 35-40% HP thêm. Đây là game changer.',
                'Combining Military Strategies + Peace Shield + Siege to Seize Recharge Shield gives 35-40% bonus HP. This is a game changer.'
              )}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="p-3 rounded-lg bg-red-500/10 text-center">
                <p className="text-red-400 font-bold text-sm">{l('군사이론', 'Military Strategies', 'Military Strategies')}</p>
                <p className="text-lg font-bold text-red-400">10~15%</p>
                <p className="text-xs text-muted-foreground">HP</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                <p className="text-blue-400 font-bold text-sm">{l('전쟁수호 에너지 실드', 'Peace Shield Recharge', 'Peace Shield Recharge')}</p>
                <p className="text-lg font-bold text-blue-400">+%</p>
                <p className="text-xs text-muted-foreground">{l('Lv.10 기준', 'Lv.10', 'At Lv.10')}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                <p className="text-orange-400 font-bold text-sm">{l('도시함락 에너지 실드', 'Siege Recharge', 'Siege Recharge Shield')}</p>
                <p className="text-lg font-bold text-orange-400">+%</p>
                <p className="text-xs text-muted-foreground">{l('Lv.10 기준', 'Lv.10', 'At Lv.10')}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center font-medium">
              {l('= 합산 35~40% 추가 HP (배수 적용)', '= Tổng 35-40% HP thêm (nhân)', '= Combined 35-40% bonus HP (multiplicative)')}
            </p>
          </CardContent>
        </Card>

        {/* Badge Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('주요 연구 배지 비용', 'Chi phí badge NC chính', 'Key Research Badge Costs')}
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
            {l(
              '※ T10 병종(UST)은 F2P 기준 수년 소요, 과금 시 약 $15,000 필요',
              '※ T10 (UST) F2P mất nhiều năm, nạp tiền cần ~$15,000',
              '※ T10 units (UST) take years for F2P, or ~$15,000 if spending'
            )}
          </p>
        </section>

        {/* What to Skip */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {l('스킵/지연 권장', 'Nên bỏ qua/trì hoãn', 'Recommended to Skip/Delay')}
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
            {l('연구 팁', 'Mẹo NC', 'Research Tips')}
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
            <CardTitle>{l('연구 트리 해금 조건', 'Điều kiện mở cây NC', 'Research Tree Unlock Requirements')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">{l('엘리트부대', 'Elite Troops', 'Elite Troops')} 100%</span>
                <span className="text-muted-foreground">→</span>
                <span>{l('군사이론', 'Military Strategies', 'Military Strategies')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">{l('피난소건설', 'Shelter', 'Shelter')} 50% + {l('군사이론', 'Military', 'Military Strategies')} 45%</span>
                <span className="text-muted-foreground">→</span>
                <span>{l('전쟁수호', 'Peace Shield', 'Peace Shield')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">{l('군사이론', 'Military Strategies', 'Military Strategies')} 40%</span>
                <span className="text-muted-foreground">→</span>
                <span>{l('도시함락', 'Siege to Seize', 'Siege to Seize')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">{l('도시함락', 'Siege to Seize', 'Siege to Seize')} 100%</span>
                <span className="text-muted-foreground">→</span>
                <span>{l('야전연구', 'Field Research', 'Field Research')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
