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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: l('이벤트 캘린더', 'Lịch sự kiện', 'Event Calendar'),
    description: l(
      'Last Z 전체 이벤트 일정과 로테이션 정보',
      'Lịch trình toàn bộ sự kiện và xoay vòng Last Z',
      'Full Last Z event schedule and rotation information'
    ),
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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const loc = locale as 'ko' | 'vi' | 'en';

  const sixDayRotation = getSixDayRotation();
  const fullPrepThemes = getFullPrepThemes();
  const canyonTimeline = getCanyonClashTimeline();
  const hotRotation = getHotEventRotation();

  const hotEventNames: Record<string, { ko: string; vi: string; en: string }> = {
    gachaGo: { ko: '행운의 흔들기', vi: 'Lucky Shake', en: 'Lucky Shake' },
    bullseye: { ko: '사격장', vi: 'Bullseye', en: 'Bullseye' },
    luckyDiscounter: { ko: '행운 할인', vi: 'Lucky Discounter', en: 'Lucky Discounter' },
    luckyChest: { ko: '행운의 금고', vi: 'Lucky Chest', en: 'Lucky Chest' },
  };

  const themeColors = [
    'bg-blue-500/10 border-blue-500/20 text-blue-400',
    'bg-orange-500/10 border-orange-500/20 text-orange-400',
    'bg-green-500/10 border-green-500/20 text-green-400',
    'bg-purple-500/10 border-purple-500/20 text-purple-400',
    'bg-red-500/10 border-red-500/20 text-red-400',
    'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  ];

  // For data that uses loc key, we need to handle 'en' locale
  const locKey = (locale === 'ko' || locale === 'vi') ? locale : 'en';

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-highlight" />
            {l('이벤트 캘린더', 'Lịch sự kiện', 'Event Calendar')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '모든 이벤트의 일정과 로테이션을 한눈에 확인하세요.',
              'Xem lịch trình và xoay vòng của tất cả sự kiện.',
              'View all event schedules and rotations at a glance.'
            )}
          </p>
        </div>

        {/* 6-Day Rotation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-highlight" />
              {l('6일 로테이션', 'Xoay vòng 6 ngày', '6-Day Rotation')}
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
                {l(
                  '핵심 규칙: 이벤트 밖에서 소비하지 마세요! 아이템을 이벤트 날짜에 맞추고, 전면전비 시간대에 맞추세요.',
                  'Quy tắc vàng: Không tiêu ngoài sự kiện! Khớp vật phẩm với ngày sự kiện, rồi khớp thời gian Full Prep.',
                  'Golden rule: Never spend outside events! Match items to event days, then align with Full Prep time slots.'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Full Preparedness Themes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-highlight" />
              {l('전면전비 4시간 테마', 'Chủ đề Full Prep 4 giờ', 'Full Prep 4-Hour Themes')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {l(
                '전면전비는 매일 4시간마다 테마가 바뀝니다. 해당 테마에 맞는 활동을 하면 포인트를 더 많이 얻습니다.',
                'Full Prep thay đổi chủ đề mỗi 4 giờ. Thực hiện hoạt động phù hợp chủ đề để nhận nhiều điểm hơn.',
                'Full Prep rotates themes every 4 hours. Performing activities that match the theme earns more points.'
              )}
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
              {l('협곡쟁탈전 주간 일정', 'Lịch Canyon Clash hàng tuần', 'Canyon Clash Weekly Schedule')}
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
              {l('핫이벤트 로테이션', 'Xoay vòng sự kiện nóng', 'Hot Event Rotation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap items-center">
              {hotRotation.map((eventKey, idx) => (
                <div key={eventKey} className="flex items-center gap-2">
                  <Badge variant="outline" className="px-3 py-1.5 text-sm">
                    {hotEventNames[eventKey]?.[locKey as 'ko' | 'vi' | 'en'] ?? eventKey}
                  </Badge>
                  {idx < hotRotation.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {l(
                '서버별 타이밍이 다를 수 있습니다.',
                'Thời gian có thể khác theo máy chủ.',
                'Timing may vary by server.'
              )}
            </p>
          </CardContent>
        </Card>

        {/* Weekly Recurring Events */}
        <Card>
          <CardHeader>
            <CardTitle>
              {l('주간 반복 이벤트', 'Sự kiện hàng tuần', 'Weekly Recurring Events')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: { ko: '좀비공성', vi: 'Zombie Siege', en: 'Zombie Siege' },
                  schedule: { ko: '월/화 (연맹장 설정)', vi: 'Thứ 2/3 (do thủ lĩnh đặt)', en: 'Mon/Tue (set by alliance leader)' },
                },
                {
                  name: { ko: '난폭 두목', vi: 'Furylord', en: 'Furylord' },
                  schedule: { ko: '격일, 하루 4회', vi: 'Cách ngày, 4 lần/ngày', en: 'Every other day, 4 times/day' },
                },
                {
                  name: { ko: '연맹 대결', vi: 'Đấu Liên minh', en: 'Alliance Duel' },
                  schedule: { ko: '매주 (일별 테마)', vi: 'Hàng tuần (chủ đề theo ngày)', en: 'Weekly (daily themes)' },
                },
                {
                  name: { ko: '서버 대전 (SVS)', vi: 'SVS', en: 'SVS (Server vs Server)' },
                  schedule: { ko: '격주', vi: 'Hai tuần một lần', en: 'Bi-weekly' },
                },
              ].map((event) => (
                <div
                  key={event.name.ko}
                  className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30"
                >
                  <span className="font-medium text-sm">{event.name[locKey as 'ko' | 'vi' | 'en']}</span>
                  <span className="text-xs text-muted-foreground">
                    {event.schedule[locKey as 'ko' | 'vi' | 'en']}
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
