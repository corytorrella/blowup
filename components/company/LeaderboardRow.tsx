import Link from "next/link";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { TierBadge } from "@/components/blowup/TierBadge";
import { formatHeat } from "@/lib/format";
import type { Company } from "@/lib/types";

export function LeaderboardRow({ company, categoryLabel }: { company: Company; categoryLabel?: string }) {
  const delta = company.rankLastWeek - company.rank;
  return (
    <Link
      href={`/company/${company.slug}`}
      className="laser-hover group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-void-line px-3 py-4 transition-colors hover:bg-void-surface sm:grid-cols-[3rem_auto_1fr_auto]"
    >
      <span className="data-num text-lg text-paper-muted">{String(company.rank).padStart(2, "0")}</span>

      <span className="hidden sm:flex sm:items-center sm:gap-1">
        {delta > 0 ? (
          <ChevronUp size={16} strokeWidth={1.8} className="text-hazard" aria-label={`Up ${delta}`} />
        ) : delta < 0 ? (
          <ChevronDown size={16} strokeWidth={1.8} className="text-paper-faint" aria-label={`Down ${Math.abs(delta)}`} />
        ) : (
          <Minus size={16} strokeWidth={1.8} className="text-paper-faint/50" aria-label="No change" />
        )}
      </span>

      <span className="min-w-0">
        <span className="block truncate font-display text-lg tracking-wide text-paper group-hover:text-hazard md:text-xl">
          {company.name}
        </span>
        {categoryLabel && <span className="label text-[10px] text-paper-faint">{categoryLabel}</span>}
      </span>

      <span className="flex items-center gap-3 justify-self-end">
        <TierBadge tier={company.tier} size="sm" />
        <span className="data-num text-base text-paper md:text-lg">{formatHeat(company.burnRatio)}</span>
      </span>
    </Link>
  );
}
