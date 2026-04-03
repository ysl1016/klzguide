import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  Trophy,
  Building2,
  FlaskConical,
  Swords,
  Users,
  Wrench,
  Target,
  Lightbulb,
  AlertTriangle,
  Calendar,
  Timer,
  Zap,
} from 'lucide-react';

export default async function AllianceDuelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AllianceDuelContent locale={locale} />;
}

function AllianceDuelContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  // Alliance Duel themes by day (Day 1-6, Monday-Saturday)
  const duelThemesByDay = [
    {
      day: 1,
      dayName: l('월요일', 'Thứ hai', 'Monday'),
      name: l('차량 개조', 'Modded Vehicle Boost', 'Modded Vehicle Boost'),
      nameEn: 'Modded Vehicle Boost',
      icon: Wrench,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      difficulty: l('보통', 'Normal', 'Normal'),
      keyTip: l('오렌지 칩 상자 = 100만 포인트. 렌치와 도면을 집중 사용', 'Orange chip chest = 1M pts. Tập trung dùng cờ lê và blueprint', 'Orange chip chest = 1M pts. Focus on using wrenches and blueprints'),
      activities: l(
        '렌치/골드렌치 사용|개조도면 소모|차량 부품 상자 개봉|부머 레이드 (Lv.9-10)|레이더 이벤트',
        'Dùng cờ lê/golden wrench|Tiêu blueprint|Mở hộp linh kiện xe|Raid Boomer (Lv.9-10)|Sự kiện Radar',
        'Use wrenches/Golden Wrenches|Consume Mod Blueprints|Open vehicle part crates|Boomer Raid (Lv.9-10)|Radar Event'
      ).split('|'),
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 2,
      dayName: l('화요일', 'Thứ ba', 'Tuesday'),
      name: l('건물 업그레이드', 'Shelter Upgrade', 'Shelter Upgrade'),
      nameEn: 'Shelter Upgrade',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      difficulty: l('어려움', 'Hard', 'Hard'),
      keyTip: l('가장 어려운 날. 피난민 모집 = 16.5만 포인트', 'Ngày khó nhất. Tuyển tị nạn = 165K pts', 'Hardest day. Refugee recruitment = 165K pts'),
      activities: l(
        '건물 업그레이드 완료|건설 가속 사용|주황 현상금 퀘스트 우선|피난민 모집권 사용',
        'Hoàn thành nâng cấp công trình|Dùng tăng tốc xây|Ưu tiên bounty cam|Dùng vé tuyển mộ tị nạn',
        'Complete building upgrades|Use construction speed-ups|Prioritize orange bounty quests|Use Recruitment Tickets for refugees'
      ).split('|'),
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 3,
      dayName: l('수요일', 'Thứ tư', 'Wednesday'),
      name: l('과학의 시대', 'Age of Science', 'Age of Science'),
      nameEn: 'Age of Science',
      icon: FlaskConical,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      difficulty: l('보통', 'Normal', 'Normal'),
      keyTip: l('경찰휘장 전용 날. 오렌지 교역 4회 = 120만 포인트. 주간 경찰휘장 10,000개 생산 가능', 'Ngày badge. 4 giao dịch cam = 1.2M pts. Có thể tạo 10,000 badge/tuần', 'Badge day. 4 orange trades = 1.2M pts. Can produce 10,000 badges per week'),
      activities: l(
        '연구 완료|연구 가속 사용|경찰휘장 소모 연구|인터스테이트 트럭 새로고침 (주황 퀘스트)',
        'Hoàn thành nghiên cứu|Dùng tăng tốc NC|NC tiêu badge|Refresh Interstate Truck (quest cam)',
        'Complete research|Use research speed-ups|Badge-consuming research|Refresh Interstate Truck (orange quest)'
      ).split('|'),
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 4,
      dayName: l('목요일', 'Thứ năm', 'Thursday'),
      name: l('영웅육성', 'Hero Initiative', 'Hero Initiative'),
      nameEn: 'Hero Initiative',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      difficulty: l('쉬움', 'Easy', 'Easy'),
      keyTip: l('가장 쉬운 날. 영웅 조각/에너지코어/모집권을 모아뒀다가 이 날 사용', 'Ngày dễ nhất. Tích mảnh anh hùng/Power Core/vé để dùng hôm nay', 'Easiest day. Save hero shards/Power Cores/Recruitment Tickets and use them today'),
      activities: l(
        '영웅 조각 사용|영웅 모집권 사용|프라임 리크루트|에너지코어 사용|주황 장비 조각',
        'Dùng mảnh anh hùng|Dùng vé tuyển mộ anh hùng|Prime Recruit|Dùng Power Core|Mảnh trang bị cam',
        'Use hero shards|Use hero Recruitment Tickets|Prime Recruit|Use Power Cores|Orange gear shards'
      ).split('|'),
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 5,
      dayName: l('금요일', 'Thứ sáu', 'Friday'),
      name: l('종합 성장', 'Holistic Growth', 'Holistic Growth / Army Expansion'),
      nameEn: 'Holistic Growth / Army Expansion',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      difficulty: l('보통', 'Normal', 'Normal'),
      keyTip: l('목요일에 저장한 레이더 작업을 이 날 수행. 훈련 가속 집중 사용', 'Dùng radar đã lưu từ thứ 5. Tập trung tăng tốc huấn luyện', 'Use radar tasks saved from Thursday. Focus on training speed-ups'),
      activities: l(
        '병력 훈련|훈련 가속 사용|병력 승급|건설/연구 가속도 포인트 획득',
        'Huấn luyện quân|Dùng tăng tốc HL|Thăng cấp quân|Tăng tốc xây/NC cũng được điểm',
        'Train troops|Use training speed-ups|Promote troops|Construction/research speed-ups also earn points'
      ).split('|'),
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 6,
      dayName: l('토요일', 'Thứ bảy', 'Saturday'),
      name: l('적 파괴자', 'Enemy Buster', 'Enemy Buster'),
      nameEn: 'Enemy Buster',
      icon: Target,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      difficulty: l('쉬움', 'Easy', 'Easy'),
      keyTip: l('가장 쉬운 이벤트. 승패 무관. 다이아 2,000개 이상 준비 (방패용)', 'Event dễ nhất. Thắng thua không quan trọng. Chuẩn bị 2,000+ diamond (khiên)', 'Easiest event. Win or lose does not matter. Prepare 2,000+ diamonds (for shields)'),
      activities: l(
        '적 기지 공격 (승/패 무관)|TvT 전투|약한 본부(HQ) 타겟팅|용사훈장 + 주황 장비 조각 보상',
        'Tấn công căn cứ địch (thắng/thua đều được)|Chiến đấu TvT|Target HQ yếu|Thưởng Valor Medal + mảnh trang bị cam',
        'Attack enemy bases (win/lose both count)|TvT combat|Target weak HQs|Valor Medal + orange gear shard rewards'
      ).split('|'),
      goldenHour: null, // No matching Full Prep theme
    },
  ];

  // Full Preparedness schedule by day (for Golden Hour reference)
  const fullPrepSchedule = [
    { day: l('일요일', 'CN', 'Sun'), slots: ['차량', '건물', '훈련', '연구', '영웅', '훈련'] },
    { day: l('월요일', 'T2', 'Mon'), slots: ['건물', '연구', '차량', '영웅', '훈련', '차량'] },
    { day: l('화요일', 'T3', 'Tue'), slots: ['연구', '영웅', '건물', '훈련', '차량', '건물'] },
    { day: l('수요일', 'T4', 'Wed'), slots: ['영웅', '훈련', '연구', '차량', '건물', '연구'] },
    { day: l('목요일', 'T5', 'Thu'), slots: ['훈련', '차량', '영웅', '건물', '연구', '영웅'] },
    { day: l('금요일', 'T6', 'Fri'), slots: ['차량', '건물', '훈련', '연구', '영웅', '훈련'] },
    { day: l('토요일', 'T7', 'Sat'), slots: ['연구', '차량', '영웅', '건물', '훈련', '영웅'] },
  ];

  const timeSlots = [
    { apoc: '00:00', korea: '11:00' },
    { apoc: '04:00', korea: '15:00' },
    { apoc: '08:00', korea: '19:00' },
    { apoc: '12:00', korea: '23:00' },
    { apoc: '16:00', korea: '03:00 (+1)' },
    { apoc: '20:00', korea: '07:00 (+1)' },
  ];

  const rewards = [
    { item: l('영웅 경찰휘장', 'Hero Badge', 'Hero Badge'), desc: l('영웅 성급 업그레이드용', 'Để nâng sao anh hùng', 'For hero star upgrades') },
    { item: l('주황 스킬북', 'Orange Skill Book', 'Orange Skill Book'), desc: l('영웅 스킬 레벨업', 'Lên level skill anh hùng', 'Level up hero skills') },
    { item: l('강화 합금', 'Enhancement Alloy', 'Enhancement Alloy'), desc: l('장비 강화용', 'Để nâng cấp trang bị', 'For gear enhancement') },
    { item: l('다이아몬드', 'Diamond', 'Diamonds'), desc: l('범용 프리미엄 재화', 'Tiền tệ premium đa năng', 'Universal premium currency') },
    { item: l('가속 아이템', 'Speedup', 'Speed-ups'), desc: l('각종 가속 아이템', 'Các item tăng tốc', 'Various speed-up items') },
  ];

  const tips = [
    l(
      '영웅 조각, 모집권은 반드시 4일차 목요일 Hero Initiative에만 사용!',
      'Mảnh anh hùng, vé tuyển mộ PHẢI dùng vào ngày 4 (Thứ tư) Hero Initiative!',
      'Hero shards and Recruitment Tickets MUST only be used on Day 4 (Thursday) Hero Initiative!'
    ),
    l(
      '골든아워(전면전비 일치 시간)에 활동하면 양쪽 이벤트에서 동시 포인트 획득',
      'Hoạt động trong Golden Hour = nhận điểm cả 2 sự kiện cùng lúc',
      'Playing during Golden Hour (Full Prep matching time) earns points in both events simultaneously'
    ),
    l(
      '주황 레벨 퀘스트(현상금, 트럭) 우선 - 포인트 가치가 훨씬 높음',
      'Ưu tiên quest cam (bounty, truck) - giá trị điểm cao hơn nhiều',
      'Prioritize orange-level quests (bounty, truck) - they are worth far more points'
    ),
    l(
      '6일차 토요일 Enemy Buster는 전면전비와 겹치지 않음 - 언제든 공격 가능',
      'Ngày 6 (Thứ sáu) Enemy Buster không trùng Full Prep - tấn công bất cứ lúc nào',
      'Day 6 (Saturday) Enemy Buster does not overlap with Full Prep - attack anytime'
    ),
    l(
      '연맹표창(AR) 연구 완료 시 렌치당 포인트 3배 이상 증가!',
      'Khi hoàn thành NC Alliance Recognition, điểm/wrench tăng gấp 3+!',
      'Completing Alliance Recognition research increases points per wrench by 3x or more!'
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
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-highlight" />
            {l('연맹 대결 (Alliance Duel) 가이드', 'Hướng dẫn Alliance Duel', 'Alliance Duel Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '6일간 진행되는 연맹 대결의 일차별 테마와 골든아워 전략을 상세히 알아봅니다.',
              'Tìm hiểu chi tiết theme theo ngày và chiến thuật Golden Hour trong Alliance Duel 6 ngày.',
              'A detailed look at the daily themes and Golden Hour strategies for the 6-day Alliance Duel.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('월~토 6일간 진행, 일요일은 휴식일', 'Diễn ra 6 ngày (T2-T7), Chủ nhật nghỉ', 'Runs for 6 days (Mon-Sat), Sunday is a rest day')}</li>
              <li>• {l('매일 다른 테마 - 해당 테마 활동만 포인트 획득', 'Mỗi ngày theme khác - chỉ hoạt động đúng theme mới được điểm', 'Different theme each day - only matching activities earn points')}</li>
              <li>• {l('골든아워: 전면전비와 테마가 일치할 때 (양쪽 포인트 동시 획득)', 'Golden Hour: khi theme trùng với Full Prep (nhận điểm cả 2)', 'Golden Hour: when the theme matches Full Prep (earn points in both)')}</li>
              <li>• {l('Apocalypse Time = UTC-2 (한국시간 -11시간)', 'Apocalypse Time = UTC-2 (giờ Hàn Quốc -11 tiếng)', 'Apocalypse Time = UTC-2 (KST -11 hours)')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Apocalypse Time Explanation */}
        <Card className="border-highlight/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Timer className="h-6 w-6 text-highlight shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-highlight mb-2">
                  {l('Apocalypse Time (게임 서버 시간)', 'Apocalypse Time (Giờ server game)', 'Apocalypse Time (Game Server Time)')}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {l(
                    'Apocalypse Time은 UTC-2 시간대입니다. 한국시간(KST)으로 변환하려면 +11시간 하세요.',
                    'Apocalypse Time là múi giờ UTC-2. Để chuyển sang giờ Hàn Quốc (KST), cộng thêm 11 tiếng.',
                    'Apocalypse Time uses the UTC-2 timezone. To convert to KST, add 11 hours.'
                  )}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {timeSlots.map((slot) => (
                    <div key={slot.apoc} className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-muted-foreground">Apoc {slot.apoc}</p>
                      <p className="font-semibold text-highlight">
                        {l(`한국 ${slot.korea}`, `Hàn ${slot.korea}`, `KST ${slot.korea}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Themes - Day by Day */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            {l('일차별 테마 (1일차~6일차)', 'Theme theo ngày (Ngày 1-6)', 'Daily Themes (Day 1-6)')}
          </h2>
          <div className="space-y-4">
            {duelThemesByDay.map((theme) => {
              const Icon = theme.icon;
              return (
                <Card key={theme.day} className={`${theme.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`${theme.color} border-current`}>
                        {l(`${theme.day}일차`, `Ngày ${theme.day}`, `Day ${theme.day}`)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{theme.dayName}</span>
                      <span className={`flex items-center gap-1 text-base ${theme.color}`}>
                        <Icon className="h-5 w-5" />
                        {theme.name}
                      </span>
                      {'difficulty' in theme && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          {(theme as { difficulty: string }).difficulty}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {'keyTip' in theme && (
                      <p className="text-xs font-medium text-highlight bg-highlight/10 rounded p-2">
                        {(theme as { keyTip: string }).keyTip}
                      </p>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {l('포인트 획득 활동:', 'Hoạt động lấy điểm:', 'Point-earning activities:')}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {theme.activities.map((activity, idx) => (
                          <li key={idx}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    {theme.goldenHour ? (
                      <div className="p-2 rounded bg-yellow-500/20 border border-yellow-500/30 space-y-1">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          <span className="font-semibold text-yellow-400 text-sm">
                            {l('골든아워:', 'Golden Hour:', 'Golden Hour:')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 space-y-0.5">
                          {theme.goldenHour.map((gh, idx) => (
                            <p key={idx}>
                              Apoc {gh.apoc} = {l('한국', 'Hàn', 'KST')} {gh.korea}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {l(
                            '전면전비와 일치하는 테마 없음 - 언제든 활동 가능',
                            'Không có theme Full Prep trùng - hoạt động bất cứ lúc nào',
                            'No matching Full Prep theme - you can do activities anytime'
                          )}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Golden Hour Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            {l('골든아워 상세 설명', 'Chi tiết Golden Hour', 'Golden Hour Details')}
          </h2>
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4 space-y-4">
              <p className="text-muted-foreground">
                {l(
                  '골든아워는 연맹 대결 테마와 전면전비 테마가 일치하는 시간대입니다. 이 시간에 활동하면 두 이벤트에서 동시에 포인트를 획득할 수 있어 효율이 2배가 됩니다.',
                  'Golden Hour là khi theme Alliance Duel trùng với theme Full Prep. Hoạt động lúc này sẽ nhận điểm từ cả 2 sự kiện, hiệu quả gấp đôi.',
                  'Golden Hour is when the Alliance Duel theme matches the Full Prep theme. Playing during this window earns points in both events simultaneously, doubling your efficiency.'
                )}
              </p>

              {/* Golden Hour Time Windows */}
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="font-bold text-yellow-400 mb-3 text-center">
                  {l('골든아워 시간대 (매일 2회)', 'Khung giờ Golden Hour (2 lần/ngày)', 'Golden Hour Windows (twice daily)')}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="text-center p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {l('1차 골든아워', 'Golden Hour 1', 'Golden Hour 1')}
                    </p>
                    <p className="text-sm text-muted-foreground">Apoc 08:00 - 12:00</p>
                    <p className="font-bold text-yellow-400 text-lg">
                      {l('한국 19:00 - 23:00', 'Hàn 19:00 - 23:00', 'KST 19:00 - 23:00')}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {l('2차 골든아워', 'Golden Hour 2', 'Golden Hour 2')}
                    </p>
                    <p className="text-sm text-muted-foreground">Apoc 20:00 - 00:00</p>
                    <p className="font-bold text-yellow-400 text-lg">
                      {l('한국 07:00 - 11:00', 'Hàn 07:00 - 11:00', 'KST 07:00 - 11:00')}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2 text-muted-foreground">
                  {l('1~5일차는 골든아워 적용, 6일차(Enemy Buster)는 해당 없음', 'Ngày 1-5 có Golden Hour, Ngày 6 (Enemy Buster) không có', 'Days 1-5 have Golden Hour, Day 6 (Enemy Buster) does not')}
                </p>
              </div>

              <div className="p-3 rounded bg-muted/30 border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-highlight">💡 {l('팁', 'Mẹo', 'Tip')}:</span>{' '}
                  {l(
                    '가속 아이템, 렌치, 영웅 조각 등 중요 자원은 골든아워(19:00-23:00 또는 07:00-11:00)에 사용하세요. 같은 자원으로 2배의 보상!',
                    'Dùng tăng tốc, cờ lê, mảnh anh hùng trong Golden Hour (19:00-23:00 hoặc 07:00-11:00). Cùng tài nguyên nhưng thưởng gấp đôi!',
                    'Use speed-ups, wrenches, and hero shards during Golden Hour (19:00-23:00 or 07:00-11:00 KST). Same resources, double the rewards!'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Full Prep Schedule Reference */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('전면전비 스케줄 참고표', 'Lịch Full Prep tham khảo', 'Full Prep Schedule Reference')}
          </h2>
          <Card>
            <CardContent className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground">{l('요일', 'Ngày', 'Day')}</th>
                    {timeSlots.map((slot) => (
                      <th key={slot.apoc} className="text-center p-2 text-muted-foreground text-xs">
                        <div>{slot.apoc}</div>
                        <div className="text-highlight">{slot.korea}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fullPrepSchedule.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="p-2 font-medium">{row.day}</td>
                      {row.slots.map((slot, slotIdx) => (
                        <td key={slotIdx} className="text-center p-2 text-xs text-muted-foreground">
                          {slot}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {l(
                  '* 상단: Apocalypse Time / 하단: 한국시간 (KST)',
                  '* Trên: Apocalypse Time / Dưới: Giờ Hàn Quốc (KST)',
                  '* Top: Apocalypse Time / Bottom: Korean Standard Time (KST)'
                )}
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
                  {l('흔한 실수 - 반드시 피해야 할 것', 'Sai lầm phổ biến - PHẢI tránh', 'Common Mistakes - MUST Avoid')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {l('영웅 조각/모집권을 4일차 목요일 외에 사용', 'Dùng mảnh anh hùng/vé tuyển mộ ngoài ngày 4 (Thứ năm)', 'Using hero shards/Recruitment Tickets outside of Day 4 (Thursday)')}</li>
                  <li>• {l('렌치를 1일차 월요일 외에 사용', 'Dùng cờ lê ngoài ngày 1 (Thứ hai)', 'Using wrenches outside of Day 1 (Monday)')}</li>
                  <li>• {l('골든아워 외 시간에 가속 아이템 대량 소모', 'Dùng nhiều tăng tốc ngoài Golden Hour', 'Mass-consuming speed-ups outside of Golden Hour')}</li>
                  <li>• {l('주황 레벨 퀘스트(현상금, 트럭) 무시', 'Bỏ qua quest cấp cam (bounty, truck)', 'Ignoring orange-level quests (bounty, truck)')}</li>
                  <li>• {l('6일차 토요일에 무작정 강한 적 공격 (병력 손실 주의)', 'Ngày 6 (Thứ bảy) tấn công địch mạnh bừa bãi (coi chừng mất quân)', 'Recklessly attacking strong enemies on Day 6 Saturday (watch out for troop losses)')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('보상 (최대 9개 상자)', 'Phần thưởng (tối đa 9 hộp)', 'Rewards (up to 9 boxes)')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.item}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {l(
                  '점수 마일스톤 달성 시 상자 해금 + 글로벌 순위 보상',
                  'Mở hộp khi đạt điểm milestone + thưởng xếp hạng global',
                  'Unlock boxes at score milestones + global ranking rewards'
                )}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('전략 팁', 'Mẹo chiến thuật', 'Strategy Tips')}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              {l('참고 자료: ', 'Nguồn tham khảo: ', 'Sources: ')}
              <a href="https://bacons-last-z-guide.fandom.com/wiki/Alliance_Duel" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                Bacon&apos;s Guide Wiki
              </a>
              {', '}
              <a href="https://lastz.fandom.com/wiki/Apocalypse_Time" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                Last Z Wiki
              </a>
              {', '}
              <a href="https://lastzdata.com/home/alliance-duel/" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                LastZData
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
