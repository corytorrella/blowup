"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlowupListItem } from "@/components/blowup/BlowupListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { HEAT_TIER_LABEL } from "@/lib/tiers";
import type { Blowup, CategoryHall, Company, HeatTier } from "@/lib/types";

const PAGE_SIZE = 16;
const DATE_RANGES = ["Any time", "Past week", "Past month", "Past year"] as const;
const TIERS: HeatTier[] = ["spark", "simmering", "trending", "viral", "blown-up", "nuclear"];

export function VaultExplorer({
  blowups,
  companies,
  categories,
}: {
  blowups: Blowup[];
  companies: Company[];
  categories: CategoryHall[];
}) {
  const [query, setQuery] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [tier, setTier] = useState("");
  const [dateRange, setDateRange] = useState<(typeof DATE_RANGES)[number]>("Any time");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const companyBySlug = useMemo(() => new Map(companies.map((c) => [c.slug, c])), [companies]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const rangeMs: Record<(typeof DATE_RANGES)[number], number> = {
      "Any time": Infinity,
      "Past week": 7 * 86400000,
      "Past month": 30 * 86400000,
      "Past year": 365 * 86400000,
    };
    return blowups.filter((b) => {
      if (companySlug && b.companySlug !== companySlug) return false;
      if (categorySlug && companyBySlug.get(b.companySlug)?.categorySlug !== categorySlug) return false;
      if (tier && b.tier !== tier) return false;
      if (dateRange !== "Any time" && now - new Date(b.createdAt).getTime() > rangeMs[dateRange]) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const company = companyBySlug.get(b.companySlug);
        if (!b.title.toLowerCase().includes(q) && !company?.name.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [blowups, companySlug, categorySlug, tier, dateRange, query, companyBySlug]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="relative mb-6">
        <Search size={18} strokeWidth={1.6} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-paper-faint" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search the permanent record"
          className="w-full border border-void-line bg-void-surface py-4 pl-12 pr-4 text-base text-paper outline-none focus:border-hazard"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Select label="Company" value={companySlug} onChange={setCompanySlug} options={companies.map((c) => [c.slug, c.name])} />
        <Select label="Category" value={categorySlug} onChange={setCategorySlug} options={categories.map((c) => [c.slug, c.name])} />
        <Select label="Tier Reached" value={tier} onChange={setTier} options={TIERS.map((t) => [t, HEAT_TIER_LABEL[t]])} />
        <Select
          label="Date"
          value={dateRange}
          onChange={(v) => setDateRange(v as (typeof DATE_RANGES)[number])}
          options={DATE_RANGES.map((r) => [r, r])}
          noAllOption
        />
      </div>

      <p className="label mb-4 text-[10px] text-paper-faint">{filtered.length} Blowups on record</p>

      {shown.length === 0 ? (
        <EmptyState message="Nothing matches. Widen the search." />
      ) : (
        <div className="border-t border-void-line">
          {shown.map((b) => (
            <BlowupListItem key={b.id} blowup={b} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  noAllOption = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  noAllOption?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label text-[9px] text-paper-faint">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-void-line bg-void-surface px-3 py-2 text-xs text-paper outline-none focus:border-hazard"
      >
        {!noAllOption && <option value="">All</option>}
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
