import { unstable_cache } from 'next/cache';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

const KST_OFFSET = 9 * 60 * 60 * 1000;
const SUPABASE_TIMEOUT_MS = 5000;
const CACHE_TTL_SECONDS = 60;

function getKoreaDate(): Date {
  return new Date(Date.now() + KST_OFFSET);
}

function getToday(): string {
  return getKoreaDate().toISOString().split('T')[0];
}

function getCurrentMonth(): string {
  return getKoreaDate().toISOString().slice(0, 7);
}

function getLastDayOfMonth(): string {
  const koreaDate = getKoreaDate();
  const year = koreaDate.getUTCFullYear();
  const month = koreaDate.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  return lastDay.toISOString().split('T')[0];
}

export interface VisitorStats {
  daily: number;
  monthly: number;
  total: number;
  configured: boolean;
}

const FALLBACK_CONFIGURED: VisitorStats = {
  daily: 0,
  monthly: 0,
  total: 0,
  configured: true,
};

const FALLBACK_UNCONFIGURED: VisitorStats = {
  daily: 0,
  monthly: 0,
  total: 0,
  configured: false,
};

// Race promise against timeout; on timeout resolve with sentinel
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T | typeof TIMEOUT> {
  return Promise.race([
    p,
    new Promise<typeof TIMEOUT>((resolve) => setTimeout(() => resolve(TIMEOUT), ms)),
  ]);
}
const TIMEOUT = Symbol('timeout');

async function fetchVisitorStatsRaw(): Promise<VisitorStats> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_UNCONFIGURED;
  }

  const supabase = getSupabase();
  if (!supabase) {
    return FALLBACK_UNCONFIGURED;
  }

  try {
    const today = getToday();
    const currentMonth = getCurrentMonth();
    const lastDayOfMonth = getLastDayOfMonth();

    const queries = Promise.all([
      supabase
        .from('visitor_stats')
        .select('count')
        .eq('date', today)
        .single(),
      supabase
        .from('visitor_stats')
        .select('count')
        .gte('date', `${currentMonth}-01`)
        .lte('date', lastDayOfMonth),
      supabase
        .from('visitor_stats')
        .select('count'),
    ]);

    const result = await withTimeout(queries, SUPABASE_TIMEOUT_MS);
    if (result === TIMEOUT) {
      console.error('Visitor stats: Supabase query timed out');
      return FALLBACK_CONFIGURED;
    }

    const [dailyResult, monthlyResult, totalResult] = result;

    return {
      daily: dailyResult.data?.count || 0,
      monthly:
        monthlyResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0,
      total:
        totalResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0,
      configured: true,
    };
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return FALLBACK_CONFIGURED;
  }
}

export const getVisitorStats = unstable_cache(
  fetchVisitorStatsRaw,
  ['visitor-stats'],
  { revalidate: CACHE_TTL_SECONDS, tags: ['visitor-stats'] }
);
