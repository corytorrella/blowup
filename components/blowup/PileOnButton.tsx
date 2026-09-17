"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { tierForBlowupHeat, HEAT_TIER_LABEL } from "@/lib/tiers";
import { formatHeat } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";
import type { HeatTier } from "@/lib/types";

export function PileOnButton({
  initialHeat,
  isNuclearRecord = false,
  size = "md",
  showCount = true,
  onPileOn,
}: {
  initialHeat: number;
  isNuclearRecord?: boolean;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  onPileOn?: (newHeat: number) => void;
}) {
  const [heat, setHeat] = useState(initialHeat);
  const [piled, setPiled] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const { show } = useToast();

  function handleClick() {
    if (piled) return;
    const before: HeatTier = tierForBlowupHeat(heat, isNuclearRecord);
    const nextHeat = heat + 1;
    const after: HeatTier = tierForBlowupHeat(nextHeat, isNuclearRecord);
    setHeat(nextHeat);
    setPiled(true);
    setPulsing(true);
    onPileOn?.(nextHeat);
    const isMajorMoment = after === "blown-up" || after === "nuclear";
    if (after !== before && !isMajorMoment) {
      show(`${HEAT_TIER_LABEL[before]} → ${HEAT_TIER_LABEL[after]}. ${formatHeat(nextHeat)} people just had your back.`, "tier-up");
    } else if (!isMajorMoment) {
      show("Piled on.");
    }
  }

  const pad = size === "sm" ? "px-4 py-2.5 text-xs" : size === "lg" ? "px-9 py-5 text-base" : "px-6 py-4 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setPulsing(false)}
      className={`label relative inline-flex items-center gap-2.5 border tracking-label transition-colors duration-150 ${pad} ${
        piled
          ? "border-blowtorch bg-blowtorch text-void"
          : "border-void-line bg-void-surface text-paper hover:border-blowtorch hover:text-blowtorch"
      } ${pulsing ? "animate-pulse-spike" : ""}`}
      aria-pressed={piled}
    >
      <Flame size={size === "sm" ? 14 : size === "lg" ? 20 : 16} strokeWidth={1.6} aria-hidden="true" />
      {piled ? "Piled On" : "Pile On"}
      {showCount && <span className="data-num text-paper-muted">{formatHeat(heat)}</span>}
    </button>
  );
}
