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

const CACHE_KEY = 'klz_visitor_stats';
const CACHE_TTL = 60000; // 1 minute

// Get cached stats from localStorage
function getCachedStats(): VisitorStats | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    // Return cached data if less than TTL old
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
    return data; // Return stale data for immediate display
  } catch {
    return null;
  }
}

// Save stats to localStorage
function setCachedStats(stats: VisitorStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: stats, timestamp: Date.now() })
    );
  } catch {
    // Ignore localStorage errors
  }
}

export function VisitorCounter({ locale }: VisitorCounterProps) {
  // Initialize with cached data for instant display
  const [stats, setStats] = useState<VisitorStats | null>(() => getCachedStats());
  const [isLoading, setIsLoading] = useState(!getCachedStats());
  const isKorean = locale === 'ko';

  useEffect(() => {
    const controller = new AbortController();

    // Fetch and update stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/visitors', {
          signal: controller.signal,
        });
        const data = await response.json();
        setStats(data);
        setCachedStats(data);
        setIsLoading(false);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to fetch visitor stats:', error);
          setIsLoading(false);
        }
      }
    };

    // Record visit (only once per session)
    const recordVisit = async () => {
      // Check sessionStorage to prevent duplicate counting
      const visited = sessionStorage.getItem('klz_visited');
      if (visited) return;

      try {
        await fetch('/api/visitors', {
          method: 'POST',
          signal: controller.signal,
        });
        sessionStorage.setItem('klz_visited', 'true');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to record visit:', error);
        }
      }
    };

    // Fetch stats first (faster), then record visit in background
    fetchStats();
    recordVisit();

    return () => controller.abort();
  }, []);

  // Show skeleton while loading (only if no cached data)
  if (isLoading && !stats) {
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

  // Don't render if not configured
  if (!stats?.configured) {
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
