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
  const isKorean = locale === 'ko';

  const stages = [
    {
      stage: 1,
      target: isKorean ? '배럴 4~6개, 게이트 1~2개' : '4-6 barrels, 1-2 gates',
      troops: '~70',
      score: '70+',
      strategy: isKorean ? '벽면을 따라 이동하며 안전하게 배럴 수집' : 'Di chuyển sát tường để thu thập barrel an toàn',
    },
    {
      stage: 2,
      target: isKorean ? '배럴 5개 이상, +10 배수 게이트' : '5+ barrels, +10 multiplier gate',
      troops: '60~80',
      score: '100+',
      strategy: isKorean ? '바퀴 장애물은 중앙으로 회피. 팬텀 스코어 107 이상 목표' : 'Né bánh xe về giữa. Mục tiêu phantom score 107+',
    },
    {
      stage: 3,
      target: isKorean ? '게이트 우선 → 배럴 순서' : 'Gate trước → barrel sau',
      troops: '~70',
      score: '100~120',
      strategy: isKorean ? '속도보다 생존 우선. 베이스 콤보 80 달성' : 'Ưu tiên sống sót hơn tốc độ. Base combo 80',
    },
    {
      stage: 4,
      target: isKorean ? '+10 배수 게이트 2개 필수' : 'Bắt buộc 2 gate x10',
      troops: '40~60',
      score: '100',
      strategy: isKorean ? '병력 40 미만이면 재시작 권장' : 'Restart nếu quân dưới 40',
    },
    {
      stage: 5,
      target: isKorean ? '모든 버프/배럴 수집' : 'Thu thập tất cả buff/barrel',
      troops: '~50',
      score: '90',
      strategy: isKorean ? '생존에 집중. 누적 900+ 목표' : 'Tập trung sống sót. Mục tiêu tổng 900+',
    },
  ];

  const teams = [
    {
      faction: isKorean ? '블러디 로즈' : 'Blood Rose',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      heroes: isKorean
        ? '유찬 S4 (딜러), 리시아 S3 (힐), 소피아 (버프), 카트리나 (광역)'
        : 'Yu Chan S4 (DPS), Licia S3 (Heal), Sophia (Buff), Katrina (AoE)',
    },
    {
      faction: isKorean ? '새벽의 날개' : 'Wings of Dawn',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      heroes: isKorean
        ? '퀴니 (주력), 릴리아나 S3 (딜러), 알마 S2 (컨트롤), 스칼렛 S1'
        : 'Queenie (Main), Liliana S3 (DPS), Alma S2 (Control), Scarlett S1',
    },
    {
      faction: isKorean ? '질서의 수호자' : 'Guard of Order',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      heroes: isKorean
        ? '앰버 S4 (딜러), 도데메키 S3 (버스트), 할리에나 S2'
        : 'Amber S4 (DPS), Dodemeki S3 (Burst), Harleyna S2',
    },
  ];

  const rewards = [
    { tier: isKorean ? '3스테이지 이상 클리어' : '3+ Stages Cleared', reward: isKorean ? '다이아 500+, 경험치 상자, 기본 조각' : '500+ Diamonds, XP Crates, Basic Shards', color: 'text-green-400' },
    { tier: isKorean ? '국가 Top 100' : 'Country Top 100', reward: isKorean ? '다이아 1,000+, A등급 조각, 가속' : '1,000+ Diamonds, A-tier Shards, Speed-ups', color: 'text-blue-400' },
    { tier: isKorean ? '서버 Top 10' : 'Server Top 10', reward: isKorean ? '다이아 5,000+, S등급 영웅 조각, 에픽 장비' : '5,000+ Diamonds, S-tier Shards, Epic Gear', color: 'text-purple-400' },
    { tier: isKorean ? '글로벌 Top 50' : 'Global Top 50', reward: isKorean ? '다이아 10,000+, 레전더리 장비, 프리미엄 스킨' : '10,000+ Diamonds, Legendary Gear, Premium Skins', color: 'text-yellow-400' },
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
            {isKorean ? '전장 돌파 (Battlefield Breakout)' : 'Battlefield Breakout'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '주말 이벤트 — 5개 스테이지를 돌파하며 최고 점수를 달성하세요. 무료 참여, 무제한 재도전 가능.'
              : 'Sự kiện cuối tuần — vượt qua 5 giai đoạn để đạt điểm cao nhất. Miễn phí, thử lại không giới hạn.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '스케줄: 주말 24~48시간, 무료, 무제한 재도전' : 'Lịch: cuối tuần 24-48h, miễn phí, thử lại không giới hạn'}</li>
              <li>• {isKorean ? '점수 = 남은 병력 수. 배럴이 점수의 ~70%를 차지' : 'Điểm = quân còn lại. Barrel chiếm ~70% điểm'}</li>
              <li>• {isKorean ? '좌우 이동 최소화 → 반응 시간 확보' : 'Giảm di chuyển trái-phải → thời gian phản ứng tốt hơn'}</li>
              <li>• {isKorean ? '목표: 누적 800+ (일반 서버), 900+ (경쟁 서버)' : 'Mục tiêu: tổng 800+ (server thường), 900+ (server cạnh tranh)'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Scoring Mechanics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-highlight" />
            {isKorean ? '점수 시스템' : 'Hệ thống điểm'}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '각 스테이지 점수 = 수집한 총 병력 - 위협으로 잃은 병력. 최종 점수 = 5개 스테이지 점수 합계.'
                  : 'Điểm mỗi giai đoạn = tổng quân thu thập - quân mất do mối đe dọa. Điểm cuối = tổng 5 giai đoạn.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <p className="text-green-400 font-bold text-sm">{isKorean ? '배럴 (Barrel)' : 'Barrel'}</p>
                  <p className="text-xs text-muted-foreground">
                    {isKorean ? '점수의 ~70% 차지. 파괴 시 추가 병력/무기 업그레이드/버프 획득' : 'Chiếm ~70% điểm. Phá để nhận thêm quân/nâng cấp vũ khí/buff'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <p className="text-blue-400 font-bold text-sm">{isKorean ? '게이트 (Gate)' : 'Gate'}</p>
                  <p className="text-xs text-muted-foreground">
                    {isKorean ? '배수 보너스 제공. 0에서 시작하여 사격으로 충전 → 대량 보너스 (액티브 스킬 풀차지 등)' : 'Cung cấp bonus nhân. Bắt đầu từ 0, bắn để nạp → bonus lớn (full charge skill, v.v.)'}
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
            {isKorean ? '스테이지별 공략' : 'Chiến lược từng giai đoạn'}
          </h2>
          <div className="space-y-3">
            {stages.map((s) => (
              <Card key={s.stage}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-highlight">
                      {isKorean ? `스테이지 ${s.stage}` : `Stage ${s.stage}`}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-500/30">
                        {isKorean ? `병력 ${s.troops}` : `Troops ${s.troops}`}
                      </Badge>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                        {isKorean ? `목표 ${s.score}점` : `Target ${s.score}pts`}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="text-foreground/70 font-medium">{isKorean ? '수집 목표: ' : 'Collect: '}</span>
                    {s.target}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground/70 font-medium">{isKorean ? '전략: ' : 'Strategy: '}</span>
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
            {isKorean ? '추천 팀 구성' : 'Đội hình đề xuất'}
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
            {isKorean ? '보상 티어' : 'Phần thưởng'}
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
          <h2 className="text-2xl font-bold">{isKorean ? '핵심 팁' : 'Mẹo quan trọng'}</h2>
          <div className="grid gap-3">
            {[
              isKorean ? '배럴을 최우선 파괴하세요 — 점수의 70%를 차지합니다' : 'Phá barrel đầu tiên — chiếm 70% điểm',
              isKorean ? '배수 게이트를 적극적으로 활용하세요 — 병력 수 대폭 증가' : 'Tận dụng gate nhân — tăng quân đáng kể',
              isKorean ? '좌우 이동을 최소화하세요 — 반응 시간 확보가 핵심' : 'Giảm di chuyển trái-phải — thời gian phản ứng là chìa khóa',
              isKorean ? '스테이지 4에서 병력 40 미만이면 바로 재시작하세요' : 'Stage 4 quân dưới 40 thì restart ngay',
              isKorean ? '가속 아이템을 미리 준비하여 스테이지 시간을 단축하세요' : 'Chuẩn bị speed-up trước để rút ngắn thời gian stage',
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
                  {isKorean ? '무제한 재도전' : 'Thử lại không giới hạn'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '이벤트 기간 내 무제한 재도전 가능합니다. 최고 점수만 기록되므로 부담 없이 여러 번 도전하세요. 최적의 경로와 타이밍을 반복 연습하는 것이 핵심입니다.'
                    : 'Thử lại không giới hạn trong thời gian event. Chỉ điểm cao nhất được ghi nhận, nên hãy thử nhiều lần. Luyện đường đi và timing tối ưu là chìa khóa.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
