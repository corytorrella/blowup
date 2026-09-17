import {
  CATEGORIES,
  COMPLAINT_TEMPLATES,
  FLASHPOINT_DEFS,
  HANDLE_PREFIXES,
  HANDLE_NOUNS,
  SQUAD_NAMES,
  TORCH_DEFS,
  BODY_CLOSERS,
  RECEIPT_LABELS,
  COMMENT_LINES,
  COMPANY_REPLY_LINES,
} from "./content-banks";
import { seededRandom, pick, range } from "./rng";
import { slugify } from "./slug";
import { tierForBlowupHeat, tierForBurnRatio, tierForClout } from "./tiers";
import type {
  Company,
  Blowup,
  BlowupComment,
  Flashpoint,
  CategoryHall,
  Handle,
  Squad,
  DropEntry,
  HeatSample,
  Receipt,
  HeatTier,
  ContentFormat,
} from "./types";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.now();

function daysAgoIso(n: number): string {
  return new Date(NOW - n * DAY).toISOString();
}

function ageDaysFromIso(iso: string): number {
  return Math.max(0, Math.floor((NOW - new Date(iso).getTime()) / DAY));
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const HALL_OF_FLAME_NAMES = new Set([
  "Northwing Airlines",
  "Ironclad Bank",
  "Circuit Telecom",
  "Shieldpoint Mutual",
  "Loopcast",
  "CartCo",
  "Hoplin",
  "Ashcroft Power",
]);

// ---------------------------------------------------------------------------
// Handles
// ---------------------------------------------------------------------------

function buildHandleNames(count: number): string[] {
  const rand = seededRandom("handle-pool-v1");
  const used = new Set<string>();
  const names: string[] = [];
  let guard = 0;
  while (names.length < count && guard < 4000) {
    guard++;
    const prefix = pick(rand, HANDLE_PREFIXES);
    const noun = pick(rand, HANDLE_NOUNS);
    const withNumber = rand() > 0.4;
    const handle = `${prefix}${noun}${withNumber ? range(rand, 2, 97) : ""}`;
    if (used.has(handle)) continue;
    used.add(handle);
    names.push(handle);
  }
  return names;
}

const CLOUT_WEIGHTS: { max: number; weight: number }[] = [
  { max: 80, weight: 0.34 },
  { max: 800, weight: 0.3 },
  { max: 6000, weight: 0.2 },
  { max: 40000, weight: 0.12 },
  { max: 220000, weight: 0.04 },
];

function rollClout(rand: () => number): number {
  const r = rand();
  let cumulative = 0;
  for (const bucket of CLOUT_WEIGHTS) {
    cumulative += bucket.weight;
    if (r <= cumulative) {
      const min = CLOUT_WEIGHTS[CLOUT_WEIGHTS.indexOf(bucket) - 1]?.max ?? 0;
      return range(rand, min, bucket.max);
    }
  }
  return range(rand, 0, 80);
}

function buildHandles(): Handle[] {
  const names = buildHandleNames(54);
  return names.map((handle) => {
    const rand = seededRandom(`handle-${handle}`);
    const clout = rollClout(rand);
    const tier = tierForClout(clout);
    const tierStreakFloor: Record<string, number> = {
      ember: 0,
      flare: 0,
      wildfire: 2,
      firestorm: 5,
      legend: 10,
    };
    const streak = range(rand, tierStreakFloor[tier] ?? 0, tier === "legend" ? 180 : tier === "firestorm" ? 90 : 40);
    const joinedAt = daysAgoIso(range(rand, 20, 700));
    return {
      handle,
      clout,
      tier,
      torchIds: [],
      streak,
      squadSlug: undefined,
      joinedAt,
      blowupIds: [],
      bio: "",
    };
  });
}

function assignTorches(handles: Handle[]) {
  for (const h of handles) {
    const rand = seededRandom(`torches-${h.handle}`);
    const countByTier: Record<string, [number, number]> = {
      ember: [0, 1],
      flare: [0, 2],
      wildfire: [1, 3],
      firestorm: [2, 5],
      legend: [3, 8],
    };
    const [min, max] = countByTier[h.tier] ?? [0, 1];
    const count = range(rand, min, max);
    const shuffled = [...TORCH_DEFS].sort(() => rand() - 0.5);
    h.torchIds = shuffled.slice(0, count).map((t) => t.id);
  }
}

// ---------------------------------------------------------------------------
// Squads
// ---------------------------------------------------------------------------

function buildSquads(handles: Handle[]): Squad[] {
  const rand = seededRandom("squads-v1");
  const shuffledHandles = [...handles].sort(() => rand() - 0.5);
  let cursor = 0;
  const squads: Squad[] = SQUAD_NAMES.map((name, i) => {
    const size = range(rand, 4, 7);
    const members = shuffledHandles.slice(cursor, cursor + size);
    cursor += size;
    for (const m of members) m.squadSlug = slugify(name);
    const clout = members.reduce((s, m) => s + m.clout, 0);
    return {
      slug: slugify(name),
      name,
      clout,
      memberHandles: members.map((m) => m.handle),
      torchIds: [],
      isPublic: rand() > 0.35,
      rank: 0,
      banner: ["stripe", "chevron", "hazard", "blast"][i % 4],
    };
  });
  squads.sort((a, b) => b.clout - a.clout);
  squads.forEach((s, i) => (s.rank = i + 1));
  for (const s of squads) {
    const r2 = seededRandom(`squad-torches-${s.slug}`);
    const shuffled = [...TORCH_DEFS].sort(() => r2() - 0.5);
    s.torchIds = shuffled.slice(0, range(r2, 1, 4)).map((t) => t.id);
  }
  return squads;
}

// ---------------------------------------------------------------------------
// Companies (base) + Blowups
// ---------------------------------------------------------------------------

interface CompanySeed {
  name: string;
  slug: string;
  categorySlug: string;
}

function buildCompanySeeds(): CompanySeed[] {
  return CATEGORIES.flatMap((cat) =>
    cat.companies.map((name) => ({ name, slug: slugify(name), categorySlug: cat.slug }))
  );
}

function weightedTierHeat(rand: () => number): number {
  const r = rand();
  if (r < 0.35) return range(rand, 1, 24);
  if (r < 0.65) return range(rand, 25, 249);
  if (r < 0.87) return range(rand, 250, 2499);
  return range(rand, 2500, 19999);
}

function ageDaysForTier(rand: () => number, tier: HeatTier): number {
  switch (tier) {
    case "spark":
      return range(rand, 0, 3);
    case "simmering":
      return range(rand, 1, 14);
    case "trending":
      return range(rand, 6, 40);
    case "viral":
      return range(rand, 20, 100);
    default:
      return range(rand, 30, 260);
  }
}

function buildReceipts(rand: () => number, count: number): Receipt[] {
  const shuffled = [...RECEIPT_LABELS].sort(() => rand() - 0.5);
  return shuffled.slice(0, count).map((label) => ({
    label,
    kind: label.endsWith(".PDF") ? "doc" : ("image" as const),
  }));
}

function buildBlowupsForCompany(seed: CompanySeed, isHallOfFlame: boolean): Blowup[] {
  const templates = COMPLAINT_TEMPLATES[seed.categorySlug] ?? [];
  const blowups: Blowup[] = [];

  templates.forEach((tmpl, i) => {
    const rand = seededRandom(`blowup-${seed.slug}-${i}`);
    const heat = weightedTierHeat(rand);
    const tier = tierForBlowupHeat(heat, false);
    const age = ageDaysForTier(rand, tier);
    const formats: ContentFormat[] = [tmpl.format];
    if (rand() > 0.72) formats.push("receipts");
    const receiptCount = formats.includes("receipts") ? range(rand, 1, 4) : 0;
    blowups.push({
      id: `${seed.slug}-${i + 1}`,
      companySlug: seed.slug,
      authorHandle: "",
      createdAt: daysAgoIso(age),
      formats,
      title: capitalize(tmpl.text),
      body: `${seed.name} ${tmpl.text}. ${pick(rand, BODY_CLOSERS)}`,
      heat,
      tier,
      isNuclearRecord: false,
      flashpointSlugs: tmpl.flashpoints,
      receipts: buildReceipts(rand, receiptCount),
      durationSeconds:
        tmpl.format === "video" ? range(rand, 14, 90) : tmpl.format === "voice" ? range(rand, 8, 140) : undefined,
      commentCount: Math.round(heat * (0.015 + rand() * 0.03)),
      pledgeAdd: Math.round(heat * (0.008 + rand() * 0.018)),
    });
  });

  if (isHallOfFlame && templates.length > 0) {
    const rand = seededRandom(`blowup-${seed.slug}-nuclear`);
    const tmpl = pick(rand, templates);
    const heat = range(rand, 32000, 146000);
    const age = ageDaysForTier(rand, "nuclear" as HeatTier);
    const formats: ContentFormat[] = [tmpl.format, "receipts"];
    blowups.push({
      id: `${seed.slug}-nuclear`,
      companySlug: seed.slug,
      authorHandle: "",
      createdAt: daysAgoIso(age),
      formats,
      title: capitalize(tmpl.text),
      body: `${seed.name} ${tmpl.text}. This is the post that finally broke the record. ${pick(rand, BODY_CLOSERS)}`,
      heat,
      tier: "nuclear",
      isNuclearRecord: true,
      flashpointSlugs: tmpl.flashpoints,
      receipts: buildReceipts(rand, range(rand, 2, 4)),
      durationSeconds: tmpl.format === "video" ? range(rand, 20, 90) : tmpl.format === "voice" ? range(rand, 10, 140) : undefined,
      commentCount: Math.round(heat * (0.02 + rand() * 0.02)),
      pledgeAdd: Math.round(heat * (0.02 + rand() * 0.02)),
    });
  }

  return blowups;
}

function assignAuthors(blowups: Blowup[], handles: Handle[]) {
  const rand = seededRandom("author-assignment-v1");
  const pool: string[] = [];
  for (const h of handles) {
    const weight = Math.min(25, 1 + Math.floor(h.clout / 1500));
    for (let i = 0; i < weight; i++) pool.push(h.handle);
  }
  const byHandle = new Map(handles.map((h) => [h.handle, h] as const));
  for (const b of blowups) {
    const author = pick(rand, pool);
    b.authorHandle = author;
    byHandle.get(author)?.blowupIds.push(b.id);
  }
}

function finalizeHandleBios(handles: Handle[]) {
  for (const h of handles) {
    h.bio = `${h.blowupIds.length} Blowup${h.blowupIds.length === 1 ? "" : "s"} filed. ${h.clout.toLocaleString()} Clout earned the hard way.`;
  }
}

// ---------------------------------------------------------------------------
// Heat history (for Burn Site graphs)
// ---------------------------------------------------------------------------

function buildHeatHistory(seed: CompanySeed, burnRatio: number, points = 26): HeatSample[] {
  const rand = seededRandom(`history-${seed.slug}`);
  const raw: number[] = [];
  let acc = 0;
  for (let i = 0; i < points; i++) {
    const step = Math.max(0, rand() * rand());
    acc += step;
    raw.push(acc);
  }
  const scale = burnRatio / (raw[raw.length - 1] || 1);
  const history: HeatSample[] = raw.map((v, i) => {
    const daysBack = (points - 1 - i) * 7;
    return { date: daysAgoIso(daysBack), heat: Math.round(v * scale) };
  });
  history[history.length - 1].heat = Math.round(burnRatio);
  return history;
}

// ---------------------------------------------------------------------------
// Assemble everything (module-level, computed once)
// ---------------------------------------------------------------------------

export const handles = buildHandles();
const squadsBase = buildSquads(handles);
assignTorches(handles);

const companySeeds = buildCompanySeeds();
const allBlowups: Blowup[] = companySeeds.flatMap((seed) =>
  buildBlowupsForCompany(seed, HALL_OF_FLAME_NAMES.has(seed.name))
);
assignAuthors(allBlowups, handles);
finalizeHandleBios(handles);

const blowupsByCompany = new Map<string, Blowup[]>();
for (const b of allBlowups) {
  const list = blowupsByCompany.get(b.companySlug) ?? [];
  list.push(b);
  blowupsByCompany.set(b.companySlug, list);
}

const companiesUnranked: Company[] = companySeeds.map((seed) => {
  const blowups = blowupsByCompany.get(seed.slug) ?? [];
  const burnRatio = blowups.reduce((s, b) => s + b.heat, 0);
  const isHallOfFlame = HALL_OF_FLAME_NAMES.has(seed.name);
  const nuclearBlowup = blowups.find((b) => b.isNuclearRecord);
  const pledgeCount =
    blowups.reduce((s, b) => s + b.pledgeAdd, 0) +
    Math.round(burnRatio * 0.003);
  const firstBlowupAt = blowups.reduce(
    (earliest, b) => (b.createdAt < earliest ? b.createdAt : earliest),
    blowups[0]?.createdAt ?? daysAgoIso(30)
  );
  const cat = CATEGORIES.find((c) => c.slug === seed.categorySlug)!;
  return {
    slug: seed.slug,
    name: seed.name,
    categorySlug: seed.categorySlug,
    burnRatio,
    tier: tierForBurnRatio(burnRatio, isHallOfFlame),
    hallOfFlame: isHallOfFlame,
    nuclearAt: nuclearBlowup?.createdAt,
    firstBlowupAt,
    pledgeCount,
    rank: 0,
    rankLastWeek: 0,
    heatHistory: buildHeatHistory(seed, burnRatio),
    blurb: `${seed.name} — filed under ${cat.name}.`,
  };
});

companiesUnranked.sort((a, b) => b.burnRatio - a.burnRatio);
companiesUnranked.forEach((c, i) => (c.rank = i + 1));
for (const c of companiesUnranked) {
  const rand = seededRandom(`rank-shift-${c.slug}`);
  const shift = range(rand, -3, 3);
  c.rankLastWeek = Math.min(companiesUnranked.length, Math.max(1, c.rank + shift));
}

export const companies: Company[] = companiesUnranked;
export const blowups: Blowup[] = allBlowups;

export const categoryHalls: CategoryHall[] = CATEGORIES.map((cat) => ({
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  companySlugs: companies.filter((c) => c.categorySlug === cat.slug).map((c) => c.slug),
}));

export const flashpoints: Flashpoint[] = FLASHPOINT_DEFS.map((def) => {
  const byCompany = new Map<string, number>();
  let earliest = Infinity;
  for (const b of allBlowups) {
    if (!b.flashpointSlugs.includes(def.slug)) continue;
    byCompany.set(b.companySlug, (byCompany.get(b.companySlug) ?? 0) + b.heat);
    earliest = Math.min(earliest, new Date(b.createdAt).getTime());
  }
  const companiesRanked = [...byCompany.entries()]
    .map(([companySlug, heat]) => ({ companySlug, heat }))
    .sort((a, b) => b.heat - a.heat);
  const totalHeat = companiesRanked.reduce((s, c) => s + c.heat, 0);
  return {
    slug: def.slug,
    name: def.name,
    description: def.description,
    createdAt: Number.isFinite(earliest) ? new Date(earliest).toISOString() : daysAgoIso(30),
    companies: companiesRanked,
    totalHeat,
  };
}).sort((a, b) => b.totalHeat - a.totalHeat);

export const squads: Squad[] = squadsBase;
export const torches = TORCH_DEFS;

export function companyDisplayAuthor(companySlug: string): string {
  const c = companies.find((co) => co.slug === companySlug);
  return c ? `${c.name} (Official)` : "Company";
}

function buildComments(): BlowupComment[] {
  const handleNames = handles.map((h) => h.handle);
  const comments: BlowupComment[] = [];
  for (const b of allBlowups) {
    const rand = seededRandom(`comments-${b.id}`);
    const n = Math.min(6, Math.max(b.tier === "spark" ? 0 : 1, Math.round(b.heat / 500)));
    const ageOfPost = ageDaysFromIso(b.createdAt);
    for (let i = 0; i < n; i++) {
      const isCompanyReply = i === n - 1 && rand() < 0.22 && b.heat > 200;
      comments.push({
        id: `${b.id}-c${i + 1}`,
        blowupId: b.id,
        authorHandle: isCompanyReply ? companyDisplayAuthor(b.companySlug) : pick(rand, handleNames),
        isCompany: isCompanyReply,
        body: isCompanyReply ? pick(rand, COMPANY_REPLY_LINES) : pick(rand, COMMENT_LINES),
        createdAt: daysAgoIso(range(rand, 0, ageOfPost)),
      });
    }
  }
  return comments;
}

export const comments: BlowupComment[] = buildComments();

// ---------------------------------------------------------------------------
// The Drop (weekly)
// ---------------------------------------------------------------------------

function mostRecentDropTimestamp(base: number): number {
  const d = new Date(base);
  const day = d.getUTCDay();
  const diffToMonday = (day + 6) % 7;
  d.setUTCDate(d.getUTCDate() - diffToMonday);
  d.setUTCHours(12, 0, 0, 0);
  if (d.getTime() > base) d.setUTCDate(d.getUTCDate() - 7);
  return d.getTime();
}

export function getNextDropTimestamp(): number {
  const last = mostRecentDropTimestamp(NOW);
  return last + 7 * DAY;
}

function buildDrops(weeks = 10): DropEntry[] {
  const latest = mostRecentDropTimestamp(NOW);
  const topSlugs = companies.slice(0, 14).map((c) => c.slug);
  const entries: DropEntry[] = [];
  for (let w = 0; w < weeks; w++) {
    const date = new Date(latest - w * 7 * DAY).toISOString();
    const rand = seededRandom(`drop-${date}`);
    const shuffled = [...topSlugs];
    const swaps = w === 0 ? 0 : Math.min(6, 1 + Math.floor(w * 1.4));
    for (let s = 0; s < swaps; s++) {
      const i = range(rand, 0, shuffled.length - 2);
      [shuffled[i], shuffled[i + 1]] = [shuffled[i + 1], shuffled[i]];
    }
    const burnList = shuffled.slice(0, 10);
    entries.push({
      date,
      burnList,
      biggestMover: {
        companySlug: pick(rand, burnList),
        delta: range(rand, 3, 11),
      },
      flashpointOfWeek: pick(rand, FLASHPOINT_DEFS).slug,
    });
  }
  return entries;
}

export const drops: DropEntry[] = buildDrops();

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getBlowup(id: string): Blowup | undefined {
  return allBlowups.find((b) => b.id === id);
}

export function getBlowupsForCompany(slug: string): Blowup[] {
  return (blowupsByCompany.get(slug) ?? []).slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getCommentsForBlowup(id: string): BlowupComment[] {
  return comments.filter((c) => c.blowupId === id).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getFlashpoint(slug: string): Flashpoint | undefined {
  return flashpoints.find((f) => f.slug === slug);
}

export function getCategory(slug: string): CategoryHall | undefined {
  return categoryHalls.find((c) => c.slug === slug);
}

export function getHandle(handle: string): Handle | undefined {
  return handles.find((h) => h.handle.toLowerCase() === handle.toLowerCase());
}

export function getSquad(slug: string): Squad | undefined {
  return squads.find((s) => s.slug === slug);
}

export function getTorch(id: string) {
  return torches.find((t) => t.id === id);
}

export function topCompanies(n: number): Company[] {
  return companies.slice(0, n);
}

export function recentBlowups(n: number): Blowup[] {
  return [...allBlowups].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, n);
}

export function topInstigators(n: number): Handle[] {
  return [...handles].sort((a, b) => b.clout - a.clout).slice(0, n);
}

export function hallOfFlameCompanies(): Company[] {
  return companies
    .filter((c) => c.hallOfFlame)
    .sort((a, b) => new Date(b.nuclearAt ?? 0).getTime() - new Date(a.nuclearAt ?? 0).getTime());
}

export function blowupOfTheYear(): Blowup {
  return [...allBlowups].sort((a, b) => b.heat - a.heat)[0];
}

export function allTimeAftermath(): Blowup[] {
  return [...allBlowups].sort((a, b) => b.heat - a.heat);
}

export const heatIndexTotal = companies.reduce((s, c) => s + c.burnRatio, 0);
export const heatIndex24h = allBlowups
  .filter((b) => ageDaysFromIso(b.createdAt) < 1)
  .reduce((s, b) => s + b.heat, 0) + Math.round(heatIndexTotal * 0.004);
export const totalHandles = handles.length;
export const totalPledges = companies.reduce((s, c) => s + c.pledgeCount, 0);
export const totalFlashpoints = flashpoints.length;
export const totalActiveBurnSites = companies.length;

export const CURRENT_USER_HANDLE = handles.slice().sort((a, b) => b.clout - a.clout)[3]?.handle ?? handles[0].handle;
