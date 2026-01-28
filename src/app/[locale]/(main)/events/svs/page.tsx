import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Globe, Trophy, Target, Shield, Lightbulb, AlertTriangle, Calendar, Swords, Map, Users } from 'lucide-react';

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

  const schedule = [
    {
      phase: isKorean ? 'State Ruler 준비' : 'State Ruler Prep',
      days: isKorean ? '일요일 ~ 금요일' : 'Chủ nhật ~ Thứ 6',
      description: isKorean
        ? '일반 게임플레이로 포인트 적립, 침략자/방어자 역할 결정'
        : 'Tích điểm qua gameplay thường, quyết định vai trò xâm lược/phòng thủ',
      color: 'text-blue-400',
    },
    {
      phase: 'Capital Clash',
      days: isKorean ? '토요일' : 'Thứ 7',
      description: isKorean
        ? '1~2시간 메인 전투 - 프리뷰 → 경쟁 → 정산'
        : 'Trận chiến chính 1-2 tiếng - Preview → Contest → Final',
      color: 'text-red-400',
    },
  ];

  const mapZones = [
    { name: isKorean ? '중앙 캐피탈' : 'Central Capital', desc: isKorean ? '최고 점령 가치' : 'Giá trị chiếm cao nhất', color: 'text-yellow-400' },
    { name: isKorean ? '4개 터렛' : '4 Turrets', desc: isKorean ? '캐피탈 구역에 로켓 공격' : 'Tấn công rocket vào khu capital', color: 'text-red-400' },
    { name: isKorean ? '갈색 더트존' : 'Brown Dirt Zone', desc: isKorean ? 'HQ 배치 가능 전투 구역' : 'Khu chiến đấu có thể đặt HQ', color: 'text-orange-400' },
    { name: isKorean ? '쉴드 존' : 'Shield Zone', desc: isKorean ? '재정비용 안전 구역' : 'Khu an toàn để tái tập hợp', color: 'text-green-400' },
  ];

  const pointMethods = [
    { activity: isKorean ? '연맹 대결 1위' : 'Alliance Duel 1st', points: '6,000', note: isKorean ? '조기 조율 추천' : 'Khuyến nghị phối hợp sớm' },
    { activity: isKorean ? '아레나 챔피언' : 'Arena Champion', points: '20,000', note: isKorean ? '리셋 전 영웅 최대화' : 'Max hero trước reset' },
    { activity: isKorean ? '적 트럭 습격' : 'Raid Enemy Truck', points: '100/회', note: isKorean ? '저위험 스팸 공격' : 'Spam đánh rủi ro thấp' },
    { activity: isKorean ? 'Full Prep 승리' : 'Full Prep Win', points: '500', note: isKorean ? '건설/훈련 스택' : 'Stack xây/HL' },
    { activity: isKorean ? '연맹 대결 승리' : 'AD Victory', points: '30,000', note: isKorean ? '서버 전체 조율' : 'Phối hợp toàn server' },
    { activity: isKorean ? '퓨리로드 Top 200' : 'Furylord Top 200', points: '~30,000', note: isKorean ? '이벤트 푸시 필요' : 'Cần push event' },
    { activity: isKorean ? '약한 HQ 파괴 (침략)' : 'Destroy Low HQ', points: '50,000/회', note: isKorean ? 'Lv.20-24 HQ 스나이프' : 'Snipe HQ Lv.20-24' },
    { activity: isKorean ? '탱크 vs 트럭 전투' : 'Tank vs Truck', points: '30-60,000', note: isKorean ? '트럭을 미끼로 배치' : 'Đặt truck làm mồi' },
    { activity: isKorean ? '아군 지원' : 'Reinforce Ally', points: '20-50,000', note: isKorean ? '적 손실 시 획득' : 'Được khi địch mất quân' },
    { activity: isKorean ? '랠리 참여' : 'Rally/Join Attack', points: '100,000+', note: isKorean ? '엘리트 조율 필요' : 'Cần phối hợp elite' },
  ];

  const boxRewards = [
    { boxes: '1-3', rewards: isKorean ? '자원, 소량 다이아' : 'Tài nguyên, ít diamond' },
    { boxes: '4-6', rewards: isKorean ? '오렌지 스킬북, 뱃지 합금' : 'Orange skill book, badge alloy' },
    { boxes: '7-9', rewards: isKorean ? '~45,000 Valor Medals' : '~45,000 Valor Medals' },
  ];

  const f2pStrategy = [
    { step: 1, action: isKorean ? '전날: HQ를 갈색 더트존으로 이동 (Lv.24+ 권장)' : 'Hôm trước: Di chuyển HQ tới Brown Dirt (Lv.24+ khuyến nghị)' },
    { step: 2, action: isKorean ? '시작: 아군 지원 최대화, TvT 전투 참여' : 'Bắt đầu: Tối đa hỗ trợ đồng minh, tham gia TvT' },
    { step: 3, action: isKorean ? '중반: 저레벨 HQ 5~10개 스나이프' : 'Giữa: Snipe 5-10 HQ cấp thấp' },
    { step: 4, action: isKorean ? '마무리: 캐피탈 랠리 참여로 버스트 포인트' : 'Cuối: Tham gia rally capital để burst điểm' },
  ];

  const tips = [
    isKorean
      ? '활발한 연맹 가입 필수 - R5+ 힐러가 게임 체인저'
      : 'Bắt buộc vào LM hoạt động - R5+ healer là game-changer',
    isKorean
      ? '병력 지속 훈련, 가속으로 대기열 스택'
      : 'Huấn luyện quân liên tục, dùng speedup stack hàng đợi',
    isKorean
      ? '힐, 텔레포트, 자원 비축 - 적 서버 정찰'
      : 'Dự trữ heal, teleport, tài nguyên - trinh sát server địch',
    isKorean
      ? '원시 파워보다 적극적 참여가 중요'
      : 'Tích cực tham gia quan trọng hơn sức mạnh thô',
    isKorean
      ? 'Lv.24 HQ는 여러 공격자 필요 - 방어자 유리'
      : 'HQ Lv.24 cần nhiều kẻ tấn công - có lợi cho phòng thủ',
    isKorean
      ? 'Valor Medals로 블랙마켓 오렌지 장비 교환 - 최고 가치!'
      : 'Đổi trang bị cam Black Market bằng Valor Medals - giá trị nhất!',
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
            <Globe className="h-8 w-8 text-highlight" />
            {isKorean ? 'SVS (Server vs Server) 완벽 가이드' : 'Hướng dẫn đầy đủ SVS'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '2주마다 열리는 SVS의 일정, 전략, 보상을 알아봅니다.'
              : 'Tìm hiểu lịch, chiến thuật, phần thưởng SVS mỗi 2 tuần.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '2주 주기: State Ruler(일~금) + Capital Clash(토)' : '2 tuần: State Ruler (CN~T6) + Capital Clash (T7)'}</li>
              <li>• {isKorean ? '9박스 풀 해금 = ~45,000 Valor Medals (블랙마켓 오렌지 장비)' : 'Mở đủ 9 hộp = ~45,000 Valor Medals (trang bị cam Black Market)'}</li>
              <li>• {isKorean ? '팀워크 > 개인 파워 - 연맹 조율이 핵심' : 'Teamwork > Sức mạnh cá nhân - phối hợp LM là chìa khóa'}</li>
              <li>• {isKorean ? 'F2P도 10-30분 전략으로 박스 러시 가능' : 'F2P cũng có thể rush box với chiến thuật 10-30 phút'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Schedule */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            {isKorean ? '일정 (2주 주기)' : 'Lịch (Chu kỳ 2 tuần)'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {schedule.map((phase, idx) => (
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

        {/* Map Zones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Map className="h-6 w-6" />
            {isKorean ? 'Capital Clash 맵 구역' : 'Khu vực bản đồ Capital Clash'}
          </h2>
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

        {/* Point Scoring */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            {isKorean ? '포인트 획득 방법' : 'Cách lấy điểm'}
          </h2>
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
                    {pointMethods.map((method, idx) => (
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

        {/* Box Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            {isKorean ? '9박스 보상' : 'Phần thưởng 9 hộp'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {boxRewards.map((box, idx) => (
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
              ? '※ 같은 기간 Alliance VS에서 추가 9박스 획득 가능'
              : '※ Có thể nhận thêm 9 hộp từ Alliance VS cùng thời gian'}
          </p>
        </section>

        {/* F2P Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            {isKorean ? 'F2P 전략 (10-30분 박스 러시)' : 'Chiến thuật F2P (Rush box 10-30 phút)'}
          </h2>
          <Card className="border-highlight/30">
            <CardContent className="p-4">
              <div className="space-y-3">
                {f2pStrategy.map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-sm font-bold">
                      {s.step}
                    </span>
                    <p className="text-sm text-muted-foreground">{s.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Warning */}
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
                    ? '"많은 경험자들이 동의: SVS는 개인 파워보다 팀워크를 더 보상합니다." 무리한 단독 공격으로 병력을 잃으면 회복에 오랜 시간이 걸립니다.'
                    : '"Nhiều người chơi giàu kinh nghiệm đồng ý: SVS thưởng teamwork hơn sức mạnh thô." Mất quân do tấn công liều lĩnh đơn độc sẽ mất nhiều thời gian hồi phục.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '전략 팁' : 'Mẹo chiến thuật'}</h2>
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
