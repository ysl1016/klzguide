import heroesData from '@/data/heroes.json';
import type { Hero, HeroData } from '@/types/hero';

const data = heroesData as HeroData;

export function getAllHeroes(): Hero[] {
  return data.heroes;
}

export function getHeroById(id: string): Hero | undefined {
  return data.heroes.find((h) => h.id === id);
}

export function getHeroesByFaction(faction: string): Hero[] {
  return data.heroes.filter((h) => h.faction === faction);
}

export function getHeroesByTier(tier: string): Hero[] {
  return data.heroes.filter((h) => h.tier === tier);
}

export function getHeroesByClass(cls: string): Hero[] {
  return data.heroes.filter((h) => h.class === cls);
}

export function getRecommendedHeroes(): Hero[] {
  return data.heroes.filter((h) => h.recommended);
}

export function getTopTierHeroes(): Hero[] {
  return data.heroes.filter((h) => h.tier === 'S+' || h.tier === 'S');
}

export function getHeroSynergies(heroId: string): Hero[] {
  const hero = getHeroById(heroId);
  if (!hero) return [];
  return hero.synergies
    .map((id) => getHeroById(id))
    .filter((h): h is Hero => h !== undefined);
}

export function getAllHeroIds(): string[] {
  return data.heroes.map((h) => h.id);
}

export function getHeroMeta() {
  return data.meta;
}

export function getTiers() {
  return data.tiers;
}

export function getFactions() {
  return data.factions;
}

export function getClasses() {
  return data.classes;
}
