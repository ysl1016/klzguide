import type { LocalizedString } from './hero';

export interface DayRotation {
  day: number;
  theme: string;
  name: LocalizedString;
  description: LocalizedString;
  primaryRewards: LocalizedString;
}

export interface FullPrepTheme {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
}

export interface RestDay {
  name: LocalizedString;
  description: LocalizedString;
}

export interface EventSchedule {
  restDay: RestDay;
  sixDayRotation: DayRotation[];
  fullPrepThemes: FullPrepTheme[];
  canyonClash: {
    timeline: { day: string; phase: LocalizedString }[];
  };
  hotEventRotation: string[];
}

export interface EventData {
  schedule: EventSchedule;
  lastUpdated: string;
}
