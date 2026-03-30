/**
 * Game Time Utilities for Last Z: Survival Shooter
 *
 * Apocalypse Time = UTC-2
 * KST (Korea) = UTC+9 = Apoc + 11 hours
 *
 * Game day resets at Apoc 00:00 = KST 11:00
 * Full Prep cycles every 4 hours starting at Apoc 00:00
 *
 * 6-Day Rotation: Day 1 = Monday (Apoc time)
 * Reference: 2026-03-23 (Monday) = Day 1
 */

// Apocalypse Time offset from UTC in hours
const APOC_UTC_OFFSET = -2;

/**
 * Convert any Date to Apocalypse Time Date
 * Returns a Date whose UTC methods (.getUTCHours(), .getUTCDay(), etc.)
 * reflect the Apoc wall-clock time.
 */
export function toApocTime(date: Date = new Date()): Date {
  // date.getTime() is already UTC milliseconds
  // Shift by Apoc offset to get Apoc "wall clock" in UTC representation
  return new Date(date.getTime() + APOC_UTC_OFFSET * 60 * 60 * 1000);
}

/**
 * Get current rotation day (1-6) or 0 for Sunday (Rest Day)
 *
 * The game follows a weekly schedule:
 * - Monday = Day 1, Tuesday = Day 2, ... Saturday = Day 6
 * - Sunday = Rest Day (no SVS or Alliance Duel)
 *
 * Returns 0 for Sunday, 1-6 for Mon-Sat
 */
export function getRotationDay(date: Date = new Date()): number {
  const apoc = toApocTime(date);
  const dayOfWeek = apoc.getUTCDay(); // 0=Sun, 1=Mon, ... 6=Sat

  if (dayOfWeek === 0) return 0; // Sunday = Rest Day
  return dayOfWeek; // 1=Mon(Day1), 2=Tue(Day2), ... 6=Sat(Day6)
}

/**
 * Get remaining time until next rotation day change (Apoc 00:00)
 * Returns { hours, minutes }
 */
export function getRotationTimeLeft(date: Date = new Date()): {
  hours: number;
  minutes: number;
} {
  const apoc = toApocTime(date);
  const hour = apoc.getUTCHours();
  const minute = apoc.getUTCMinutes();

  const hoursLeft = 23 - hour;
  const minutesLeft = 60 - minute;

  return {
    hours: minutesLeft === 60 ? hoursLeft + 1 : hoursLeft,
    minutes: minutesLeft === 60 ? 0 : minutesLeft,
  };
}

/**
 * Get current Full Prep theme index (0-5) based on 4-hour Apoc cycles
 * Cycles: Apoc 00:00, 04:00, 08:00, 12:00, 16:00, 20:00
 */
export function getFullPrepCycleIndex(date: Date = new Date()): number {
  const apoc = toApocTime(date);
  const hour = apoc.getUTCHours();
  return Math.floor(hour / 4); // 0-5
}

/**
 * Get remaining time until next Full Prep cycle change
 * Returns { hours, minutes }
 */
export function getFullPrepTimeLeft(date: Date = new Date()): {
  hours: number;
  minutes: number;
} {
  const apoc = toApocTime(date);
  const hour = apoc.getUTCHours();
  const minute = apoc.getUTCMinutes();

  const nextCycleHour = (Math.floor(hour / 4) + 1) * 4;
  const hoursLeft = nextCycleHour - hour - 1;
  const minutesLeft = 60 - minute;

  return {
    hours: minutesLeft === 60 ? hoursLeft + 1 : hoursLeft,
    minutes: minutesLeft === 60 ? 0 : minutesLeft,
  };
}

/**
 * Full Prep theme schedule per day of week (Apoc time)
 * Each day has 6 cycles (indices into fullPrepThemes array)
 *
 * Themes: 0=science, 1=army, 2=hero(영웅육성), 3=vehicle, 4=shelter
 *
 * Schedule from alliance-duel page data:
 * Sunday:    vehicle, shelter, army, science, hero, army
 * Monday:    shelter, science, vehicle, hero, army, vehicle
 * Tuesday:   science, hero, shelter, army, vehicle, shelter
 * Wednesday: hero, army, science, vehicle, shelter, science
 * Thursday:  army, vehicle, hero, shelter, science, hero
 * Friday:    vehicle, shelter, army, science, hero, army
 * Saturday:  science, vehicle, hero, shelter, army, hero
 */
const FULL_PREP_SCHEDULE: Record<number, number[]> = {
  0: [3, 4, 1, 0, 2, 1], // Sunday
  1: [4, 0, 3, 2, 1, 3], // Monday
  2: [0, 2, 4, 1, 3, 4], // Tuesday
  3: [2, 1, 0, 3, 4, 0], // Wednesday
  4: [1, 3, 2, 4, 0, 2], // Thursday
  5: [3, 4, 1, 0, 2, 1], // Friday
  6: [0, 3, 2, 4, 1, 2], // Saturday
};

/**
 * Get current Full Prep theme index from the day-specific schedule
 */
export function getCurrentFullPrepThemeIndex(
  date: Date = new Date()
): number {
  const apoc = toApocTime(date);
  const dayOfWeek = apoc.getUTCDay(); // 0=Sun, 1=Mon, ...
  const cycleIndex = getFullPrepCycleIndex(date);
  const schedule = FULL_PREP_SCHEDULE[dayOfWeek];
  return schedule[cycleIndex];
}
