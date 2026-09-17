import { HEAT_TIER_LABEL, nextTierInfo } from "@/lib/tiers";
import { formatHeat } from "@/lib/format";
import type { HeatTier } from "@/lib/types";

export function TierProgress({ heat, tier }: { heat: number; tier: HeatTier }) {
  const { next, threshold } = nextTierInfo(tier);

  if (!next || threshold === null) {
    return (
      <div>
        <div className="h-1 w-full bg-blowtorch" aria-hidden="true" />
        <p className="label mt-2 text-[10px] text-paper-faint">
          {tier === "nuclear" ? "All-time record. Permanent Hall of Flame induction." : "Top of the ladder."}
        </p>
      </div>
    );
  }

  const pct = Math.min(100, Math.max(2, (heat / threshold) * 100));
  const remaining = Math.max(0, threshold - heat);

  return (
    <div>
      <div className="h-1 w-full bg-void-line">
        <div className="h-1 bg-hazard transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="label mt-2 text-[10px] text-paper-faint">
        {formatHeat(remaining)} more to {HEAT_TIER_LABEL[next]}
      </p>
    </div>
  );
}
