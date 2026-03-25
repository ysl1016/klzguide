import type { LocalizedString } from './hero';

export interface RedeemCode {
  code: string;
  rewards: LocalizedString;
  expiry: string | null;
  limitType: 'time' | 'quantity' | 'both' | 'unknown';
  isNew: boolean;
  isActive: boolean;
}

export interface RedeemCodeData {
  codes: RedeemCode[];
  lastUpdated: string;
}

export interface ChangelogEntry {
  date: string;
  entries: LocalizedString[];
  isRecent?: boolean;
}

export interface Formation {
  id: string;
  name: LocalizedString;
  type: 'attack' | 'defense' | 'rally';
  heroes: string[];
  description: LocalizedString;
  strengths: LocalizedString[];
  weaknesses: LocalizedString[];
}

export interface FormationData {
  counterSystem: {
    description: LocalizedString;
    counters: { attacker: string; defender: string; advantage: LocalizedString }[];
  };
  recommendedFormations: Formation[];
}
