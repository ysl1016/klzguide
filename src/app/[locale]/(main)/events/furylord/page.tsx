import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Target, Lightbulb, AlertTriangle, Fuel, Trophy, Users, Zap } from 'lucide-react';

export default async function FurylordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FurylordContent locale={locale} />;
}

function FurylordContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const schedule = [
    { time: '00:00 - 03:00', note: isKorean ? '자정~새벽 3시' : 'Nửa đêm~3h sáng' },
    { time: '06:00 - 09:00', note: isKorean ? '새벽 6시~9시' : '6h~9h sáng' },
    { time: '12:00 - 15:00', note: isKorean ? '정오~오후 3시' : '12h~15h' },
    { time: '18:00 - 21:00', note: isKorean ? '저녁 6시~9시' : '18h~21h' },
  ];

  const factionBonusInfo = [
    {
      faction: isKorean ? '블러디 로즈' : 'Blood Rose',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
    {
      faction: isKorean ? '새벽의 날개' : 'Wings of Dawn',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      faction: isKorean ? '질서의 수호자' : 'Guard of Order',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
  ];

  const damageThresholds = [
    { damage: '300K', reward: isKorean ? '초록(C등급) 장비 해금' : 'Mở trang bị xanh lá (C)' },
    { damage: '1M', reward: isKorean ? '파랑(B등급) 장비 해금' : 'Mở trang bị xanh dương (B)' },
    { damage: '3M', reward: isKorean ? '보라(A등급) 장비 해금' : 'Mở trang bị tím (A)' },
  ];

  const tips = [
    isKorean
      ? '연료가 없어도 공격 가능! 4회 완료 시 5개 연료 캔 환급'
      : 'Tấn công dù không có nhiên liệu! Hoàn thành 4 lần được hoàn 5 lon',
    isKorean
      ? '가장 높은 단일 데미지만 순위에 반영 - 매번 최고 기록 노려야'
      : 'Chỉ damage cao nhất tính vào xếp hạng - mỗi lần cố gắng phá kỷ lục',
    isKorean
      ? '당일 지정 진영 사용 시 +50% 데미지 보너스'
      : 'Dùng phe được chỉ định +50% bonus damage',
    isKorean
      ? '3M 데미지로 보라 장비 해금 - 중반 성장의 핵심 마일스톤'
      : '3M damage mở trang bị tím - milestone quan trọng giữa game',
    isKorean
      ? 'SVS State Ruler 기간에는 Top 200 데미지가 추가 포인트 제공'
      : 'Trong State Ruler SVS, Top 200 damage cho điểm thêm',
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Target className="h-8 w-8 text-red-400" />
            {isKorean ? '난폭 두목 (Furylord) 가이드' : 'Hướng dẫn Furylord'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '매일 4회 열리는 개인 보스 레이드 이벤트입니다. 보라(A등급) 장비 해금의 핵심 콘텐츠입니다.'
              : 'Sự kiện raid boss cá nhân 4 lần/ngày. Nội dung chính để mở trang bị tím (A).'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '일정: 매일 4회 (00/06/12/18시 시작, 각 3시간), 일요일 제외' : 'Lịch: 4 lần/ngày (bắt đầu 00/06/12/18h, mỗi lần 3 tiếng), trừ CN'}</li>
              <li>• {isKorean ? '연료 없이도 공격 가능, 4회 완료 시 5캔 환급' : 'Tấn công không cần nhiên liệu, hoàn thành 4 lần được hoàn 5 lon'}</li>
              <li>• {isKorean ? '3M 데미지 = 보라(A등급) 장비 해금' : '3M damage = mở trang bị tím (A)'}</li>
              <li>• {isKorean ? '당일 지정 진영 +50% 데미지 보너스' : 'Phe được chỉ định +50% bonus damage'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Schedule */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 text-highlight" />
            {isKorean ? '일정 (일요일 제외)' : 'Lịch (Trừ Chủ nhật)'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {schedule.map((slot, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
                    <p className="text-xl font-bold text-highlight">{slot.time}</p>
                    <p className="text-xs text-muted-foreground mt-1">{slot.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {isKorean
                  ? '각 시간대별로 3시간 동안 활성화됩니다'
                  : 'Mỗi khung giờ hoạt động trong 3 tiếng'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fuel Info */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Fuel className="h-6 w-6 text-green-400 shrink-0" />
              <div>
                <p className="font-semibold text-green-400 mb-1">
                  {isKorean ? '연료 걱정 NO!' : 'Không lo nhiên liệu!'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '연료가 없어도 난폭 두목을 공격할 수 있습니다. 하루 4회 공격을 모두 완료하면 5개의 연료 캔이 보상으로 지급됩니다.'
                    : 'Có thể tấn công Furylord dù không có nhiên liệu. Hoàn thành 4 lần/ngày sẽ được thưởng 5 lon nhiên liệu.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Damage Thresholds */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-purple-400" />
            {isKorean ? '데미지 달성 보상' : 'Phần thưởng theo damage'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {damageThresholds.map((threshold, idx) => (
                  <div
                    key={idx}
                    className={`text-center p-4 rounded-lg ${
                      idx === 2 ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-muted/30'
                    }`}
                  >
                    <p className={`text-2xl font-bold ${idx === 2 ? 'text-purple-400' : 'text-highlight'}`}>
                      {threshold.damage}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{threshold.reward}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {isKorean
                  ? '※ 3M 데미지 달성은 중반 성장의 핵심 마일스톤입니다'
                  : '※ Đạt 3M damage là milestone quan trọng cho mid-game'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Faction Bonus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-yellow-400" />
            {isKorean ? '진영 보너스 (+50% 데미지)' : 'Bonus phe phái (+50% damage)'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                {isKorean
                  ? '매일 지정된 진영 영웅을 사용하면 +50% 데미지 보너스를 받습니다. 게임 내 이벤트 센터에서 당일 진영을 확인하세요.'
                  : 'Mỗi ngày có một phe được chỉ định, dùng anh hùng phe đó +50% damage. Kiểm tra phe trong Event Center.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {factionBonusInfo.map((faction, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${faction.bg} text-center`}>
                    <p className={`font-semibold ${faction.color}`}>{faction.faction}</p>
                    <p className="text-xs text-muted-foreground mt-1">+50% {isKorean ? '데미지' : 'damage'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ranking Info */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {isKorean ? '순위 반영 방식' : 'Cách tính xếp hạng'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '하루 중 가장 높은 단일 데미지만 순위에 반영됩니다. 여러 번 공격해도 최고 기록 하나만 집계되므로, 매 공격마다 최고 데미지를 노리세요.'
                    : 'Chỉ damage cao nhất trong ngày được tính vào xếp hạng. Dù tấn công nhiều lần, chỉ kỷ lục cao nhất được tính, nên mỗi lần phải cố gắng đạt damage cao nhất.'}
                </p>
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
                  {isKorean ? '주의사항' : 'Lưu ý'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '일요일에는 난폭 두목이 열리지 않습니다' : 'Chủ nhật không có Furylord'}</li>
                  <li>• {isKorean ? '각 시간대 3시간이 지나면 자동으로 종료됩니다' : 'Mỗi khung giờ tự động kết thúc sau 3 tiếng'}</li>
                  <li>• {isKorean ? '진영 보너스는 당일만 유효 - 매일 확인 필수' : 'Bonus phe chỉ có hiệu lực trong ngày - kiểm tra mỗi ngày'}</li>
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
