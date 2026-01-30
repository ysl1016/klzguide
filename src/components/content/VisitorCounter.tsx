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
  const [hasRecorded, setHasRecorded] = useState(false);
  const isKorean = locale === 'ko';

  useEffect(() => {
    // Fetch current stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch visitor stats:', error);
      }
    };

    // Record visit (only once per session)
    const recordVisit = async () => {
      if (hasRecorded) return;

      // Check sessionStorage to prevent duplicate counting in same session
      const visited = sessionStorage.getItem('klz_visited');
      if (visited) {
        setHasRecorded(true);
        return;
      }

      try {
        await fetch('/api/visitors', { method: 'POST' });
        sessionStorage.setItem('klz_visited', 'true');
        setHasRecorded(true);
        // Refetch stats after recording
        fetchStats();
      } catch (error) {
        console.error('Failed to record visit:', error);
      }
    };

    fetchStats();
    recordVisit();
  }, [hasRecorded]);

  // Don't render if not configured or no data
  if (!stats || !stats.configured) {
    return null;
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="border-border/50 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {/* Daily Visitors */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs">{isKorean ? '오늘' : 'Hôm nay'}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(stats.daily)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-border" />

          {/* Monthly Visitors */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">{isKorean ? '이번 달' : 'Tháng này'}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(stats.monthly)}
            </p>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-border" />

          {/* Total Visitors */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">{isKorean ? '총 방문' : 'Tổng cộng'}</span>
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
