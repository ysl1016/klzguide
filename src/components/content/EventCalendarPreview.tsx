'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import type { DayRotation, FullPrepTheme } from '@/types/event';

interface EventCalendarPreviewProps {
  sixDayRotation: DayRotation[];
  fullPrepThemes: FullPrepTheme[];
}

export function EventCalendarPreview({
  sixDayRotation,
  fullPrepThemes,
}: EventCalendarPreviewProps) {
  const locale = useLocale() as 'ko' | 'vi';
  const isKorean = locale === 'ko';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-4 h-32 animate-pulse bg-secondary/30" />
      </Card>
    );
  }

  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const rotationIndex = (dayOfYear - 1) % 6;
  const todayRotation = sixDayRotation[rotationIndex];

  const hour = now.getHours();
  const fullPrepIndex = Math.floor(hour / 4) % fullPrepThemes.length;
  const currentFullPrep = fullPrepThemes[fullPrepIndex];
  const nextRotationHour = (Math.floor(hour / 4) + 1) * 4;
  const hoursLeft = nextRotationHour - hour;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-highlight" />
          {isKorean ? '오늘의 이벤트' : 'Sự kiện hôm nay'}
        </h2>
        <Link
          href={`/${locale}/events/full-prep`}
          className="text-sm text-highlight hover:underline flex items-center gap-1"
        >
          {isKorean ? '자세히' : 'Chi tiết'}
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Today's Rotation */}
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {isKorean ? '6일 로테이션' : 'Xoay vòng 6 ngày'}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Day {rotationIndex + 1}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg mb-1">
              {todayRotation?.name[locale]}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {todayRotation?.description[locale]}
            </p>
          </CardContent>
        </Card>

        {/* Current Full Prep Theme */}
        <Card className="border-highlight/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-highlight/10 text-highlight border-highlight/30">
                {isKorean ? '전면전비' : 'Full Prep'}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {hoursLeft}{isKorean ? '시간 남음' : 'h left'}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-1">
              {currentFullPrep?.name[locale]}
            </h3>
            <p className="text-xs text-muted-foreground">
              {currentFullPrep?.description[locale]}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
