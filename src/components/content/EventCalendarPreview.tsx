'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import type { DayRotation, FullPrepTheme, RestDay } from '@/types/event';
import {
  getRotationDay,
  getCurrentFullPrepThemeIndex,
  getFullPrepTimeLeft,
  getRotationTimeLeft,
} from '@/lib/game-time';

interface EventCalendarPreviewProps {
  sixDayRotation: DayRotation[];
  fullPrepThemes: FullPrepTheme[];
  restDay: RestDay;
}

export function EventCalendarPreview({
  sixDayRotation,
  fullPrepThemes,
  restDay,
}: EventCalendarPreviewProps) {
  const locale = useLocale() as 'ko' | 'vi' | 'en';
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale] ?? en);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    // Update every minute for accurate countdown
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-4 h-32 animate-pulse bg-secondary/30" />
      </Card>
    );
  }

  // 6-day rotation (Apocalypse Time based), 0 = Sunday rest day
  const rotationDay = getRotationDay(now);
  const isSundayRest = rotationDay === 0;
  const todayRotation = isSundayRest ? null : sixDayRotation[rotationDay - 1];

  // Full Prep current theme (Apocalypse Time based, day-specific schedule)
  const fullPrepThemeIndex = getCurrentFullPrepThemeIndex(now);
  const currentFullPrep = fullPrepThemes[fullPrepThemeIndex];

  // Time left
  const timeLeft = getFullPrepTimeLeft(now);
  const rotationTimeLeft = getRotationTimeLeft(now);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-highlight" />
          {l('오늘의 이벤트', 'Sự kiện hôm nay', "Today's Events")}
        </h2>
        <Link
          href={`/${locale}/events/full-prep`}
          className="text-sm text-highlight hover:underline flex items-center gap-1"
        >
          {l('자세히', 'Chi tiết', 'Details')}
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Today's Rotation */}
        <Card className={isSundayRest ? 'border-gray-500/30' : 'border-blue-500/30'}>
          <CardContent className="p-4">
            {isSundayRest ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/30 text-[11px] px-1.5 py-0">
                    {l('일요일', 'Chủ nhật', 'Sunday')}
                  </Badge>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3 shrink-0" />
                    {rotationTimeLeft.hours}h {rotationTimeLeft.minutes}m
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-400 mb-1">
                  {restDay.name[locale]}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {restDay.description[locale]}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-[11px] px-1.5 py-0">
                      {l('연맹 대결', 'AD', 'AD')} D{rotationDay}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3 shrink-0" />
                    {rotationTimeLeft.hours}h {rotationTimeLeft.minutes}m
                  </div>
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-blue-400 mb-1">
                  {todayRotation?.name[locale]}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
                  {todayRotation?.description[locale]}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Current Full Prep Theme */}
        <Card className="border-highlight/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-highlight/10 text-highlight border-highlight/30 text-[11px] px-1.5 py-0">
                {l('전면전비', 'Full Prep', 'Full Prep')}
              </Badge>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                <Clock className="h-3 w-3 shrink-0" />
                {timeLeft.hours > 0 && `${timeLeft.hours}h `}{timeLeft.minutes}m
              </div>
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-highlight mb-1">
              {currentFullPrep?.name[locale]}
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
              {currentFullPrep?.description[locale]}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
