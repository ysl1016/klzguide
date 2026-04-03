'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CalendarDays, Calendar } from 'lucide-react';

interface VisitorStats {
  daily: number;
  monthly: number;
  total: number;
  configured: boolean;
}

interface VisitorCounterProps {
  locale: string;
  initialStats: VisitorStats;
}

export function VisitorCounter({ locale, initialStats }: VisitorCounterProps) {
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  // Record visit (POST only, no GET — initial data already provided by server)
  useEffect(() => {
    const visited = sessionStorage.getItem('klz_visited');
    if (visited) return;

    fetch('/api/visitors', { method: 'POST' })
      .then(() => sessionStorage.setItem('klz_visited', 'true'))
      .catch(() => {});
  }, []);

  if (!initialStats.configured) {
    return null;
  }

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <Card className="border-border/50 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {/* Daily */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs">{l('오늘', 'Hôm nay', 'Today')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(initialStats.daily)}
            </p>
          </div>

          <div className="h-10 w-px bg-border" />

          {/* Monthly */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">{l('이번 달', 'Tháng này', 'This Month')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(initialStats.monthly)}
            </p>
          </div>

          <div className="h-10 w-px bg-border" />

          {/* Total */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">{l('총 방문', 'Tổng cộng', 'Total')}</span>
            </div>
            <p className="text-2xl font-bold text-highlight">
              {formatNumber(initialStats.total)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
