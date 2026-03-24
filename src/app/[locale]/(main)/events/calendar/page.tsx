import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Zap, Swords, Users } from 'lucide-react';
import {
  getSixDayRotation,
  getFullPrepThemes,
  getCanyonClashTimeline,
  getHotEventRotation,
} from '@/lib/events';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '이벤트 캘린더' : 'Lịch sự kiện',
    description:
      locale === 'ko'
        ? 'Last Z 전체 이벤트 일정과 로테이션 정보'
        : 'Lịch trình toàn bộ sự kiện và xoay vòng Last Z',
  };
}

export default async function EventCalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EventCalendarContent locale={locale} />;
}

function EventCalendarContent({ locale }: { locale: string }) {
  const isKorean = locale === 'ko';
  const loc = locale as 'ko' | 'vi';

  const sixDayRotation = getSixDayRotation();
  const fullPrepThemes = getFullPrepThemes();
  const canyonTimeline = getCanyonClashTimeline();
  const hotRotation = getHotEventRotation();

  const hotEventNames: Record<string, { ko: string; vi: string }> = {
    gachaGo: { ko: '행운의 흔들기', vi: 'Lucky Shake' },
    bullseye: { ko: '사격장', vi: 'Bullseye' },
    luckyDiscounter: { ko: '럭키 할인', vi: 'Lucky Discounter' },
    luckyChest: { ko: '행운의 금고', vi: 'Lucky Chest' },
  };

  const themeColors = [
    'bg-blue-500/10 border-blue-500/20 text-blue-400',
    'bg-orange-500/10 border-orange-500/20 text-orange-400',
    'bg-green-500/10 border-green-500/20 text-green-400',
    'bg-purple-500/10 border-purple-500/20 text-purple-400',
    'bg-red-500/10 border-red-500/20 text-red-400',
    'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-highlight" />
            {isKorean ? '이벤트 캘린더' : 'Lịch sự kiện'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '모든 이벤트의 일정과 로테이션을 한눈에 확인하세요.'
              : 'Xem lịch trình và xoay vòng của tất cả sự kiện.'}
          </p>
        </div>

        {/* 6-Day Rotation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-highlight" />
              {isKorean ? '6일 로테이션' : 'Xoay vòng 6 ngày'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sixDayRotation.map((day, idx) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-lg border ${themeColors[idx]}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Day {day.day}
                    </Badge>
                    <span className="font-semibold">{day.name[loc]}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {day.description[loc]}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-warning/5 border border-warning/20">
              <p className="text-sm text-warning font-medium">
                {isKorean
                  ? '핵심 규칙: 이벤트 밖에서 소비하지 마세요! 아이템을 이벤트 날짜에 맞추고, 전면전비 시간대에 맞추세요.'
                  : 'Quy tắc vàng: Không tiêu ngoài sự kiện! Khớp vật phẩm với ngày sự kiện, rồi khớp thời gian Full Prep.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Full Preparedness Themes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-highlight" />
              {isKorean ? '전면전비 4시간 테마' : 'Chủ đề Full Prep 4 giờ'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isKorean
                ? '전면전비는 매일 4시간마다 테마가 바뀝니다. 해당 테마에 맞는 활동을 하면 포인트를 더 많이 얻습니다.'
                : 'Full Prep thay đổi chủ đề mỗi 4 giờ. Thực hiện hoạt động phù hợp chủ đề để nhận nhiều điểm hơn.'}
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {fullPrepThemes.map((theme, idx) => (
                <div
                  key={theme.id}
                  className={`p-3 rounded-lg border text-center ${themeColors[idx]}`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {theme.name[loc]}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {theme.description[loc]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Canyon Clash Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5 text-highlight" />
              {isKorean ? '협곡쟁탈전 주간 일정' : 'Lịch Canyon Clash hàng tuần'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {canyonTimeline.map((step, idx) => (
                <div key={step.day} className="flex items-center gap-2">
                  <div className="px-4 py-3 rounded-lg border bg-secondary/30 text-center min-w-[100px]">
                    <div className="text-xs text-muted-foreground mb-1 uppercase">
                      {step.day}
                    </div>
                    <div className="font-semibold text-sm">
                      {step.phase[loc]}
                    </div>
                  </div>
                  {idx < canyonTimeline.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hot Event Rotation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-highlight" />
              {isKorean ? '핫이벤트 로테이션' : 'Xoay vòng sự kiện nóng'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap items-center">
              {hotRotation.map((eventKey, idx) => (
                <div key={eventKey} className="flex items-center gap-2">
                  <Badge variant="outline" className="px-3 py-1.5 text-sm">
                    {hotEventNames[eventKey]?.[loc] ?? eventKey}
                  </Badge>
                  {idx < hotRotation.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {isKorean
                ? '서버별 타이밍이 다를 수 있습니다.'
                : 'Thời gian có thể khác theo máy chủ.'}
            </p>
          </CardContent>
        </Card>

        {/* Weekly Recurring Events */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isKorean ? '주간 반복 이벤트' : 'Sự kiện hàng tuần'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: { ko: '좀비공성', vi: 'Zombie Siege' },
                  schedule: { ko: '월/화 (연맹장 설정)', vi: 'Thứ 2/3 (do thủ lĩnh đặt)' },
                },
                {
                  name: { ko: '난폭 두목', vi: 'Furylord' },
                  schedule: { ko: '격일, 하루 4회', vi: 'Cách ngày, 4 lần/ngày' },
                },
                {
                  name: { ko: '연맹 대결', vi: 'Đấu Liên minh' },
                  schedule: { ko: '매주 (일별 테마)', vi: 'Hàng tuần (chủ đề theo ngày)' },
                },
                {
                  name: { ko: '서버 대전 (SVS)', vi: 'SVS' },
                  schedule: { ko: '격주', vi: 'Hai tuần một lần' },
                },
              ].map((event) => (
                <div
                  key={event.name.ko}
                  className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30"
                >
                  <span className="font-medium text-sm">{event.name[loc]}</span>
                  <span className="text-xs text-muted-foreground">
                    {event.schedule[loc]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
