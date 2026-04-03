import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

const KST_OFFSET = 9 * 60 * 60 * 1000;

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

/**
 * Fetch visitor stats directly from Supabase (server-side).
 * Called from server components for instant rendering.
 */
export async function getVisitorStats(): Promise<VisitorStats> {
  if (!isSupabaseConfigured()) {
    return { daily: 0, monthly: 0, total: 0, configured: false };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { daily: 0, monthly: 0, total: 0, configured: false };
  }

  try {
    const today = getToday();
    const currentMonth = getCurrentMonth();
    const lastDayOfMonth = getLastDayOfMonth();

    const [dailyResult, monthlyResult, totalResult] = await Promise.all([
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

    return {
      daily: dailyResult.data?.count || 0,
      monthly: monthlyResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0,
      total: totalResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0,
      configured: true,
    };
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return { daily: 0, monthly: 0, total: 0, configured: true };
  }
}
