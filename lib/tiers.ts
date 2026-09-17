import type { HeatTier, InstigatorTier } from "./types";

export const HEAT_TIER_ORDER: HeatTier[] = [
  "spark",
  "simmering",
  "trending",
  "viral",
  "blown-up",
  "nuclear",
];

export const HEAT_TIER_LABEL: Record<HeatTier, string> = {
  spark: "Lit Fuse",
  simmering: "Getting Cooked",
  trending: "Trending",
  viral: "Viral",
  "blown-up": "Blowing Up",
  nuclear: "Nuclear",
};

export const HEAT_TIER_THRESHOLD: Record<Exclude<HeatTier, "nuclear">, number> = {
  spark: 0,
  simmering: 25,
  trending: 250,
  viral: 2500,
  "blown-up": 25000,
};

export function tierForBlowupHeat(heat: number, isNuclearRecord: boolean): HeatTier {
  if (isNuclearRecord) return "nuclear";
  if (heat >= HEAT_TIER_THRESHOLD["blown-up"]) return "blown-up";
  if (heat >= HEAT_TIER_THRESHOLD.viral) return "viral";
  if (heat >= HEAT_TIER_THRESHOLD.trending) return "trending";
  if (heat >= HEAT_TIER_THRESHOLD.simmering) return "simmering";
  return "spark";
}

export function nextTierInfo(tier: HeatTier): { next: HeatTier | null; threshold: number | null } {
  const idx = HEAT_TIER_ORDER.indexOf(tier);
  if (idx === -1 || idx >= HEAT_TIER_ORDER.length - 1) return { next: null, threshold: null };
  const next = HEAT_TIER_ORDER[idx + 1];
  const threshold = next === "nuclear" ? null : HEAT_TIER_THRESHOLD[next];
  return { next, threshold };
}

export const COMPANY_TIER_THRESHOLD: Record<Exclude<HeatTier, "nuclear">, number> = {
  spark: 0,
  simmering: 2000,
  trending: 15000,
  viral: 80000,
  "blown-up": 300000,
};

export function tierForBurnRatio(burnRatio: number, hallOfFlame: boolean): HeatTier {
  if (hallOfFlame) return "nuclear";
  if (burnRatio >= COMPANY_TIER_THRESHOLD["blown-up"]) return "blown-up";
  if (burnRatio >= COMPANY_TIER_THRESHOLD.viral) return "viral";
  if (burnRatio >= COMPANY_TIER_THRESHOLD.trending) return "trending";
  if (burnRatio >= COMPANY_TIER_THRESHOLD.simmering) return "simmering";
  return "spark";
}

export const INSTIGATOR_TIER_ORDER: InstigatorTier[] = [
  "ember",
  "flare",
  "wildfire",
  "firestorm",
  "legend",
];

export const INSTIGATOR_TIER_LABEL: Record<InstigatorTier, string> = {
  ember: "Flamethrower Technician",
  flare: "Certified Burn Inspector",
  wildfire: "Director of Demolition",
  firestorm: "Chief Combustion Officer",
  legend: "Nuclear Vibes Engineer",
};

export const INSTIGATOR_TIER_THRESHOLD: Record<InstigatorTier, number> = {
  ember: 0,
  flare: 100,
  wildfire: 1000,
  firestorm: 10000,
  legend: 100000,
};

export function tierForClout(clout: number): InstigatorTier {
  if (clout >= INSTIGATOR_TIER_THRESHOLD.legend) return "legend";
  if (clout >= INSTIGATOR_TIER_THRESHOLD.firestorm) return "firestorm";
  if (clout >= INSTIGATOR_TIER_THRESHOLD.wildfire) return "wildfire";
  if (clout >= INSTIGATOR_TIER_THRESHOLD.flare) return "flare";
  return "ember";
}

/** 0..1 intensity used to scale the Blast Mark and similar heat-driven visuals. */
export function heatIntensity(burnRatio: number): number {
  const max = COMPANY_TIER_THRESHOLD["blown-up"] * 1.6;
  return Math.max(0.06, Math.min(1, burnRatio / max));
}
