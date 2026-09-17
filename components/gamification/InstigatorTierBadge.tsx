import type { InstigatorTier } from "@/lib/types";
import { INSTIGATOR_TIER_LABEL } from "@/lib/tiers";

export function InstigatorTierBadge({ tier, size = "md" }: { tier: InstigatorTier; size?: "sm" | "md" }) {
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";
  return (
    <span className={`label relative inline-flex items-center gap-1.5 border border-void-line text-paper ${padding} tracking-label`}>
      <span className="h-1.5 w-1.5 rounded-full bg-riot" aria-hidden="true" />
      {INSTIGATOR_TIER_LABEL[tier]}
    </span>
  );
}
