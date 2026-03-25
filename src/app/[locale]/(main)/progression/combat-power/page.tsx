import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, Zap, Users, Shield, Wrench, FlaskConical, Building2, AlertTriangle, Lightbulb } from 'lucide-react';

export default async function CombatPowerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CombatPowerContent locale={locale} />;
}

function CombatPowerContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const cpCategories = [
    {
      icon: Building2,
      name: l('건물 전투력', 'Sức mạnh công trình', 'Building Power'),
      description: l('본부(HQ), 연구소, 캠프 등 건물 레벨', 'HQ, Lab, Camp levels', 'HQ, Lab, Camp, and other building levels'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: FlaskConical,
      name: l('기술 전투력', 'Sức mạnh công nghệ', 'Tech Power'),
      description: l('연구 완료 수', 'Research completions', 'Completed research count'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Users,
      name: l('병력 전투력', 'Sức mạnh quân đội', 'Troop Power'),
      description: l('병사 수와 티어', 'Troop count and tier', 'Troop count and tier'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      icon: Zap,
      name: l('영웅 전투력', 'Sức mạnh anh hùng', 'Hero Power'),
      description: l('레벨, 성급, 스킬, 장비', 'Level, stars, skills, gear', 'Level, stars, skills, and gear'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: Wrench,
      name: l('차량 전투력', 'Sức mạnh xe', 'Vehicle Power'),
      description: l('차량 레벨, 개조, 부품', 'Vehicle level, mods, parts', 'Vehicle level, mods, and parts'),
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
  ];

  const priorities = [
    {
      rank: 1,
      title: l('연맹표창(AR) 연구 완료', 'Hoàn thành NC Alliance Recognition', 'Complete Alliance Recognition (AR) Research'),
      description: l(
        '일일 보상(배지, 합금, 조각)이 2배가 됩니다. 다른 모든 성장을 가속화하는 핵심 연구입니다.',
        'Phần thưởng hàng ngày (badge, hợp kim, mảnh) tăng gấp đôi. NC cốt lõi tăng tốc mọi phát triển.',
        'Doubles daily rewards (badges, alloys, fragments). Core research that accelerates all other progression.'
      ),
      impact: l('모든 성장 2배 가속', 'Tăng tốc gấp đôi mọi phát triển', '2x growth acceleration'),
    },
    {
      rank: 2,
      title: l('본부(HQ) & 연구소 업그레이드', 'Nâng cấp HQ & Lab', 'Upgrade HQ & Research Lab'),
      description: l(
        '본부(HQ) 없이는 다른 건물 업그레이드가 불가능합니다. 연구소는 본부(HQ) 업그레이드의 필수 조건입니다.',
        'Không nâng cấp HQ thì không nâng được công trình khác. Lab là điều kiện bắt buộc cho HQ.',
        'No other buildings can upgrade without HQ. Research Lab is a prerequisite for HQ upgrades.'
      ),
      impact: l('전체 진행의 기반', 'Nền tảng toàn bộ tiến trình', 'Foundation of all progression'),
    },
    {
      rank: 3,
      title: l('메인 5영웅 집중 육성', 'Tập trung 5 anh hùng chính', 'Focus on Your Main 5 Heroes'),
      description: l(
        '모든 영웅을 고르게 키우면 자원 낭비입니다. 메인 진형 5명에만 투자하세요.',
        'Nuôi đều tất cả anh hùng là lãng phí. Chỉ đầu tư vào 5 anh hùng chính.',
        'Spreading resources across all heroes is wasteful. Invest only in your main 5.'
      ),
      impact: l('영웅 CP 최대화', 'Tối đa hóa CP anh hùng', 'Maximize Hero CP'),
    },
    {
      rank: 4,
      title: l('병력 훈련 24시간 유지', 'Huấn luyện quân 24/7', 'Keep Troop Training 24/7'),
      description: l(
        '훈련 대기열을 항상 채워두세요. 높은 티어 병사가 낮은 티어 다수보다 훨씬 강합니다.',
        'Luôn đầy hàng đợi huấn luyện. Lính tier cao mạnh hơn nhiều lính tier thấp.',
        'Keep the training queue full at all times. Higher tier troops are far stronger than many lower tier ones.'
      ),
      impact: l('병력 CP 지속 증가', 'CP quân đội tăng liên tục', 'Steady Troop CP growth'),
    },
    {
      rank: 5,
      title: l('차량 부품 레벨 100+', 'Linh kiện xe level 100+', 'Vehicle Parts Level 100+'),
      description: l(
        '차량 부품 레벨 15에서 병력 방어력 200% 보너스. 과소평가되는 CP 소스입니다.',
        'Linh kiện xe level 15 cho bonus 200% phòng thủ. Nguồn CP thường bị đánh giá thấp.',
        'Vehicle parts at level 15 grant a 200% troop defense bonus. An underrated CP source.'
      ),
      impact: l('방어력 대폭 상승', 'Tăng phòng thủ lớn', 'Major defense boost'),
    },
  ];

  const doNotUpgrade = [
    {
      name: l('자원 생산 건물 (Lv.20 이상)', 'Công trình sản xuất (trên Lv.20)', 'Resource Production Buildings (above Lv.20)'),
      reason: l(
        '투자 자원 회수에 4개월 이상 소요. ROI가 극히 낮습니다.',
        'Mất 4+ tháng để thu hồi tài nguyên đầu tư. ROI cực thấp.',
        'Takes 4+ months to recoup the investment. Extremely low ROI.'
      ),
    },
    {
      name: l('서포트 영웅 (4성 이상)', 'Anh hùng hỗ trợ (trên 4 sao)', 'Support Heroes (above 4-star)'),
      reason: l(
        '메인 5명 이외의 영웅은 4성까지만 육성하세요.',
        'Anh hùng ngoài 5 người chính chỉ nuôi tới 4 sao.',
        'Only level heroes outside your main 5 up to 4-star.'
      ),
    },
    {
      name: l('영웅훈련 연구 (조종석 이후)', 'NC Hero Training (sau Cockpit)', 'Hero Training Research (after Cockpit)'),
      reason: l(
        '배지 대비 효율이 극히 낮은 "배지 함정"입니다.',
        '"Bẫy badge" với hiệu quả badge cực thấp.',
        'A "badge trap" with extremely low badge efficiency.'
      ),
    },
  ];

  const tips = [
    l(
      '진영 시너지: 같은 진영 5명 배치 시 공격/방어 히든 버프 발동',
      'Synergy phe: 5 anh hùng cùng phe kích hoạt buff ẩn công/thủ',
      'Faction Synergy: Placing 5 heroes from the same faction activates hidden ATK/DEF buffs'
    ),
    l(
      '이벤트 동기화: Full Preparedness 이벤트(08:00/20:00)에 맞춰 업그레이드',
      'Đồng bộ sự kiện: Nâng cấp theo sự kiện Full Preparedness (08:00/20:00)',
      'Event Sync: Time your upgrades with Full Prep events (08:00/20:00)'
    ),
    l(
      '주황 장비: 공훈상점에서 매주 획득 가능, 메인 영웅에게 우선 장착',
      'Trang bị cam: Có thể lấy hàng tuần từ Merit Shop, ưu tiên anh hùng chính',
      'Orange Gear: Available weekly from the Merit Shop — equip to main heroes first'
    ),
    l(
      'HP 연구 우선: HP 연구는 생존력 + 전투력 동시 상승',
      'Ưu tiên NC HP: NC HP tăng cả sinh tồn + sức mạnh',
      'Prioritize HP Research: HP research boosts both survivability and combat power'
    ),
    l(
      '에너지코어: 주황 장비에 고르게 분배, 한 곳에 몰아주지 마세요',
      'Power Core: Phân bổ đều cho trang bị cam, không dồn một chỗ',
      'Power Cores: Distribute evenly across orange gear — don\'t stack them all in one slot'
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
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-highlight" />
            {l('전투력(CP) 올리기 가이드', 'Hướng dẫn tăng Sức mạnh chiến đấu (CP)', 'Combat Power (CP) Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '효율적으로 전투력을 올리는 방법과 우선순위를 알아봅니다.',
              'Tìm hiểu cách tăng CP hiệu quả và thứ tự ưu tiên.',
              'Learn how to raise CP efficiently and what to prioritize.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'TL;DR')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('연맹표창(AR) 연구 최우선 - 모든 보상 2배', 'NC Alliance Recognition ưu tiên nhất - gấp đôi mọi phần thưởng', 'Alliance Recognition (AR) research first — doubles all rewards')}</li>
              <li>• {l('메인 5영웅에만 집중 투자', 'Chỉ tập trung đầu tư 5 anh hùng chính', 'Focus investment on your main 5 heroes only')}</li>
              <li>• {l('자원 생산 건물 스킵 (ROI 4개월+)', 'Bỏ qua công trình sản xuất (ROI 4+ tháng)', 'Skip resource production buildings (ROI 4+ months)')}</li>
              <li>• {l('진영 시너지 활용 - 같은 진영 5명으로 히든 버프', 'Tận dụng synergy phe - 5 anh hùng cùng phe cho buff ẩn', 'Use faction synergy — 5 same-faction heroes for hidden buffs')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* CP Categories */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('전투력 구성 요소 (5가지)', '5 thành phần Sức mạnh chiến đấu', '5 Combat Power Components')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cpCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Card key={idx} className={`${cat.bg} border-none`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <Icon className={`h-6 w-6 ${cat.color} shrink-0`} />
                    <div>
                      <p className={`font-semibold ${cat.color}`}>{cat.name}</p>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            {l(
              '※ 한 카테고리에 치우치지 않고 균형 있게 성장하는 것이 중요합니다.',
              '※ Quan trọng là phát triển cân bằng, không nghiêng về một loại.',
              '※ Balanced growth across all categories is more important than maxing one.'
            )}
          </p>
        </section>

        {/* Priority Order */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('CP 상승 우선순위', 'Thứ tự ưu tiên tăng CP', 'CP Upgrade Priority')}
          </h2>
          <div className="space-y-3">
            {priorities.map((item) => (
              <Card key={item.rank} className={item.rank === 1 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-lg">
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge variant="outline" className="text-xs text-highlight border-highlight/30">
                          {item.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What NOT to Upgrade */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {l('업그레이드 하지 말 것', 'KHÔNG nên nâng cấp', 'Do NOT Upgrade')}
          </h2>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 space-y-4">
              {doNotUpgrade.map((item, idx) => (
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

        {/* F2P Example */}
        <Card className="border-tip/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-tip">
              {l('F2P 플레이어 참고', 'Tham khảo cho F2P', 'F2P Player Reference')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {l(
                '병력 전투력 4,800만 + 건물 전투력 1,030만 조합으로 98-99%의 플레이어를 이길 수 있습니다. 한 카테고리를 극대화하는 것보다 균형 잡힌 성장이 더 효과적입니다.',
                'Kết hợp 48M quân đội + 10.3M công trình có thể thắng 98-99% người chơi. Phát triển cân bằng hiệu quả hơn tối đa hóa một loại.',
                'A combination of 48M troop CP + 10.3M building CP can beat 98-99% of players. Balanced growth is more effective than maxing a single category.'
              )}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-2xl font-bold text-green-400">48M</p>
                <p className="text-xs text-muted-foreground">{l('병력 전투력', 'CP quân đội', 'Troop CP')}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <p className="text-2xl font-bold text-blue-400">10.3M</p>
                <p className="text-xs text-muted-foreground">{l('건물 전투력', 'CP công trình', 'Building CP')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('CP 상승 팁', 'Mẹo tăng CP', 'CP Tips')}
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

        {/* Vehicle Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-400" />
              {l('차량 추천 (F2P)', 'Đề xuất xe (F2P)', 'Recommended Vehicles (F2P)')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="font-semibold text-orange-400">{l('타이탄 (Titan)', 'Titan', 'Titan (Hercules)')}</p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    'F2P/캐주얼 플레이어 최우선 목표. 빠르게 획득 가능하며 효율적입니다.',
                    'Mục tiêu hàng đầu cho F2P/casual. Có thể đạt nhanh và hiệu quả.',
                    'Top priority for F2P/casual players. Quick to obtain and highly efficient.'
                  )}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="font-semibold">{l('파괴자 (Destroyer)+', 'Destroyer+', 'Destroyer+')}</p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '과금 플레이어용. 더 높은 성능을 제공하지만 투자 필요.',
                    'Cho người nạp tiền. Hiệu suất cao hơn nhưng cần đầu tư.',
                    'For spenders. Higher performance but requires significant investment.'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
