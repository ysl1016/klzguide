import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Lightbulb, AlertTriangle, Target, Shield, Swords, Users, Trophy, RotateCcw } from 'lucide-react';

export default async function BattlefieldBreakoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BattlefieldBreakoutContent locale={locale} />;
}

function BattlefieldBreakoutContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const stages = [
    {
      stage: 1,
      target: l('배럴 4~6개, 게이트 1~2개', '4-6 barrels, 1-2 gates', '4-6 barrels, 1-2 gates'),
      troops: '~70',
      score: '70+',
      strategy: l('벽면을 따라 이동하며 안전하게 배럴 수집', 'Di chuyển sát tường để thu thập barrel an toàn', 'Move along walls to safely collect barrels'),
    },
    {
      stage: 2,
      target: l('배럴 5개 이상, +10 배수 게이트', '5+ barrels, +10 multiplier gate', '5+ barrels, +10 multiplier gate'),
      troops: '60~80',
      score: '100+',
      strategy: l('바퀴 장애물은 중앙으로 회피. 팬텀 스코어 107 이상 목표', 'Né bánh xe về giữa. Mục tiêu phantom score 107+', 'Dodge wheel obstacles toward center. Aim for phantom score 107+'),
    },
    {
      stage: 3,
      target: l('게이트 우선 → 배럴 순서', 'Gate trước → barrel sau', 'Gates first → barrels second'),
      troops: '~70',
      score: '100~120',
      strategy: l('속도보다 생존 우선. 베이스 콤보 80 달성', 'Ưu tiên sống sót hơn tốc độ. Base combo 80', 'Prioritize survival over speed. Reach base combo 80'),
    },
    {
      stage: 4,
      target: l('+10 배수 게이트 2개 필수', 'Bắt buộc 2 gate x10', 'Must get 2 x10 multiplier gates'),
      troops: '40~60',
      score: '100',
      strategy: l('병력 40 미만이면 재시작 권장', 'Restart nếu quân dưới 40', 'Restart recommended if troops below 40'),
    },
    {
      stage: 5,
      target: l('모든 버프/배럴 수집', 'Thu thập tất cả buff/barrel', 'Collect all buffs/barrels'),
      troops: '~50',
      score: '90',
      strategy: l('생존에 집중. 누적 900+ 목표', 'Tập trung sống sót. Mục tiêu tổng 900+', 'Focus on survival. Aim for 900+ cumulative'),
    },
  ];

  const teams = [
    {
      faction: l('블러디 로즈', 'Blood Rose', 'Blood Rose'),
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      heroes: l(
        '유찬 S4 (딜러), 리시아 S3 (힐), 소피아 (버프), 카트리나 (광역)',
        'Yu Chan S4 (DPS), Licia S3 (Heal), Sophia (Buff), Katrina (AoE)',
        'Yu Chan S4 (DPS), Licia S3 (Heal), Sophia (Buff), Katrina (AoE)'
      ),
    },
    {
      faction: l('새벽의 날개', 'Wings of Dawn', 'Wings of Dawn'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      heroes: l(
        '퀴니 (주력), 릴리아나 S3 (딜러), 알마 S2 (컨트롤), 스칼렛 S1',
        'Queenie (Main), Liliana S3 (DPS), Alma S2 (Control), Scarlett S1',
        'Queenie (Main), Liliana S3 (DPS), Alma S2 (Control), Scarlett S1'
      ),
    },
    {
      faction: l('질서의 수호자', 'Guard of Order', 'Guard of Order'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      heroes: l(
        '앰버 S4 (딜러), 도데메키 S3 (버스트), 할리에나 S2',
        'Amber S4 (DPS), Dodemeki S3 (Burst), Harleyna S2',
        'Amber S4 (DPS), Dodemeki S3 (Burst), Harleyna S2'
      ),
    },
  ];

  const rewards = [
    { tier: l('3스테이지 이상 클리어', '3+ Stages Cleared', '3+ Stages Cleared'), reward: l('다이아 500+, 경험치 상자, 기본 조각', '500+ Diamonds, XP Crates, Basic Shards', '500+ Diamonds, XP Crates, Basic Shards'), color: 'text-green-400' },
    { tier: l('국가 Top 100', 'Country Top 100', 'Country Top 100'), reward: l('다이아 1,000+, A등급 조각, 가속', '1,000+ Diamonds, A-tier Shards, Speed-ups', '1,000+ Diamonds, A-tier Shards, Speed-ups'), color: 'text-blue-400' },
    { tier: l('서버 Top 10', 'Server Top 10', 'Server Top 10'), reward: l('다이아 5,000+, S등급 영웅 조각, 에픽 장비', '5,000+ Diamonds, S-tier Shards, Epic Gear', '5,000+ Diamonds, S-tier Hero Shards, Epic Gear'), color: 'text-purple-400' },
    { tier: l('글로벌 Top 50', 'Global Top 50', 'Global Top 50'), reward: l('다이아 10,000+, 레전더리 장비, 프리미엄 스킨', '10,000+ Diamonds, Legendary Gear, Premium Skins', '10,000+ Diamonds, Legendary Gear, Premium Skins'), color: 'text-yellow-400' },
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
            <Target className="h-8 w-8 text-highlight" />
            {l('전장 돌파 (Battlefield Breakout)', 'Battlefield Breakout', 'Battlefield Breakout')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '주말 이벤트 — 5개 스테이지를 돌파하며 최고 점수를 달성하세요. 무료 참여, 무제한 재도전 가능.',
              'Sự kiện cuối tuần — vượt qua 5 giai đoạn để đạt điểm cao nhất. Miễn phí, thử lại không giới hạn.',
              'Weekend event — clear 5 stages to achieve the highest score. Free entry, unlimited retries.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('스케줄: 주말 24~48시간, 무료, 무제한 재도전', 'Lịch: cuối tuần 24-48h, miễn phí, thử lại không giới hạn', 'Schedule: Weekend 24-48h, free entry, unlimited retries')}</li>
              <li>• {l('점수 = 남은 병력 수. 배럴이 점수의 ~70%를 차지', 'Điểm = quân còn lại. Barrel chiếm ~70% điểm', 'Score = remaining troops. Barrels account for ~70% of score')}</li>
              <li>• {l('좌우 이동 최소화 → 반응 시간 확보', 'Giảm di chuyển trái-phải → thời gian phản ứng tốt hơn', 'Minimize left-right movement → better reaction time')}</li>
              <li>• {l('목표: 누적 800+ (일반 서버), 900+ (경쟁 서버)', 'Mục tiêu: tổng 800+ (server thường), 900+ (server cạnh tranh)', 'Target: cumulative 800+ (normal server), 900+ (competitive server)')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Scoring Mechanics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-highlight" />
            {l('점수 시스템', 'Hệ thống điểm', 'Scoring System')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {l(
                  '각 스테이지 점수 = 수집한 총 병력 - 위협으로 잃은 병력. 최종 점수 = 5개 스테이지 점수 합계.',
                  'Điểm mỗi giai đoạn = tổng quân thu thập - quân mất do mối đe dọa. Điểm cuối = tổng 5 giai đoạn.',
                  'Each stage score = total troops collected - troops lost to hazards. Final score = sum of all 5 stages.'
                )}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <p className="text-green-400 font-bold text-sm">{l('배럴 (Barrel)', 'Barrel', 'Barrel')}</p>
                  <p className="text-xs text-muted-foreground">
                    {l('점수의 ~70% 차지. 파괴 시 추가 병력/무기 업그레이드/버프 획득', 'Chiếm ~70% điểm. Phá để nhận thêm quân/nâng cấp vũ khí/buff', 'Accounts for ~70% of score. Destroying them gives extra troops/weapon upgrades/buffs')}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <p className="text-blue-400 font-bold text-sm">{l('게이트 (Gate)', 'Gate', 'Gate')}</p>
                  <p className="text-xs text-muted-foreground">
                    {l('배수 보너스 제공. 0에서 시작하여 사격으로 충전 → 대량 보너스 (액티브 스킬 풀차지 등)', 'Cung cấp bonus nhân. Bắt đầu từ 0, bắn để nạp → bonus lớn (full charge skill, v.v.)', 'Provides multiplier bonus. Starts at 0, charge by shooting → massive bonus (active skill full charge, etc.)')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stage-by-Stage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-highlight" />
            {l('스테이지별 공략', 'Chiến lược từng giai đoạn', 'Stage-by-Stage Strategy')}
          </h2>
          <div className="space-y-3">
            {stages.map((s) => (
              <Card key={s.stage}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-highlight">
                      {l(`스테이지 ${s.stage}`, `Stage ${s.stage}`, `Stage ${s.stage}`)}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-500/30">
                        {l(`병력 ${s.troops}`, `Troops ${s.troops}`, `Troops ${s.troops}`)}
                      </Badge>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                        {l(`목표 ${s.score}점`, `Target ${s.score}pts`, `Target ${s.score}pts`)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="text-foreground/70 font-medium">{l('수집 목표: ', 'Collect: ', 'Collect: ')}</span>
                    {s.target}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground/70 font-medium">{l('전략: ', 'Strategy: ', 'Strategy: ')}</span>
                    {s.strategy}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Teams */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-highlight" />
            {l('추천 팀 구성', 'Đội hình đề xuất', 'Recommended Teams')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {teams.map((team) => (
              <Card key={team.faction} className={`${team.bg} border-none`}>
                <CardContent className="p-4">
                  <p className={`font-bold mb-2 ${team.color}`}>{team.faction}</p>
                  <p className="text-sm text-muted-foreground">{team.heroes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            {l('보상 티어', 'Phần thưởng', 'Reward Tiers')}
          </h2>
          <div className="space-y-2">
            {rewards.map((r, idx) => (
              <Card key={idx}>
                <CardContent className="p-3 flex items-center justify-between">
                  <span className={`font-medium text-sm ${r.color}`}>{r.tier}</span>
                  <span className="text-xs text-muted-foreground">{r.reward}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('핵심 팁', 'Mẹo quan trọng', 'Key Tips')}</h2>
          <div className="grid gap-3">
            {[
              l('배럴을 최우선 파괴하세요 — 점수의 70%를 차지합니다', 'Phá barrel đầu tiên — chiếm 70% điểm', 'Destroy barrels first — they account for 70% of your score'),
              l('배수 게이트를 적극적으로 활용하세요 — 병력 수 대폭 증가', 'Tận dụng gate nhân — tăng quân đáng kể', 'Actively use multiplier gates — significantly increases troop count'),
              l('좌우 이동을 최소화하세요 — 반응 시간 확보가 핵심', 'Giảm di chuyển trái-phải — thời gian phản ứng là chìa khóa', 'Minimize left-right movement — reaction time is key'),
              l('스테이지 4에서 병력 40 미만이면 바로 재시작하세요', 'Stage 4 quân dưới 40 thì restart ngay', 'Restart immediately if troops drop below 40 at Stage 4'),
              l('가속 아이템을 미리 준비하여 스테이지 시간을 단축하세요', 'Chuẩn bị speed-up trước để rút ngắn thời gian stage', 'Prepare speed-up items in advance to shorten stage time'),
            ].map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Restart Note */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <RotateCcw className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-amber-400 mb-1">
                  {l('무제한 재도전', 'Thử lại không giới hạn', 'Unlimited Retries')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '이벤트 기간 내 무제한 재도전 가능합니다. 최고 점수만 기록되므로 부담 없이 여러 번 도전하세요. 최적의 경로와 타이밍을 반복 연습하는 것이 핵심입니다.',
                    'Thử lại không giới hạn trong thời gian event. Chỉ điểm cao nhất được ghi nhận, nên hãy thử nhiều lần. Luyện đường đi và timing tối ưu là chìa khóa.',
                    'Unlimited retries during the event period. Only your highest score is recorded, so feel free to try many times. Practicing optimal routes and timing is the key.'
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
