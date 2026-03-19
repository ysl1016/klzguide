import eventsData from '@/data/events.json';
import type { EventData, DayRotation } from '@/types/event';

const data = eventsData as EventData;

export function getEventSchedule() {
  return data.schedule;
}

export function getSixDayRotation(): DayRotation[] {
  return data.schedule.sixDayRotation;
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
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const rotationIndex = (dayOfYear - 1) % 6;
  return data.schedule.sixDayRotation[rotationIndex];
}

export function getEventsLastUpdated(): string {
  return data.lastUpdated;
}
