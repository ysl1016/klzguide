import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

// Get today's date in YYYY-MM-DD format
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// Get current month in YYYY-MM format
function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

// GET: Fetch visitor counts
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      daily: 0,
      monthly: 0,
      total: 0,
      configured: false,
    });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({
      daily: 0,
      monthly: 0,
      total: 0,
      configured: false,
    });
  }

  try {
    const today = getToday();
    const currentMonth = getCurrentMonth();

    // Run all queries in parallel for faster response
    const [dailyResult, monthlyResult, totalResult] = await Promise.all([
      // Get today's count
      supabase
        .from('visitor_stats')
        .select('count')
        .eq('date', today)
        .single(),
      // Get this month's total
      supabase
        .from('visitor_stats')
        .select('count')
        .gte('date', `${currentMonth}-01`)
        .lte('date', `${currentMonth}-31`),
      // Get total count
      supabase
        .from('visitor_stats')
        .select('count'),
    ]);

    const daily = dailyResult.data?.count || 0;
    const monthly = monthlyResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0;
    const total = totalResult.data?.reduce((sum, row) => sum + (row.count || 0), 0) || 0;

    // Return with cache headers (stale-while-revalidate)
    return NextResponse.json(
      {
        daily,
        monthly,
        total,
        configured: true,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json({
      daily: 0,
      monthly: 0,
      total: 0,
      configured: true,
      error: 'Failed to fetch stats',
    });
  }
}

// POST: Record a visitor
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, message: 'Supabase not configured' });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ success: false, message: 'Supabase not configured' });
  }

  try {
    const today = getToday();

    // Check if there's already a record for today
    const { data: existingData } = await supabase
      .from('visitor_stats')
      .select('id, count')
      .eq('date', today)
      .single();

    if (existingData) {
      // Update existing record
      await supabase
        .from('visitor_stats')
        .update({ count: existingData.count + 1 })
        .eq('id', existingData.id);
    } else {
      // Insert new record for today
      await supabase
        .from('visitor_stats')
        .insert({ date: today, count: 1 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording visitor:', error);
    return NextResponse.json({ success: false, error: 'Failed to record visitor' });
  }
}
