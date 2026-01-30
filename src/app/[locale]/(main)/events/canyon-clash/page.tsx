import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Trophy, Target, Lightbulb, AlertTriangle, Calendar, Zap, Building, Users, Heart, Map, Shield, Crosshair, Timer, ArrowRight, Flame } from 'lucide-react';

export default async function CanyonClashPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CanyonClashContent locale={locale} />;
}

function CanyonClashContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // Weekly Schedule
  const canyonSchedule = [
    {
      day: isKorean ? '월~화' : 'T2-T3',
      activity: isKorean ? '투표' : 'Vote',
      desc: isKorean ? '연맹원 참여 시간 투표' : 'Thành viên vote thời gian',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      day: isKorean ? '수요일' : 'T4',
      activity: isKorean ? '등록' : 'Register',
      desc: isKorean ? 'R4/R5가 연맹 등록' : 'R4/R5 đăng ký LM',
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    },
    {
      day: isKorean ? '목요일' : 'T5',
      activity: isKorean ? '매칭' : 'Matchmaking',
      desc: isKorean ? '상위 30명 전투력 기준 매칭' : 'Matching theo CP top 30',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    },
    {
      day: isKorean ? '금요일' : 'T6',
      activity: isKorean ? '전투' : 'Battle',
      desc: isKorean ? '준비 10분 + 본전투 40분' : '10p chuẩn bị + 40p chiến đấu',
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
  ];

  // Battle Timeline
  const battleTimeline = [
    {
      time: isKorean ? '0:00 - 10:00' : '0:00 - 10:00',
      phase: isKorean ? '준비 단계' : 'Giai đoạn chuẩn bị',
      desc: isKorean ? '맵 정찰, 전략 논의, 부대 배치 확인' : 'Trinh sát bản đồ, thảo luận chiến lược, xác nhận đội hình',
      color: 'text-blue-400'
    },
    {
      time: isKorean ? '10:00 - 15:00' : '10:00 - 15:00',
      phase: isKorean ? '초반 (보스 1차)' : 'Đầu game (Boss 1)',
      desc: isKorean ? '야전 병원/정수 시설 우선 점령 → 5분에 1차 보스 스폰' : 'Ưu tiên chiếm bệnh viện/nhà máy nước → Boss 1 spawn 5 phút',
      color: 'text-green-400'
    },
    {
      time: isKorean ? '15:00 - 25:00' : '15:00 - 25:00',
      phase: isKorean ? '중반 (보스 2차)' : 'Giữa game (Boss 2)',
      desc: isKorean ? '군사 기지 점령 → 15분에 2차 보스 스폰 → 데미지 버프 확보' : 'Chiếm căn cứ quân sự → Boss 2 spawn 15 phút → lấy buff damage',
      color: 'text-yellow-400'
    },
    {
      time: isKorean ? '25:00 - 40:00' : '25:00 - 40:00',
      phase: isKorean ? '후반 (보스 3차)' : 'Cuối game (Boss 3)',
      desc: isKorean ? '에너지 셀 운반 집중 → 25분에 3차 보스 → 마지막 포인트 경쟁' : 'Tập trung vận chuyển energy cell → Boss 3 phút 25 → cạnh tranh điểm cuối',
      color: 'text-red-400'
    },
  ];

  // Map Buildings and Scoring
  const mapBuildings = [
    {
      name: isKorean ? '야전 병원' : 'Field Hospital',
      icon: Heart,
      count: 2,
      firstCapture: '1,800',
      perMinute: '50',
      sustain: '1,200',
      effect: isKorean ? '부대 힐링 속도 +30%' : '+30% tốc độ hồi máu',
      priority: isKorean ? '최우선' : 'Ưu tiên cao nhất',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
    {
      name: isKorean ? '정수 시설' : 'Water Refinery',
      icon: Shield,
      count: 1,
      firstCapture: '900',
      perMinute: '50',
      sustain: '600',
      effect: isKorean ? '부대 방어력 +20%' : '+20% phòng thủ',
      priority: isKorean ? '높음' : 'Cao',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      name: isKorean ? '군사 기지' : 'Military Base',
      icon: Crosshair,
      count: 2,
      firstCapture: '2,700',
      perMinute: '300',
      sustain: '1,800',
      effect: isKorean ? '부대 공격력 +25%' : '+25% sức tấn công',
      priority: isKorean ? '중반 핵심' : 'Quan trọng giữa game',
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      name: isKorean ? '에너지 스테이션' : 'Energy Station',
      icon: Zap,
      count: 1,
      firstCapture: isKorean ? '셀당 100,000' : '100,000/cell',
      perMinute: '-',
      sustain: '-',
      effect: isKorean ? '에너지 셀 생성 (운반 필요)' : 'Tạo energy cell (cần vận chuyển)',
      priority: isKorean ? '후반 핵심' : 'Quan trọng cuối game',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    },
  ];

  // Canyon Boss
  const canyonBoss = {
    name: isKorean ? '협곡 대장 (Canyon Captain)' : 'Canyon Captain (Boss)',
    spawnTimes: [
      { time: isKorean ? '5분' : '5 phút', phase: isKorean ? '1차' : 'Lần 1' },
      { time: isKorean ? '15분' : '15 phút', phase: isKorean ? '2차' : 'Lần 2' },
      { time: isKorean ? '25분' : '25 phút', phase: isKorean ? '3차' : 'Lần 3' },
    ],
    buffs: [
      { buff: isKorean ? '+50% 행군 속도' : '+50% March Speed', icon: '🏃' },
      { buff: isKorean ? '+50% 포인트 획득' : '+50% Points', icon: '⭐' },
      { buff: isKorean ? '+40% 데미지' : '+40% Damage', icon: '⚔️' },
    ],
  };

  // Rewards
  const personalRewards = [
    { points: '50,000+', rewards: isKorean ? '5,000 Valor Medals + 150 오렌지 스킬북' : '5,000 Valor Medals + 150 Orange Skill Book' },
    { points: '100,000+', rewards: isKorean ? '10,000 Valor Medals + 300 오렌지 스킬북' : '10,000 Valor Medals + 300 Orange Skill Book' },
    { points: '150,000+', rewards: isKorean ? '15,000 Valor Medals + 500 오렌지 스킬북' : '15,000 Valor Medals + 500 Orange Skill Book' },
  ];

  // Eligibility
  const eligibility = [
    { req: isKorean ? '서버 전투력 TOP 20 연맹' : 'Top 20 LM theo sức mạnh server', icon: Trophy },
    { req: isKorean ? '연맹원 40명 이상' : '40+ thành viên LM', icon: Users },
    { req: isKorean ? '가입 후 24시간 이상 경과' : 'Gia nhập 24h+ trước', icon: Timer },
    { req: isKorean ? '15명 이상 참여 신청' : '15+ người đăng ký', icon: Shield },
  ];

  // Strategic Tips by Phase
  const phaseTips = {
    early: [
      isKorean ? '야전 병원 2개 먼저 점령 - 힐링 버프로 지속 전투력 확보' : 'Chiếm 2 bệnh viện trước - buff heal duy trì sức chiến đấu',
      isKorean ? '정수 시설 확보로 방어력 향상 - 아군 생존율 UP' : 'Chiếm nhà máy nước tăng phòng thủ - tăng tỷ lệ sống sót',
      isKorean ? '5분 보스에 전력 집중 - 첫 버프가 중반 전투 결정' : 'Tập trung boss 5 phút - buff đầu quyết định giữa game',
    ],
    mid: [
      isKorean ? '군사 기지 2개 점령 → 공격력 버프 확보' : 'Chiếm 2 căn cứ quân sự → lấy buff tấn công',
      isKorean ? '15분 보스 경쟁 - 데미지 버프로 후반 우위' : 'Cạnh tranh boss 15 phút - buff damage lợi thế cuối game',
      isKorean ? '텔레포트(3분 쿨타임) 활용한 측면 기습' : 'Dùng teleport (cooldown 3 phút) đánh tập hậu',
    ],
    late: [
      isKorean ? '에너지 셀 운반이 핵심 - 셀당 100,000 포인트!' : 'Vận chuyển energy cell là chính - 100,000 điểm/cell!',
      isKorean ? '셀 캐리어 보호 부대 필수 - 적 기습 대비' : 'Đội bảo vệ carrier bắt buộc - phòng địch tập kích',
      isKorean ? '25분 마지막 보스 - 역전 기회 또는 리드 확보' : 'Boss 25 phút cuối - cơ hội lật ngược hoặc giữ lead',
    ],
  };

  // General Tips
  const generalTips = [
    isKorean ? '연맹 음성채팅 필수 - 실시간 조율이 승패 결정' : 'Voice chat LM bắt buộc - phối hợp real-time quyết định thắng thua',
    isKorean ? '개인 공격 금지 - 항상 연맹 지휘에 따라 이동' : 'Cấm tấn công đơn lẻ - luôn di chuyển theo chỉ huy LM',
    isKorean ? '사망 부대는 즉시 재편성 - 병원 점령 시 힐링 빠름' : 'Đội chết tái tổ chức ngay - heal nhanh nếu chiếm bệnh viện',
    isKorean ? '매칭은 TOP 30 전투력 기준 - 고전력 멤버 참여 중요' : 'Matching theo CP top 30 - quan trọng có thành viên CP cao',
    isKorean ? 'R4/R5만 등록 가능 - 수요일 전 반드시 확인' : 'Chỉ R4/R5 đăng ký được - kiểm tra trước thứ 4',
    isKorean ? 'Valor Medals로 블랙마켓 오렌지 장비 구매!' : 'Mua trang bị cam Black Market bằng Valor Medals!',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-advanced">
              {t('difficulty.advanced')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              15 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building className="h-8 w-8 text-orange-400" />
            {isKorean ? '협곡쟁탈전 (Canyon Clash) 완벽 가이드' : 'Hướng dẫn đầy đủ Canyon Clash'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '금요일 연맹 대 연맹 1시간 전투 이벤트입니다. 건물 점령, 보스 처치, 에너지 셀 운반으로 승리를 쟁취하세요.'
              : 'Sự kiện LM vs LM 1 tiếng vào thứ 6. Chiến thắng bằng chiếm công trình, đánh boss, vận chuyển energy cell.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2 text-orange-400">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '일정: 월~화(투표) → 수(등록) → 목(매칭) → 금(전투)' : 'Lịch: T2-T3(vote) → T4(đăng ký) → T5(matching) → T6(chiến đấu)'}</li>
              <li>• {isKorean ? '전투 시간: 준비 10분 + 본전투 40분 = 총 50분' : 'Thời gian: 10p chuẩn bị + 40p chiến đấu = 50 phút'}</li>
              <li>• {isKorean ? '보스 스폰: 5분, 15분, 25분 (버프 획득 기회)' : 'Boss spawn: 5, 15, 25 phút (cơ hội lấy buff)'}</li>
              <li>• {isKorean ? '최대 보상: 150K+ 포인트 → 15,000 Valor Medals + 500 오렌지 스킬북' : 'Thưởng max: 150K+ điểm → 15,000 Valor Medals + 500 Orange Skill Book'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-highlight" />
            {isKorean ? '주간 일정' : 'Lịch tuần'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {canyonSchedule.map((item, idx) => (
              <Card key={idx} className={`${item.bg} border-none`}>
                <CardContent className="p-4 text-center">
                  <Badge variant="outline" className={`mb-2 ${item.color}`}>{item.day}</Badge>
                  <p className={`font-bold text-lg ${item.color}`}>{item.activity}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="w-full">
                <p className="font-semibold text-yellow-400 mb-3">
                  {isKorean ? '참가 자격' : 'Điều kiện tham gia'}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {eligibility.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="h-4 w-4 text-yellow-400" />
                        <span>{item.req}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Battle Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Timer className="h-6 w-6 text-blue-400" />
            {isKorean ? '전투 타임라인' : 'Timeline trận chiến'}
          </h2>
          <div className="space-y-3">
            {battleTimeline.map((phase, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Badge variant="outline" className={`${phase.color} font-mono`}>{phase.time}</Badge>
                    </div>
                    <div>
                      <p className={`font-semibold ${phase.color}`}>{phase.phase}</p>
                      <p className="text-sm text-muted-foreground mt-1">{phase.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Buildings & Scoring */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Map className="h-6 w-6 text-green-400" />
            {isKorean ? '맵 건물 & 점령 포인트' : 'Công trình & Điểm chiếm'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mapBuildings.map((building, idx) => {
              const Icon = building.icon;
              return (
                <Card key={idx} className={`${building.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`h-5 w-5 ${building.color}`} />
                      <span className={`font-bold ${building.color}`}>{building.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs">x{building.count}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isKorean ? '첫 점령' : 'Chiếm đầu'}</span>
                        <span className="font-mono text-highlight">{building.firstCapture}</span>
                      </div>
                      {building.perMinute !== '-' && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isKorean ? '분당' : '/phút'}</span>
                          <span className="font-mono">{building.perMinute}</span>
                        </div>
                      )}
                      {building.sustain !== '-' && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isKorean ? '유지 보너스' : 'Giữ bonus'}</span>
                          <span className="font-mono">{building.sustain}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <strong>{isKorean ? '효과:' : 'Hiệu ứng:'}</strong> {building.effect}
                        </p>
                        <Badge variant="outline" className={`mt-2 text-xs ${building.color}`}>
                          {building.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Canyon Boss */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="h-6 w-6 text-purple-400" />
            {canyonBoss.name}
          </h2>
          <Card className="border-purple-500/30 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>{isKorean ? '스폰 시간:' : 'Spawn:'}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {canyonBoss.spawnTimes.map((spawn, idx) => (
                      <Badge key={idx} variant="outline" className="text-purple-400 border-purple-400/30">
                        {spawn.phase}: {spawn.time}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>{isKorean ? '최고 데미지 연맹 버프:' : 'Buff cho LM damage cao nhất:'}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {canyonBoss.buffs.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-purple-400 border-purple-400/30">
                        {item.icon} {item.buff}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground border-t border-purple-500/20 pt-3">
                  {isKorean
                    ? '⚠️ 보스 처치 시 가장 많은 데미지를 입힌 연맹이 버프를 획득합니다. 연맹 전체가 집중 공격해야 합니다!'
                    : '⚠️ LM gây damage cao nhất khi hạ boss nhận buff. Cả LM phải tập trung tấn công!'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Phase Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-red-400" />
            {isKorean ? '단계별 전략' : 'Chiến lược theo giai đoạn'}
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-green-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  {isKorean ? '초반 (0-15분)' : 'Đầu game (0-15p)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {phaseTips.early.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  {isKorean ? '중반 (15-25분)' : 'Giữa game (15-25p)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {phaseTips.mid.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-yellow-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  {isKorean ? '후반 (25-40분)' : 'Cuối game (25-40p)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {phaseTips.late.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            {isKorean ? '개인 보상 (포인트 기준)' : 'Thưởng cá nhân (theo điểm)'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {personalRewards.map((reward, idx) => (
              <Card key={idx} className={idx === 2 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold ${idx === 2 ? 'text-highlight' : ''}`}>
                    {reward.points}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{reward.rewards}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {isKorean
              ? '※ 연맹 승리 시 추가 프리미엄 상자, 가속, 보너스 획득'
              : '※ LM thắng nhận thêm hộp premium, speedup, bonus'}
          </p>
        </section>

        {/* General Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '필수 팁' : 'Mẹo cần thiết'}</h2>
          <div className="grid gap-3">
            {generalTips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important Warning */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '핵심 원칙' : 'Nguyên tắc cốt lõi'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '협곡쟁탈전은 개인 파워보다 팀워크가 훨씬 중요합니다. 무리한 단독 공격으로 병력을 잃으면 회복에 오랜 시간이 걸립니다. 연맹 지휘에 따른 조율된 움직임이 승리의 핵심입니다.'
                    : 'Canyon Clash teamwork quan trọng hơn sức mạnh cá nhân rất nhiều. Mất quân do tấn công liều lĩnh mất nhiều thời gian hồi phục. Di chuyển phối hợp theo chỉ huy LM là chìa khóa chiến thắng.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
