"use client";

import { useEffect, useRef, useState } from "react";
import { HeatCounter } from "./HeatCounter";
import { TierProgress } from "./TierProgress";
import { PileOnButton } from "./PileOnButton";
import { SignatureMomentOverlay } from "@/components/ui/SignatureMomentOverlay";
import { tierForBlowupHeat } from "@/lib/tiers";
import { markSeenOnce } from "@/lib/session-once";

export function BlowupHeatPanel({
  blowupId,
  initialHeat,
  isNuclearRecord,
}: {
  blowupId: string;
  initialHeat: number;
  isNuclearRecord: boolean;
}) {
  const [heat, setHeat] = useState(initialHeat);
  const tier = tierForBlowupHeat(heat, isNuclearRecord && heat >= initialHeat);
  const [overlay, setOverlay] = useState<null | "blown-up" | "nuclear">(null);
  const prevTier = useRef(tier);

  useEffect(() => {
    if ((tier === "blown-up" || tier === "nuclear") && markSeenOnce(`moment-${blowupId}`)) {
      setOverlay(tier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tier !== prevTier.current && (tier === "blown-up" || tier === "nuclear")) {
      setOverlay(tier);
    }
    prevTier.current = tier;
  }, [tier]);

  return (
    <div>
      <HeatCounter value={heat} size="xl" label="Heat" className="text-blowtorch" />
      <div className="mt-4 max-w-sm">
        <TierProgress heat={heat} tier={tier} />
      </div>
      <div className="mt-6">
        <PileOnButton initialHeat={heat} isNuclearRecord={isNuclearRecord} showCount={false} size="lg" onPileOn={setHeat} />
      </div>

      <SignatureMomentOverlay
        open={overlay !== null}
        onClose={() => setOverlay(null)}
        motif={overlay === "nuclear" ? "flower" : "blast"}
        headline={overlay === "nuclear" ? "Nuclear" : "Blown Up"}
        sub={overlay === "nuclear" ? "New all-time record. Permanent Hall of Shame induction." : "Full-screen takeover, site-wide."}
      />
    </div>
  );
}
