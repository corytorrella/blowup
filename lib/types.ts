export type HeatTier =
  | "spark"
  | "simmering"
  | "trending"
  | "viral"
  | "blown-up"
  | "nuclear";

export type InstigatorTier = "ember" | "flare" | "wildfire" | "firestorm" | "legend";

export type ContentFormat = "video" | "receipts" | "voice" | "quick-take";

export interface HeatSample {
  date: string;
  heat: number;
}

export interface Company {
  slug: string;
  name: string;
  categorySlug: string;
  burnRatio: number;
  tier: HeatTier;
  hallOfFlame: boolean;
  nuclearAt?: string;
  firstBlowupAt: string;
  pledgeCount: number;
  rank: number;
  rankLastWeek: number;
  heatHistory: HeatSample[];
  blurb: string;
}

export interface Receipt {
  label: string;
  kind: "image" | "doc";
}

export interface Blowup {
  id: string;
  companySlug: string;
  authorHandle: string;
  createdAt: string;
  formats: ContentFormat[];
  title: string;
  body: string;
  heat: number;
  tier: HeatTier;
  isNuclearRecord: boolean;
  flashpointSlugs: string[];
  receipts: Receipt[];
  durationSeconds?: number;
  commentCount: number;
  pledgeAdd: number;
}

export interface BlowupComment {
  id: string;
  blowupId: string;
  authorHandle: string;
  isCompany: boolean;
  body: string;
  createdAt: string;
}

export interface Flashpoint {
  slug: string;
  name: string;
  description: string;
  createdAt: string;
  companies: { companySlug: string; heat: number }[];
  totalHeat: number;
}

export interface CategoryHall {
  slug: string;
  name: string;
  description: string;
  companySlugs: string[];
}

export interface Torch {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Handle {
  handle: string;
  clout: number;
  tier: InstigatorTier;
  torchIds: string[];
  streak: number;
  squadSlug?: string;
  joinedAt: string;
  blowupIds: string[];
  bio: string;
}

export interface Squad {
  slug: string;
  name: string;
  clout: number;
  memberHandles: string[];
  torchIds: string[];
  isPublic: boolean;
  rank: number;
  banner: string;
}

export interface DropEntry {
  date: string;
  mostRatiod: string[];
  biggestMover: { companySlug: string; delta: number };
  flashpointOfWeek: string;
}
