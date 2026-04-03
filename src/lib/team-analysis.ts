import type { Hero } from '@/types/hero';

// --- Types ---

export interface FactionBonus {
  faction: string;
  heroCount: number;
  atkDefBonus: number;       // heroCount * 5 (%)
  capacityBonus: number;     // heroCount >= 5 ? 10 : 0 (%)
  isFull: boolean;           // 5명 모두 같은 진영
}

export interface SeasonSynergy {
  type: 's1_atkdef' | 's2_hp' | 's3_resistance' | 's4_counter';
  active: boolean;
  heroes: string[];          // 관련 영웅 IDs
  description: { ko: string; vi: string; en: string };
}

export interface HeroSynergyPair {
  hero1Id: string;
  hero2Id: string;
  hero1Name: { ko: string; vi: string; en: string };
  hero2Name: { ko: string; vi: string; en: string };
  mutual: boolean;
}

export interface CounterAnalysis {
  factionScores: {
    faction: string;
    score: number;          // -100 to +100
    label: 'strong' | 'weak' | 'neutral';
  }[];
  hasS4Adjustment: boolean;
}

export interface RoleBalance {
  tanks: number;
  dps: number;
  supports: number;
  gatherers: number;
  hasFrontlineTank: boolean;
  score: number;            // 0-100
}

export interface TeamAnalysis {
  factionBonuses: FactionBonus[];
  seasonSynergies: SeasonSynergy[];
  heroSynergies: HeroSynergyPair[];
  counterAnalysis: CounterAnalysis;
  roleBalance: RoleBalance;
  overallScore: number;
  warnings: { ko: string; vi: string; en: string }[];
  recommendations: { ko: string; vi: string; en: string }[];
}

// --- Counter map ---

const COUNTER_MAP: Record<string, { strong: string; weak: string }> = {
  wingsOfDawn: { strong: 'bloodRose', weak: 'guardOfOrder' },
  bloodRose: { strong: 'guardOfOrder', weak: 'wingsOfDawn' },
  guardOfOrder: { strong: 'wingsOfDawn', weak: 'bloodRose' },
};

// --- Analysis functions ---

function analyzeFactionBonuses(heroes: Hero[]): FactionBonus[] {
  const counts: Record<string, number> = {};
  heroes.forEach((h) => {
    counts[h.faction] = (counts[h.faction] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([faction, count]) => ({
      faction,
      heroCount: count,
      atkDefBonus: count * 5,
      capacityBonus: count >= 5 ? 10 : 0,
      isFull: count >= 5,
    }));
}

function analyzeSeasonSynergies(heroes: Hero[]): SeasonSynergy[] {
  const synergies: SeasonSynergy[] = [];
  const seasons = heroes.map((h) => h.season);
  const factionCounts: Record<string, number> = {};
  heroes.forEach((h) => {
    factionCounts[h.faction] = (factionCounts[h.faction] || 0) + 1;
  });

  // S1: 진영 영웅당 공방 +5%, 5명 시 정원 +10%
  const s1Heroes = heroes.filter((h) => h.season === 'S1');
  const hasS1 = s1Heroes.length > 0;
  synergies.push({
    type: 's1_atkdef',
    active: hasS1,
    heroes: s1Heroes.map((h) => h.id),
    description: {
      ko: '같은 진영 영웅당 공격력/방어력 +5%, 5명 시 정원 +10%',
      vi: 'ATK/DEF +5% mỗi anh hùng cùng phe, 5 người: sức chứa +10%',
      en: 'ATK/DEF +5% per same-faction hero, 5 heroes: capacity +10%',
    },
  });

  // S2: 같은 진영 5명 시 부대 HP +10%
  const s2Heroes = heroes.filter((h) => h.season === 'S2');
  const hasS2Full = s2Heroes.length > 0 && Object.values(factionCounts).some((c) => c >= 5);
  synergies.push({
    type: 's2_hp',
    active: hasS2Full,
    heroes: s2Heroes.map((h) => h.id),
    description: {
      ko: '같은 진영 5명 배치 시 부대 HP +10%',
      vi: 'HP quân +10% khi triển khai 5 anh hùng cùng phe',
      en: 'Troop HP +10% when deploying 5 same-faction heroes',
    },
  });

  // S3: S2 영웅과 배치 시 피해 저항 7.5%
  const s3Heroes = heroes.filter((h) => h.season === 'S3');
  const hasS3WithS2 = s3Heroes.length > 0 && s2Heroes.length > 0;
  synergies.push({
    type: 's3_resistance',
    active: hasS3WithS2,
    heroes: [...s3Heroes, ...s2Heroes].map((h) => h.id),
    description: {
      ko: 'S2 영웅과 함께 배치 시 피해 저항 7.5% 증가',
      vi: 'Kháng sát thương +7.5% khi triển khai cùng anh hùng S2',
      en: 'Damage resistance +7.5% when deployed with S2 heroes',
    },
  });

  // S4: 상성 유리 진영 데미지 +10%, 불리 진영 피해 -10%
  const s4Heroes = heroes.filter((h) => h.season === 'S4');
  synergies.push({
    type: 's4_counter',
    active: s4Heroes.length > 0,
    heroes: s4Heroes.map((h) => h.id),
    description: {
      ko: '상성 유리 진영 데미지 +10%, 불리 진영 피해 -10%',
      vi: 'Sát thương +10% cho phe có lợi, -10% sát thương nhận từ phe bất lợi',
      en: '+10% damage to countered factions, -10% damage from countering factions',
    },
  });

  return synergies;
}

function analyzeHeroSynergies(heroes: Hero[]): HeroSynergyPair[] {
  const pairs: HeroSynergyPair[] = [];
  const heroIds = new Set(heroes.map((h) => h.id));
  const seen = new Set<string>();

  for (const hero of heroes) {
    for (const synId of hero.synergies) {
      if (!heroIds.has(synId)) continue;
      const pairKey = [hero.id, synId].sort().join('-');
      if (seen.has(pairKey)) continue;
      seen.add(pairKey);

      const partner = heroes.find((h) => h.id === synId)!;
      const mutual = partner.synergies.includes(hero.id);

      pairs.push({
        hero1Id: hero.id,
        hero2Id: synId,
        hero1Name: hero.name,
        hero2Name: partner.name,
        mutual,
      });
    }
  }

  return pairs;
}

function analyzeCounters(heroes: Hero[]): CounterAnalysis {
  const factionCounts: Record<string, number> = {};
  heroes.forEach((h) => {
    factionCounts[h.faction] = (factionCounts[h.faction] || 0) + 1;
  });

  const hasS4 = heroes.some((h) => h.season === 'S4');
  const total = heroes.length || 1;

  const allFactions = ['bloodRose', 'wingsOfDawn', 'guardOfOrder'];
  const factionScores = allFactions.map((targetFaction) => {
    let score = 0;

    for (const [myFaction, count] of Object.entries(factionCounts)) {
      const counter = COUNTER_MAP[myFaction];
      if (!counter) continue;
      const weight = (count / total) * 100;

      if (counter.strong === targetFaction) {
        score += weight;
      } else if (counter.weak === targetFaction) {
        score -= weight;
      }
    }

    // S4 adjustment
    if (hasS4) {
      if (score > 0) score = Math.min(score + 10, 100);
      if (score < 0) score = Math.max(score - 10, -100);
    }

    return {
      faction: targetFaction,
      score: Math.round(score),
      label: (score > 15 ? 'strong' : score < -15 ? 'weak' : 'neutral') as 'strong' | 'weak' | 'neutral',
    };
  });

  return { factionScores, hasS4Adjustment: hasS4 };
}

function analyzeRoleBalance(heroes: Hero[], slots: (Hero | null)[]): RoleBalance {
  const tanks = heroes.filter((h) => h.role === 'tank').length;
  const dps = heroes.filter((h) => h.role === 'dps').length;
  const supports = heroes.filter((h) => h.role === 'support').length;
  const gatherers = heroes.filter((h) => h.role === 'gatherer').length;

  const frontRow = [slots[0], slots[1]];
  const hasFrontlineTank = frontRow.some((h) => h?.role === 'tank');

  // Score calculation
  let score = 50;

  // Ideal: 1 tank, 3 dps, 1 support or 1 tank, 4 dps
  if (tanks >= 1) score += 15;
  if (hasFrontlineTank) score += 15;
  if (dps >= 3) score += 10;
  if (tanks === 0 && heroes.length >= 3) score -= 20;
  if (gatherers > 0) score -= 10;
  if (supports > 2) score -= 10;
  if (tanks > 2) score -= 10;

  return {
    tanks,
    dps,
    supports,
    gatherers,
    hasFrontlineTank,
    score: Math.max(0, Math.min(100, score)),
  };
}

function generateWarnings(
  heroes: Hero[],
  slots: (Hero | null)[],
  factionBonuses: FactionBonus[],
  roleBalance: RoleBalance
): { ko: string; vi: string; en: string }[] {
  const warnings: { ko: string; vi: string; en: string }[] = [];

  // No tank in front row
  if (heroes.length >= 2 && !roleBalance.hasFrontlineTank) {
    warnings.push({
      ko: '전열에 탱크가 없습니다. 프론트라인에 탱크 역할 영웅을 배치하세요.',
      vi: 'Không có tank ở hàng trước. Hãy đặt anh hùng tank ở frontline.',
      en: 'No tank in the front row. Place a tank-role hero in the frontline.',
    });
  }

  // Mixed faction (3+)
  if (factionBonuses.length >= 3 && heroes.length >= 3) {
    warnings.push({
      ko: '3개 이상의 진영이 혼합되어 있습니다. 진영 보너스가 분산됩니다.',
      vi: 'Trộn 3+ phe. Bonus phe sẽ bị phân tán.',
      en: '3+ factions mixed. Faction bonuses are diluted.',
    });
  }

  // Chip warning for mixed factions
  if (factionBonuses.length >= 2 && heroes.length >= 3) {
    warnings.push({
      ko: '칩 비용 경고: 혼합 진영은 별도 칩 세트가 필요합니다 (S2+ 해금). 메인 진영을 일찍 결정하세요.',
      vi: 'Cảnh báo chip: Trộn phe cần bộ chip riêng (mở khóa S2+). Hãy quyết định phe chính sớm.',
      en: 'Chip cost warning: Mixed factions require separate chip sets (unlocked S2+). Decide your main faction early.',
    });
  }

  // No support
  if (heroes.length >= 4 && roleBalance.supports === 0 && roleBalance.tanks === 0) {
    warnings.push({
      ko: '서포트와 탱크가 모두 없습니다. 밸런스 있는 구성을 고려하세요.',
      vi: 'Không có support và tank. Hãy cân nhắc đội hình cân bằng hơn.',
      en: 'No support or tank heroes. Consider a more balanced composition.',
    });
  }

  // Gatherer in team
  if (roleBalance.gatherers > 0) {
    warnings.push({
      ko: '채집 영웅이 팀에 포함되어 있습니다. 전투에는 부적합합니다.',
      vi: 'Có anh hùng thu thập trong đội. Không phù hợp cho chiến đấu.',
      en: 'Gatherer hero in the team. Not suitable for combat.',
    });
  }

  return warnings;
}

function generateRecommendations(
  heroes: Hero[],
  factionBonuses: FactionBonus[],
  seasonSynergies: SeasonSynergy[],
  allHeroes: Hero[]
): { ko: string; vi: string; en: string }[] {
  const recs: { ko: string; vi: string; en: string }[] = [];
  const heroIds = new Set(heroes.map((h) => h.id));

  if (heroes.length < 5) {
    // Recommend filling with same faction
    const topFaction = factionBonuses[0];
    if (topFaction) {
      const remaining = 5 - heroes.length;
      const candidates = allHeroes
        .filter((h) => h.faction === topFaction.faction && !heroIds.has(h.id) && h.role !== 'gatherer')
        .sort((a, b) => {
          const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];
          return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
        })
        .slice(0, remaining);

      if (candidates.length > 0) {
        const names = {
          ko: candidates.map((c) => c.name.ko).join(', '),
          vi: candidates.map((c) => c.name.vi).join(', '),
          en: candidates.map((c) => c.name.en ?? c.name.ko).join(', '),
        };
        recs.push({
          ko: `순수 진영 완성을 위해 추천: ${names.ko}`,
          vi: `Đề xuất để hoàn thành phe thuần: ${names.vi}`,
          en: `Recommended to complete pure faction: ${names.en}`,
        });
      }
    }

    // Check synergy partners not in team
    const synergyPartners = new Set<string>();
    heroes.forEach((h) => {
      h.synergies.forEach((sId) => {
        if (!heroIds.has(sId)) synergyPartners.add(sId);
      });
    });

    if (synergyPartners.size > 0) {
      const topPartners = Array.from(synergyPartners)
        .map((id) => allHeroes.find((h) => h.id === id))
        .filter((h): h is Hero => h !== undefined && h.role !== 'gatherer')
        .sort((a, b) => {
          const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C'];
          return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
        })
        .slice(0, 3);

      if (topPartners.length > 0) {
        recs.push({
          ko: `시너지 파트너: ${topPartners.map((p) => p.name.ko).join(', ')}`,
          vi: `Đối tác synergy: ${topPartners.map((p) => p.name.vi).join(', ')}`,
          en: `Synergy partners: ${topPartners.map((p) => p.name.en ?? p.name.ko).join(', ')}`,
        });
      }
    }
  }

  // S3+S2 recommendation
  const s3Synergy = seasonSynergies.find((s) => s.type === 's3_resistance');
  if (s3Synergy && !s3Synergy.active) {
    const hasS3 = heroes.some((h) => h.season === 'S3');
    const hasS2 = heroes.some((h) => h.season === 'S2');
    if (hasS3 && !hasS2) {
      recs.push({
        ko: 'S2 영웅을 추가하면 피해 저항 7.5% 시너지가 활성화됩니다.',
        vi: 'Thêm anh hùng S2 để kích hoạt kháng sát thương 7.5%.',
        en: 'Adding an S2 hero activates the 7.5% damage resistance synergy.',
      });
    } else if (!hasS3 && hasS2) {
      recs.push({
        ko: 'S3 영웅을 추가하면 피해 저항 7.5% 시너지가 활성화됩니다.',
        vi: 'Thêm anh hùng S3 để kích hoạt kháng sát thương 7.5%.',
        en: 'Adding an S3 hero activates the 7.5% damage resistance synergy.',
      });
    }
  }

  return recs;
}

function calculateOverallScore(
  factionBonuses: FactionBonus[],
  seasonSynergies: SeasonSynergy[],
  heroSynergies: HeroSynergyPair[],
  counterAnalysis: CounterAnalysis,
  roleBalance: RoleBalance,
  heroCount: number
): number {
  if (heroCount === 0) return 0;

  // Synergy score (40%)
  let synergyScore = 0;
  // Faction concentration bonus
  const topFaction = factionBonuses[0];
  if (topFaction) {
    synergyScore += (topFaction.heroCount / heroCount) * 40;
    if (topFaction.isFull) synergyScore += 20;
  }
  // Season synergies
  const activeSeason = seasonSynergies.filter((s) => s.active).length;
  synergyScore += activeSeason * 10;
  // Hero synergies
  synergyScore += Math.min(heroSynergies.length * 5, 20);
  synergyScore = Math.min(synergyScore, 100);

  // Counter score (25%)
  const avgPositiveCounter = counterAnalysis.factionScores
    .filter((f) => f.score > 0)
    .reduce((sum, f) => sum + f.score, 0);
  const avgNegativeCounter = counterAnalysis.factionScores
    .filter((f) => f.score < 0)
    .reduce((sum, f) => sum + Math.abs(f.score), 0);
  const counterScore = Math.min(50 + avgPositiveCounter - avgNegativeCounter * 0.5, 100);

  // Role balance score (20%)
  const roleScore = roleBalance.score;

  // Bonus score (15%) - based on faction purity
  let bonusScore = 0;
  if (factionBonuses.length === 1) bonusScore = 100;
  else if (factionBonuses.length === 2) bonusScore = 60;
  else bonusScore = 20;

  const overall = Math.round(
    synergyScore * 0.4 + counterScore * 0.25 + roleScore * 0.2 + bonusScore * 0.15
  );

  return Math.max(0, Math.min(100, overall));
}

// --- Main export ---

export function analyzeTeam(slots: (Hero | null)[], allHeroes: Hero[]): TeamAnalysis {
  const heroes = slots.filter(Boolean) as Hero[];

  const factionBonuses = analyzeFactionBonuses(heroes);
  const seasonSynergies = analyzeSeasonSynergies(heroes);
  const heroSynergies = analyzeHeroSynergies(heroes);
  const counterAnalysis = analyzeCounters(heroes);
  const roleBalance = analyzeRoleBalance(heroes, slots);
  const warnings = generateWarnings(heroes, slots, factionBonuses, roleBalance);
  const recommendations = generateRecommendations(heroes, factionBonuses, seasonSynergies, allHeroes);
  const overallScore = calculateOverallScore(
    factionBonuses,
    seasonSynergies,
    heroSynergies,
    counterAnalysis,
    roleBalance,
    heroes.length
  );

  return {
    factionBonuses,
    seasonSynergies,
    heroSynergies,
    counterAnalysis,
    roleBalance,
    overallScore,
    warnings,
    recommendations,
  };
}

// --- Saved Teams ---

export interface SavedTeam {
  name: string;
  heroIds: string[];
  createdAt: number;
}

const STORAGE_KEY = 'klzguide-saved-teams';
const MAX_SAVED_TEAMS = 5;

export function getSavedTeams(): SavedTeam[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTeam(name: string, heroIds: string[]): SavedTeam[] {
  const teams = getSavedTeams();
  const newTeam: SavedTeam = { name, heroIds, createdAt: Date.now() };
  const updated = [newTeam, ...teams.filter((t) => t.name !== name)].slice(0, MAX_SAVED_TEAMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteSavedTeam(name: string): SavedTeam[] {
  const teams = getSavedTeams().filter((t) => t.name !== name);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  return teams;
}
