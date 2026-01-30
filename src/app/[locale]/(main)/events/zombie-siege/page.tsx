import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Shield, Lightbulb, AlertTriangle, Waves, Wrench, Zap, Home, Calendar } from 'lucide-react';

export default async function ZombieSiegePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ZombieSiegeContent locale={locale} />;
}

function ZombieSiegeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const eventInfo = [
    {
      label: isKorean ? '총 웨이브' : 'Tổng wave',
      value: '30',
      unit: isKorean ? '웨이브' : 'wave',
    },
    {
      label: isKorean ? '총 시간' : 'Tổng thời gian',
      value: '1h 45m',
      unit: '',
    },
    {
      label: isKorean ? '일정' : 'Lịch',
      value: isKorean ? '월/화요일' : 'T2/T3',
      unit: '',
    },
    {
      label: 'War Frenzy',
      value: '10',
      unit: isKorean ? '분마다' : 'phút/lần',
    },
  ];

  const phases = [
    {
      waves: '1-10',
      difficulty: isKorean ? '쉬움' : 'Dễ',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean ? '워밍업 단계, 대부분의 플레이어가 처리 가능' : 'Giai đoạn khởi động, hầu hết người chơi xử lý được',
    },
    {
      waves: '11-20',
      difficulty: isKorean ? '보통' : 'Trung bình',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '난이도 상승, 협력 필요' : 'Độ khó tăng, cần hợp tác',
    },
    {
      waves: '21-30',
      difficulty: isKorean ? '어려움' : 'Khó',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      desc: isKorean ? '최고 난이도, 연맹 전체 협력 필수' : 'Độ khó cao nhất, cần hợp tác toàn LM',
    },
  ];

  const tips = [
    isKorean
      ? 'R4/R5만 이벤트 시작 가능 - 시작 시간 미리 연맹 채팅으로 공지'
      : 'Chỉ R4/R5 mới bắt đầu được - thông báo thời gian qua chat LM',
    isKorean
      ? '다이아로 수리 금지! 이벤트 후 무료 수리됨'
      : 'KHÔNG sửa bằng diamond! Sửa miễn phí sau sự kiện',
    isKorean
      ? '부대 미리 본부(HQ)로 소환 - 다른 활동 중이면 참여 불가'
      : 'Triệu hồi quân về HQ trước - quân đang hoạt động không tham gia được',
    isKorean
      ? 'War Frenzy(10분마다)에 집중 공격 - 추가 데미지와 보너스'
      : 'Tập trung tấn công khi War Frenzy (10 phút/lần) - damage và bonus thêm',
    isKorean
      ? '렌치 보상으로 연맹 대결 차량 개조 가능'
      : 'Thưởng cờ lê dùng để cải tạo xe trong AD',
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
            <Shield className="h-8 w-8 text-green-400" />
            {isKorean ? '좀비공성 (Zombie Siege) 가이드' : 'Hướng dẫn Zombie Siege'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '30웨이브 연맹 방어 이벤트입니다. 렌치 획득의 주요 콘텐츠입니다.'
              : 'Sự kiện phòng thủ LM 30 wave. Nội dung chính để lấy cờ lê.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '30웨이브, 총 1시간 45분 소요' : '30 wave, tổng 1 tiếng 45 phút'}</li>
              <li>• {isKorean ? '일정: 월/화요일 (R4/R5만 시작 가능)' : 'Lịch: T2/T3 (chỉ R4/R5 bắt đầu được)'}</li>
              <li>• {isKorean ? '보상: 렌치 (연맹 대결 차량 개조용)' : 'Thưởng: Cờ lê (cải tạo xe AD)'}</li>
              <li>• {isKorean ? '다이아로 수리 금지 - 이벤트 후 무료 수리!' : 'KHÔNG sửa bằng diamond - sửa miễn phí sau!'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Event Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-highlight" />
            {isKorean ? '이벤트 정보' : 'Thông tin sự kiện'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventInfo.map((info, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-2xl font-bold text-highlight mt-1">
                    {info.value}
                    {info.unit && <span className="text-sm font-normal text-muted-foreground ml-1">{info.unit}</span>}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Wave Phases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-400" />
            {isKorean ? '웨이브 단계' : 'Giai đoạn wave'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {phases.map((phase, idx) => (
              <Card key={idx} className={`${phase.bg} border-none`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${phase.color}`}>Wave {phase.waves}</span>
                    <Badge variant="outline" className={phase.color}>{phase.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{phase.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* War Frenzy */}
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-red-400 shrink-0" />
              <div>
                <p className="font-semibold text-red-400 mb-1">
                  War Frenzy
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '10분마다 War Frenzy가 활성화됩니다. 이 시간에 공격하면 추가 데미지와 보너스 포인트를 획득할 수 있습니다. War Frenzy 시간에 집중적으로 공격하세요.'
                    : 'War Frenzy kích hoạt mỗi 10 phút. Tấn công lúc này được damage và điểm bonus thêm. Tập trung tấn công khi War Frenzy.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-orange-400" />
            {isKorean ? '보상' : 'Phần thưởng'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  {isKorean
                    ? '주요 보상은 렌치(Wrench)입니다. 렌치는 연맹 대결에서 차량을 개조하는 데 사용됩니다.'
                    : 'Phần thưởng chính là cờ lê (Wrench). Cờ lê dùng để cải tạo xe trong Alliance Duel.'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <p className="font-semibold text-orange-400">{isKorean ? '렌치' : 'Cờ lê'}</p>
                    <p className="text-xs">{isKorean ? '연맹 대결 차량 개조용' : 'Cải tạo xe Alliance Duel'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="font-semibold text-purple-400">{isKorean ? '추가 보상' : 'Thưởng thêm'}</p>
                    <p className="text-xs">{isKorean ? '웨이브 클리어 마일스톤' : 'Milestone clear wave'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Preparation */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Home className="h-6 w-6 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-blue-400 mb-1">
                  {isKorean ? '사전 준비' : 'Chuẩn bị'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '이벤트 시작 전 부대를 본부(HQ)로 소환' : 'Triệu hồi quân về HQ trước sự kiện'}</li>
                  <li>• {isKorean ? '다른 활동(채집, 좀비 처치 등) 완료 후 대기' : 'Hoàn thành hoạt động khác (thu thập, zombie, v.v.) rồi chờ'}</li>
                  <li>• {isKorean ? 'R4/R5가 시작 시간을 연맹 채팅으로 공지' : 'R4/R5 thông báo thời gian bắt đầu qua chat LM'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '핵심 주의사항' : 'Lưu ý quan trọng'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '다이아로 부대 수리 금지! 이벤트 종료 후 무료 수리됨' : 'KHÔNG sửa quân bằng diamond! Sửa miễn phí sau sự kiện'}</li>
                  <li>• {isKorean ? 'R4/R5만 이벤트 시작 가능 - 일반 연맹원은 참여만' : 'Chỉ R4/R5 bắt đầu được - thành viên thường chỉ tham gia'}</li>
                  <li>• {isKorean ? '1시간 45분 전체 참여가 이상적 - 중간 이탈 시 보상 감소' : 'Tham gia đủ 1h45m lý tưởng - rời giữa chừng giảm thưởng'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
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
