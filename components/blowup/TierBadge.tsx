import type { HeatTier } from "@/lib/types";
import { HEAT_TIER_LABEL } from "@/lib/tiers";
import { HazardFlower } from "@/components/icons";

const TIER_CLASS: Record<HeatTier, string> = {
  spark: "border-void-line text-paper-muted",
  simmering: "border-hazard/60 text-hazard",
  trending: "border-hazard text-hazard",
  viral: "border-blowtorch/70 text-blowtorch",
  "blown-up": "border-blowtorch bg-blowtorch text-void",
  nuclear: "border-blowtorch text-paper",
};

export function TierBadge({ tier, size = "md" }: { tier: HeatTier; size?: "sm" | "md" }) {
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";
  if (tier === "nuclear") {
    return (
      <span
        className={`label inline-flex items-center gap-1.5 border-2 border-double border-blowtorch bg-void ${padding} tracking-label text-paper`}
      >
        <HazardFlower size={size === "sm" ? 14 : 16} className="text-blowtorch" />
        {HEAT_TIER_LABEL[tier]}
      </span>
    );
  }
  return (
    <span className={`label inline-block border ${TIER_CLASS[tier]} ${padding} tracking-label`}>
      {HEAT_TIER_LABEL[tier]}
    </span>
  );
}
