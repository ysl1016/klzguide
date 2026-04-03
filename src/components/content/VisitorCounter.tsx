'use client';

import { useEffect, useState } from 'react';
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
}

export function VisitorCounter({ locale }: VisitorCounterProps) {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [mounted, setMounted] = useState(false);
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  useEffect(() => {
    setMounted(true);
    const controller = new AbortController();

    const loadStats = async () => {
      try {
        // 1. Record visit first (POST) — so the count includes this visit
        const visited = sessionStorage.getItem('klz_visited');
        if (!visited) {
          try {
            await fetch('/api/visitors', {
              method: 'POST',
              signal: controller.signal,
            });
            sessionStorage.setItem('klz_visited', 'true');
          } catch (error) {
            if ((error as Error).name === 'AbortError') return;
          }
        }

        // 2. Then fetch the latest stats (GET) — now includes this visit
        const response = await fetch('/api/visitors', {
          signal: controller.signal,
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to fetch visitor stats:', error);
          // Show nothing rather than stale data
        }
      }
    };

    loadStats();

    return () => controller.abort();
  }, []);

  // Skeleton until API responds
  if (!mounted || !stats) {
    return (
      <Card className="border-border/50 bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className="h-4 w-4 rounded bg-muted-foreground/20 animate-pulse" />
                  <div className="h-3 w-10 rounded bg-muted-foreground/20 animate-pulse" />
                </div>
                <div className="h-8 w-12 mx-auto rounded bg-muted-foreground/20 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats.configured) {
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
              {formatNumber(stats.daily)}
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
              {formatNumber(stats.monthly)}
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
              {formatNumber(stats.total)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
