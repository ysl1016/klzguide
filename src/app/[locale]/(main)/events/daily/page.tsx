import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Wrench, Building2, FlaskConical, Users, Swords, Target, Lightbulb, AlertTriangle, Timer } from 'lucide-react';

export default async function DailyEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DailyEventsContent locale={locale} />;
}

function DailyEventsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const fullPrepThemes = [
    {
      name: isKorean ? '건물 업그레이드' : 'Shelter Upgrade',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      activities: isKorean
        ? '건물 파워 10 증가 (1pt), 건설 가속 1분당 10pt'
        : 'Tăng 10 Structure power (1pt), 1 phút tăng tốc xây (10pt)',
    },
    {
      name: isKorean ? '과학의 시대' : 'Age of Science',
      icon: FlaskConical,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      activities: isKorean
        ? '기술 파워 10 증가 (1pt), 연구 가속 1분당 10pt'
        : 'Tăng 10 Tech power (1pt), 1 phút tăng tốc NC (10pt)',
    },
    {
      name: isKorean ? '차량 개조' : 'Mod Vehicle Boost',
      icon: Wrench,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      activities: isKorean
        ? '개조 청사진 소모 (4pt), 크립 처치 (840-2000pt)'
        : 'Tiêu thụ Blueprint (4pt), Kill Creep (840-2000pt)',
    },
    {
      name: isKorean ? '영웅 이니셔티브' : 'Hero Initiative',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      activities: isKorean
        ? '프라임 모집 (400pt), EXP 2000당 1pt'
        : 'Prime Recruit (400pt), 2000 EXP (1pt)',
    },
    {
      name: isKorean ? '병력 확장' : 'Army Expansion',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      activities: isKorean
        ? 'Lv.6 유닛 훈련 (150pt), 훈련 가속 1분당 10pt'
        : 'Train Lv.6 Unit (150pt), 1 phút tăng tốc HL (10pt)',
    },
  ];

  const furylordSchedule = [
    { time: '00:00', duration: isKorean ? '3시간 동안 활성' : 'Hoạt động 3 tiếng' },
    { time: '06:00', duration: isKorean ? '3시간 동안 활성' : 'Hoạt động 3 tiếng' },
    { time: '12:00', duration: isKorean ? '3시간 동안 활성' : 'Hoạt động 3 tiếng' },
    { time: '18:00', duration: isKorean ? '3시간 동안 활성' : 'Hoạt động 3 tiếng' },
  ];

  const tips = [
    isKorean
      ? 'Full Preparedness는 4시간마다 테마가 변경됨 - 테마에 맞는 활동만 포인트 획득'
      : 'Full Preparedness đổi theme mỗi 4 tiếng - chỉ hoạt động đúng theme được điểm',
    isKorean
      ? '퓨리로드는 일요일 제외 매일 4회 - 연료 없어도 공격 가능, 연료 환급됨'
      : 'Furylord 4 lần/ngày trừ CN - tấn công dù không có nhiên liệu, hoàn nhiên liệu',
    isKorean
      ? '3M 데미지 달성 시 보라(A등급) 장비 해금 - 당일 지정 진영 50% 추가 데미지'
      : 'Đạt 3M damage mở trang bị tím (A) - phe được chỉ định +50% damage',
    isKorean
      ? '연맹 대결과 Full Preparedness가 겹칠 때 활동하면 보상 2배'
      : 'Hoạt động khi AD trùng Full Prep = thưởng gấp đôi',
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="h-8 w-8 text-highlight" />
            {isKorean ? '일일 이벤트 가이드' : 'Hướng dẫn sự kiện hàng ngày'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? 'Full Preparedness 테마와 퓨리로드 일정을 알아봅니다.'
              : 'Tìm hiểu theme Full Preparedness và lịch Furylord.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? 'Full Preparedness: 매일 4시간마다 테마 변경 (5개 테마 순환)' : 'Full Preparedness: Đổi theme mỗi 4 tiếng (5 theme xoay vòng)'}</li>
              <li>• {isKorean ? '테마에 맞는 활동만 포인트 획득 - 테마 확인 필수!' : 'Chỉ hoạt động đúng theme được điểm - kiểm tra theme!'}</li>
              <li>• {isKorean ? '퓨리로드: 4회/일 (00/06/12/18시), 일요일 제외, 3시간 활성' : 'Furylord: 4 lần/ngày (00/06/12/18h), trừ CN, hoạt động 3 tiếng'}</li>
              <li>• {isKorean ? '연맹 대결 + Full Prep 겹칠 때 = 보상 2배 효과' : 'AD + Full Prep trùng = hiệu ứng thưởng gấp đôi'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Full Preparedness Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-highlight" />
            <h2 className="text-2xl font-bold">
              Full Preparedness
            </h2>
          </div>
          <Card className="border-highlight/30 bg-highlight/5">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                {isKorean
                  ? '매일 4시간마다 테마가 변경됩니다. 현재 테마에 해당하는 활동만 포인트를 획득할 수 있습니다. 비슷한 쉘터 레벨의 플레이어들과 경쟁합니다.'
                  : 'Theme đổi mỗi 4 tiếng mỗi ngày. Chỉ hoạt động đúng theme hiện tại mới được điểm. Cạnh tranh với người chơi cùng level shelter.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {fullPrepThemes.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <div key={theme.name} className={`p-3 rounded-lg ${theme.bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`h-5 w-5 ${theme.color}`} />
                        <span className={`font-semibold text-sm ${theme.color}`}>{theme.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{theme.activities}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Important Rule */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '핵심 규칙' : 'Quy tắc cốt lõi'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '테마가 변경된 직후에 비용이 큰 건설/훈련을 시작하지 마세요! 4시간 창이 끝나기 전에 수동으로 상자를 수령하세요. 그렇지 않으면 보상을 잃을 수 있습니다.'
                    : 'KHÔNG bắt đầu xây/huấn luyện tốn kém ngay sau khi đổi theme! Thu thủ công hộp trước khi kết thúc 4 tiếng, nếu không sẽ mất phần thưởng.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Furylord Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-red-400" />
            {isKorean ? '퓨리로드 (Furylord)' : 'Furylord'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                {furylordSchedule.map((slot) => (
                  <div key={slot.time} className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-2xl font-bold text-highlight">{slot.time}</p>
                    <p className="text-xs text-muted-foreground">{slot.duration}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-center border-t border-border pt-4">
                <div>
                  <p className="text-lg font-bold text-purple-400">3M</p>
                  <p className="text-xs text-muted-foreground">{isKorean ? '보라 장비 해금 데미지' : 'Damage mở trang bị tím'}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-yellow-400">+50%</p>
                  <p className="text-xs text-muted-foreground">{isKorean ? '지정 진영 보너스 데미지' : 'Bonus damage phe chỉ định'}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-400">4x</p>
                  <p className="text-xs text-muted-foreground">{isKorean ? '일일 공격 횟수 (일요일 제외)' : 'Số lần/ngày (trừ CN)'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="info-tip flex gap-3 p-4 rounded-lg border border-tip/30 bg-tip/5">
            <Lightbulb className="h-5 w-5 text-tip shrink-0" />
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '연료가 없어도 공격 가능합니다! 4회 공격 완료 시 5개의 연료 캔이 보상으로 환급됩니다. 가장 높은 단일 데미지만 순위에 반영됩니다.'
                : 'Có thể tấn công dù không có nhiên liệu! Hoàn thành 4 lần được hoàn 5 lon nhiên liệu. Chỉ damage cao nhất được tính vào bảng xếp hạng.'}
            </p>
          </div>
        </section>

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
