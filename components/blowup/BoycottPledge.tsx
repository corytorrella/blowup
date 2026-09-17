"use client";

import { useState } from "react";
import { BowTiedMolotov } from "@/components/icons";
import { formatHeat } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";

export function BoycottPledge({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [pledged, setPledged] = useState(false);
  const { show } = useToast();

  function handlePledge() {
    if (pledged) return;
    setCount((c) => c + 1);
    setPledged(true);
    show("Wrapped. Sent. Ticking.", "pledge");
  }

  return (
    <div className="flex items-center gap-4 border border-void-line bg-void-surface px-5 py-4">
      <BowTiedMolotov size={30} accent={pledged} className={pledged ? "text-riot" : "text-paper"} />
      <div className="flex-1">
        <p className="label text-[10px] text-paper-faint">Boycott Pledge</p>
        <p className="data-num text-xl text-paper">{formatHeat(count)}</p>
      </div>
      <button
        type="button"
        onClick={handlePledge}
        className={`label laser-hover border px-4 py-2.5 text-xs tracking-label transition-colors ${
          pledged ? "border-riot text-riot" : "border-void-line text-paper hover:border-riot hover:text-riot"
        }`}
      >
        {pledged ? "Pledged" : "Pledge to Boycott"}
      </button>
    </div>
  );
}
