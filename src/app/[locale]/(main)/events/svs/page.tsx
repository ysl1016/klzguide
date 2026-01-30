import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Globe, Trophy, Target, Shield, Lightbulb, AlertTriangle, Calendar, Swords, Map, Users, Zap, Building, Heart } from 'lucide-react';

export default async function SVSPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SVSContent locale={locale} />;
}

function SVSContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // State Ruler + Capital Clash Schedule
  const svsSchedule = [
    {
      phase: isKorean ? 'State Ruler 준비' : 'State Ruler Prep',
      days: isKorean ? '일요일 ~ 금요일' : 'Chủ nhật ~ Thứ 6',
      description: isKorean
        ? '경쟁 이벤트로 포인트 적립. 누적 점수로 침략자/방어자 결정'
        : 'Tích điểm qua các event cạnh tranh. Điểm tích lũy quyết định vai trò xâm lược/phòng thủ',
      color: 'text-blue-400',
    },
    {
      phase: 'Capital Clash',
      days: isKorean ? '토요일' : 'Thứ 7',
      description: isKorean
        ? '서버 대전 본전투. 프리뷰 → 경쟁(점령) → 정산 단계'
        : 'Trận chiến chính SVS. Preview → Contest (chiếm) → Phần thưởng',
      color: 'text-red-400',
    },
  ];

  // State Ruler Point Methods
  const stateRulerPoints = [
    { activity: isKorean ? '연맹 대결 1위' : 'Alliance Duel 1st', points: '6,000', note: isKorean ? '개인 포인트' : 'Điểm cá nhân' },
    { activity: isKorean ? '전면전비 챔피언' : 'Full Prep Champion', points: '500', note: isKorean ? '개인 포인트' : 'Điểm cá nhân' },
    { activity: isKorean ? '아레나 챔피언' : 'Arena Champion', points: '20,000', note: isKorean ? '개인 포인트' : 'Điểm cá nhân' },
    { activity: isKorean ? '적 트럭 약탈 성공' : 'Plunder Enemy Truck', points: '100', note: isKorean ? '회당' : 'Mỗi lần' },
    { activity: isKorean ? '연맹 대결 승리' : 'AD Victory', points: '30,000', note: isKorean ? '연맹 포인트' : 'Điểm LM' },
    { activity: isKorean ? '난폭 두목 Top 200 데미지' : 'Furylord Top 200 Damage', points: '~30,000', note: isKorean ? '1위 기준' : 'Top 1' },
  ];

  // Capital Clash Point Methods
  const capitalClashPoints = [
    { activity: isKorean ? '캐피탈 구역 TvT 전투' : 'Capital Area TVT Combat', points: isKorean ? '최고 배율' : 'Highest multiplier', note: isKorean ? '핵심 포인트원' : 'Nguồn điểm chính' },
    { activity: isKorean ? '터렛 구역 전투' : 'Turret Zone Combat', points: isKorean ? '높은 배율' : 'High multiplier', note: isKorean ? '아군 사망도 포인트' : 'Quân chết cũng có điểm' },
    { activity: isKorean ? '저레벨 적 HQ 파괴' : 'Destroy Low-level Enemy HQ', points: '50,000+', note: isKorean ? 'Lv.20-24 HQ 스나이프' : 'Snipe HQ Lv.20-24' },
    { activity: isKorean ? '랠리 공격 참여' : 'Rally Attack', points: '100,000+', note: isKorean ? '조율된 공격' : 'Tấn công phối hợp' },
    { activity: isKorean ? '아군 지원' : 'Reinforce Ally', points: '20-50,000', note: isKorean ? '방어 시 적 손실분 획득' : 'Được điểm khi địch mất quân' },
  ];

  // Matchmaking System
  const matchmaking = [
    { round: isKorean ? '1라운드' : 'Round 1', desc: isKorean ? '4개 서버 랜덤 대진 → 승자/패자 결정' : '4 server bốc thăm ngẫu nhiên → Thắng/Thua' },
    { round: isKorean ? '2라운드' : 'Round 2', desc: isKorean ? '승자 vs 승자 (1,2위), 패자 vs 패자 (3,4위)' : 'Thắng vs Thắng (1,2), Thua vs Thua (3,4)' },
  ];

  // Capital Clash Map Zones
  const mapZones = [
    { name: isKorean ? '중앙 캐피탈' : 'Central Capital', desc: isKorean ? '100% 점령 시 승리. 최고 가치 구역' : 'Chiếm 100% thắng. Khu giá trị cao nhất', color: 'text-yellow-400' },
    { name: isKorean ? '4개 터렛' : '4 Turrets', desc: isKorean ? '캐피탈에 로켓 지원 공격' : 'Hỗ trợ rocket vào capital', color: 'text-red-400' },
    { name: isKorean ? '갈색 더트존' : 'Brown Dirt Zone', desc: isKorean ? 'HQ 배치 가능한 전투 구역' : 'Khu có thể đặt HQ chiến đấu', color: 'text-orange-400' },
    { name: isKorean ? '쉴드 존' : 'Shield Zone', desc: isKorean ? '재정비를 위한 안전 구역' : 'Khu an toàn để hồi phục', color: 'text-green-400' },
  ];

  // Canyon Clash Schedule
  const canyonSchedule = [
    { day: isKorean ? '월~화' : 'T2-T3', activity: isKorean ? '투표' : 'Vote', desc: isKorean ? '연맹원 참여 시간 투표' : 'Thành viên vote thời gian' },
    { day: isKorean ? '수요일' : 'T4', activity: isKorean ? '등록' : 'Register', desc: isKorean ? '연맹장/R4가 등록' : 'LM trưởng/R4 đăng ký' },
    { day: isKorean ? '목요일' : 'T5', activity: isKorean ? '매칭' : 'Matchmaking', desc: isKorean ? '상위 30명 전투력 기준 매칭' : 'Matching theo CP top 30' },
    { day: isKorean ? '금요일' : 'T6', activity: isKorean ? '전투' : 'Battle', desc: isKorean ? '1시간 전투 (준비 10분 + 본전투 40분)' : '1 tiếng (10p chuẩn bị + 40p chiến đấu)' },
  ];

  // Canyon Clash Scoring
  const canyonScoring = [
    { target: isKorean ? '야전 병원 (x2)' : 'Field Hospital (x2)', first: '1,800', perMin: '50', sustained: '1,200' },
    { target: isKorean ? '정수 시설' : 'Water Refinery', first: '900', perMin: '50', sustained: '600' },
    { target: isKorean ? '군사 기지 (x2)' : 'Military Base (x2)', first: '2,700', perMin: '300', sustained: '1,800' },
    { target: isKorean ? '에너지 스테이션' : 'Energy Station', first: isKorean ? '셀 반환당 100,000' : '100,000/cell', perMin: '-', sustained: '-' },
  ];

  // Canyon Clash Boss
  const canyonBoss = {
    name: isKorean ? '협곡 대장 (Canyon Captain)' : 'Canyon Captain (Boss)',
    spawnTimes: isKorean ? '5분, 15분, 25분' : 'Phút 5, 15, 25',
    buffs: [
      isKorean ? '+50% 행군 속도' : '+50% March Speed',
      isKorean ? '+50% 포인트 획득' : '+50% Points',
      isKorean ? '+40% 데미지' : '+40% Damage',
    ],
  };

  // SVS Box Rewards
  const svsBoxRewards = [
    { boxes: '1-3', rewards: isKorean ? '자원, 소량 다이아' : 'Tài nguyên, ít diamond' },
    { boxes: '4-6', rewards: isKorean ? '오렌지 스킬북, 배지 합금' : 'Orange skill book, badge alloy' },
    { boxes: '7-9', rewards: isKorean ? '~45,000 Valor Medals' : '~45,000 Valor Medals' },
  ];

  // Canyon Clash Rewards
  const canyonRewards = {
    personal: isKorean ? '150,000+ 포인트: 최대 15,000 Valor Medals + 500 오렌지 스킬북' : '150,000+ điểm: tối đa 15,000 Valor Medals + 500 Orange Skill Book',
    alliance: isKorean ? '승리 시: 프리미엄 상자, 가속, 추가 보너스' : 'Thắng: Hộp premium, speedup, bonus',
  };

  // Tips
  const svsTips = [
    isKorean ? '2.25M 포인트로 9박스 풀 해금 → 45,000 Valor Medals' : '2.25M điểm mở 9 hộp → 45,000 Valor Medals',
    isKorean ? '팀워크 > 개인 파워 - 연맹 조율이 핵심' : 'Teamwork > Sức mạnh cá nhân - phối hợp LM là chính',
    isKorean ? '방어자: 캐피탈 구역 TvT 집중' : 'Phòng thủ: Tập trung TVT khu capital',
    isKorean ? '침략자: 저레벨 적 HQ 스나이프로 쉬운 포인트' : 'Xâm lược: Snipe HQ thấp để lấy điểm dễ',
    isKorean ? '100% 점령 못하면 점령률 높은 서버 승리' : 'Không chiếm 100% thì % cao hơn thắng',
    isKorean ? 'Valor Medals로 블랙마켓 오렌지 장비 구매 - 최고 가치!' : 'Mua trang bị cam Black Market bằng Valor Medals - giá trị nhất!',
  ];

  const canyonTips = [
    isKorean ? '자격: 서버 TOP 20 연맹 (40명+), 가입 24시간 이상' : 'Điều kiện: Top 20 LM server (40+), gia nhập 24h+',
    isKorean ? '초반: 병원/정수시설 확보 → 힐링/모멘텀 유지' : 'Đầu game: Chiếm bệnh viện/nhà máy nước → duy trì heal/momentum',
    isKorean ? '중반: 군사 기지 점령 → 데미지 버프 획득' : 'Giữa game: Chiếm căn cứ quân sự → buff damage',
    isKorean ? '후반: 에너지 셀 운반 작전 집중 - 셀 캐리어 보호 필수!' : 'Cuối game: Tập trung vận chuyển energy cell - bảo vệ carrier!',
    isKorean ? '보스: 5/15/25분에 스폰 - 최고 데미지 연맹이 버프 획득' : 'Boss: Spawn 5/15/25 phút - LM damage cao nhất nhận buff',
    isKorean ? '텔레포트 쿨타임 3분 - 측면 공격/방어에 적극 활용' : 'Cooldown teleport 3 phút - dùng tích cực để đánh cạnh sườn',
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
              20 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Globe className="h-8 w-8 text-highlight" />
            {isKorean ? 'SVS & 협곡쟁탈전 완벽 가이드' : 'Hướng dẫn đầy đủ SVS & Canyon Clash'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '서버 대전(State Ruler + Capital Clash)과 협곡쟁탈전(Canyon Clash)의 규칙, 전략, 보상을 상세히 알아봅니다.'
              : 'Tìm hiểu chi tiết về SVS (State Ruler + Capital Clash) và Canyon Clash.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>SVS</strong>: {isKorean ? '2주 주기, State Ruler(일~금) + Capital Clash(토)' : '2 tuần, State Ruler (CN~T6) + Capital Clash (T7)'}</li>
              <li>• <strong>Canyon Clash</strong>: {isKorean ? '금요일, 연맹 대 연맹 1시간 전투' : 'Thứ 6, LM vs LM trận chiến 1 tiếng'}</li>
              <li>• {isKorean ? 'SVS 9박스 = 2.25M 포인트 → ~45,000 Valor Medals' : 'SVS 9 hộp = 2.25M điểm → ~45,000 Valor Medals'}</li>
              <li>• {isKorean ? 'Canyon Clash 150K+ 포인트 → 최대 15,000 Valor Medals + 500 오렌지 스킬북' : 'Canyon Clash 150K+ điểm → tối đa 15,000 Valor Medals + 500 Orange Skill Book'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* ===== SECTION: SVS (State Ruler + Capital Clash) ===== */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Swords className="h-7 w-7 text-red-400" />
            {isKorean ? 'SVS (Server vs Server)' : 'SVS (Server vs Server)'}
          </h2>

          {/* SVS Schedule */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {isKorean ? '일정 (2주 주기)' : 'Lịch (Chu kỳ 2 tuần)'}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {svsSchedule.map((phase, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-bold ${phase.color}`}>{phase.phase}</span>
                      <Badge variant="outline">{phase.days}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Matchmaking */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" />
              {isKorean ? '매칭 시스템 (4서버 토너먼트)' : 'Hệ thống Matchmaking (4 server tournament)'}
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {matchmaking.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Badge variant="outline" className="shrink-0">{m.round}</Badge>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                    {isKorean ? '※ 모든 서버가 2경기 진행. 탈락 없음.' : '※ Tất cả server chơi 2 trận. Không bị loại.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* State Ruler Points */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isKorean ? 'State Ruler 포인트 획득 (일~금)' : 'Điểm State Ruler (CN~T6)'}
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-2">{isKorean ? '활동' : 'Hoạt động'}</th>
                        <th className="text-right p-2">{isKorean ? '포인트' : 'Điểm'}</th>
                        <th className="text-left p-2">{isKorean ? '비고' : 'Ghi chú'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateRulerPoints.map((method, idx) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="p-2">{method.activity}</td>
                          <td className="text-right p-2 font-mono text-highlight">{method.points}</td>
                          <td className="p-2 text-xs text-muted-foreground">{method.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Capital Clash Map */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Map className="h-5 w-5" />
              {isKorean ? 'Capital Clash 맵 구역 (토요일)' : 'Khu vực Capital Clash (T7)'}
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {mapZones.map((zone, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <div className={`h-3 w-3 rounded-full ${zone.color.replace('text-', 'bg-')}`}></div>
                      <div>
                        <p className={`font-semibold text-sm ${zone.color}`}>{zone.name}</p>
                        <p className="text-xs text-muted-foreground">{zone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Capital Clash Points */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isKorean ? 'Capital Clash 포인트 획득 (토요일)' : 'Điểm Capital Clash (T7)'}
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-2">{isKorean ? '활동' : 'Hoạt động'}</th>
                        <th className="text-right p-2">{isKorean ? '포인트' : 'Điểm'}</th>
                        <th className="text-left p-2">{isKorean ? '비고' : 'Ghi chú'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capitalClashPoints.map((method, idx) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="p-2">{method.activity}</td>
                          <td className="text-right p-2 font-mono text-highlight">{method.points}</td>
                          <td className="p-2 text-xs text-muted-foreground">{method.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SVS Rewards */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {isKorean ? 'SVS 9박스 보상' : 'Phần thưởng 9 hộp SVS'}
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {svsBoxRewards.map((box, idx) => (
                <Card key={idx} className={idx === 2 ? 'border-highlight/50 bg-highlight/5' : ''}>
                  <CardContent className="p-4 text-center">
                    <p className={`text-2xl font-bold ${idx === 2 ? 'text-highlight' : ''}`}>
                      {isKorean ? `${box.boxes}번` : `Hộp ${box.boxes}`}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{box.rewards}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {isKorean
                ? '※ 9박스 풀 해금: 2.25M 포인트 필요. Alliance VS에서 추가 9박스 획득 가능'
                : '※ Mở 9 hộp: cần 2.25M điểm. Có thể nhận thêm 9 hộp từ Alliance VS'}
            </p>
          </section>

          {/* SVS Tips */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold">{isKorean ? 'SVS 전략 팁' : 'Mẹo SVS'}</h3>
            <div className="grid gap-3">
              {svsTips.map((tip, idx) => (
                <div key={idx} className="info-tip flex gap-3">
                  <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== SECTION: Canyon Clash ===== */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <Building className="h-7 w-7 text-orange-400" />
            {isKorean ? '협곡쟁탈전 (Canyon Clash)' : 'Canyon Clash'}
          </h2>

          {/* Canyon Overview */}
          <Card className="border-orange-500/30 bg-orange-500/5 mb-8">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                {isKorean
                  ? '협곡쟁탈전은 Capital Clash 이후 금요일에 열리는 연맹 대 연맹 이벤트입니다. 서버 상위 연맹끼리 1시간 동안 전용 맵에서 전투합니다. 건물 점령, 보스 처치, 에너지 셀 운반으로 포인트를 획득합니다.'
                  : 'Canyon Clash là sự kiện LM vs LM vào thứ 6 sau Capital Clash. Top LM trong server chiến đấu 1 tiếng trên bản đồ riêng. Lấy điểm bằng chiếm công trình, đánh boss, vận chuyển energy cell.'}
              </p>
            </CardContent>
          </Card>

          {/* Canyon Schedule */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {isKorean ? '주간 일정' : 'Lịch tuần'}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {canyonSchedule.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 text-center">
                    <Badge variant="outline" className="mb-2">{item.day}</Badge>
                    <p className="font-semibold text-orange-400">{item.activity}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Canyon Eligibility */}
          <Card className="border-yellow-500/30 bg-yellow-500/5 mb-8">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-400 mb-1">
                    {isKorean ? '참가 자격' : 'Điều kiện tham gia'}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {isKorean ? '서버 전투력 TOP 20 연맹' : 'Top 20 LM theo sức mạnh server'}</li>
                    <li>• {isKorean ? '연맹원 40명 이상' : '40+ thành viên LM'}</li>
                    <li>• {isKorean ? '가입 후 24시간 이상 경과' : 'Gia nhập 24h+ trước'}</li>
                    <li>• {isKorean ? '15명 이상 신청' : '15+ người đăng ký'}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canyon Scoring */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isKorean ? '점령 포인트 (연맹 기준)' : 'Điểm chiếm (theo LM)'}
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-2">{isKorean ? '목표' : 'Mục tiêu'}</th>
                        <th className="text-right p-2">{isKorean ? '첫 점령' : 'Chiếm đầu'}</th>
                        <th className="text-right p-2">{isKorean ? '분당' : '/phút'}</th>
                        <th className="text-right p-2">{isKorean ? '유지 보너스' : 'Giữ bonus'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {canyonScoring.map((item, idx) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="p-2">{item.target}</td>
                          <td className="text-right p-2 font-mono text-highlight">{item.first}</td>
                          <td className="text-right p-2 font-mono">{item.perMin}</td>
                          <td className="text-right p-2 font-mono">{item.sustained}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Canyon Boss */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {canyonBoss.name}
            </h3>
            <Card className="border-purple-500/30 bg-purple-500/5">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>{isKorean ? '스폰 시간:' : 'Spawn:'}</strong> {canyonBoss.spawnTimes}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{isKorean ? '최고 데미지 연맹 버프:' : 'Buff cho LM damage cao nhất:'}</strong>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {canyonBoss.buffs.map((buff, idx) => (
                      <Badge key={idx} variant="outline" className="text-purple-400 border-purple-400/30">
                        {buff}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Canyon Rewards */}
          <section className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {isKorean ? '협곡쟁탈전 보상' : 'Phần thưởng Canyon Clash'}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-orange-400">{isKorean ? '개인 보상' : 'Thưởng cá nhân'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{canyonRewards.personal}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-orange-400">{isKorean ? '연맹 보상' : 'Thưởng LM'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{canyonRewards.alliance}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Canyon Tips */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold">{isKorean ? '협곡쟁탈전 전략 팁' : 'Mẹo Canyon Clash'}</h3>
            <div className="grid gap-3">
              {canyonTips.map((tip, idx) => (
                <div key={idx} className="info-tip flex gap-3">
                  <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

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
                    ? 'SVS와 협곡쟁탈전 모두 개인 파워보다 팀워크가 더 큰 보상을 줍니다. 무리한 단독 공격으로 병력을 잃으면 회복에 오랜 시간이 걸립니다. 연맹과 조율된 전략적 참여가 성공의 핵심입니다.'
                    : 'Cả SVS và Canyon Clash đều thưởng teamwork hơn sức mạnh cá nhân. Mất quân do tấn công liều lĩnh mất nhiều thời gian hồi phục. Tham gia chiến thuật phối hợp với LM là chìa khóa thành công.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
