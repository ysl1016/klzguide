export interface LocalizedString {
  ko: string;
  vi: string;
}

export interface HeroSkill {
  name: LocalizedString;
  type: 'normal' | 'active' | 'deployment' | 'potential';
  description: LocalizedString;
}

export interface Hero {
  id: string;
  name: { ko: string; vi: string; en: string };
  class: 'assaulter' | 'shooter' | 'rider';
  faction: 'bloodRose' | 'wingsOfDawn' | 'guardOfOrder';
  tier: string;
  rarity: 'legendary' | 'epic' | 'rare';
  season: string | null;
  role: 'tank' | 'dps' | 'support' | 'gatherer';
  recommended: boolean;
  pvpTier: string;
  pveTier: string;
  notes: LocalizedString;
  skills: HeroSkill[];
  synergies: string[];
  investmentPriority: number;
  f2pFriendly: boolean;
  obtainMethod: LocalizedString;
}

export interface HeroData {
  heroes: Hero[];
  tiers: string[];
  classes: string[];
  factions: string[];
  roles: string[];
  rarities: string[];
  meta: {
    lastUpdated: string;
    notes: LocalizedString;
    formationTip: LocalizedString;
  };
}

export type HeroClass = Hero['class'];
export type HeroFaction = Hero['faction'];
export type HeroRole = Hero['role'];
