import eventsData from '@/data/events.json';
import type { EventData, DayRotation } from '@/types/event';
import { getRotationDay } from '@/lib/game-time';

const data = eventsData as EventData;

export function getEventSchedule() {
  return data.schedule;
}

export function getSixDayRotation(): DayRotation[] {
  return data.schedule.sixDayRotation;
}

export function getRestDay() {
  return data.schedule.restDay;
}

export function getFullPrepThemes() {
  return data.schedule.fullPrepThemes;
}

export function getCanyonClashTimeline() {
  return data.schedule.canyonClash.timeline;
}

export function getHotEventRotation(): string[] {
  return data.schedule.hotEventRotation;
}

export function getTodayRotation(): DayRotation | undefined {
  const day = getRotationDay();
  return data.schedule.sixDayRotation[day - 1];
}

export function getEventsLastUpdated(): string {
  return data.lastUpdated;
}
