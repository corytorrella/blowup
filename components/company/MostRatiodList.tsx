"use client";

import { useState } from "react";
import { LeaderboardRow } from "./LeaderboardRow";
import type { Company, CategoryHall } from "@/lib/types";

export function MostRatiodList({ companies, categories }: { companies: Company[]; categories: CategoryHall[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? companies.filter((c) => c.categorySlug === filter) : companies;
  const categoryLabel = (slug: string) => categories.find((c) => c.slug === slug)?.name;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip label="All" active={filter === null} onClick={() => setFilter(null)} />
        {categories.map((c) => (
          <FilterChip key={c.slug} label={c.name} active={filter === c.slug} onClick={() => setFilter(c.slug)} />
        ))}
      </div>
      <div className="border-t border-void-line">
        {visible.map((c) => (
          <LeaderboardRow key={c.slug} company={c} categoryLabel={categoryLabel(c.categorySlug)} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label border px-3 py-1.5 text-[10px] tracking-label transition-colors ${
        active ? "border-hazard text-hazard" : "border-void-line text-paper-muted hover:border-paper-muted"
      }`}
    >
      {label}
    </button>
  );
}
