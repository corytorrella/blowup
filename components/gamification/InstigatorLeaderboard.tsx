"use client";

import { useMemo, useState } from "react";
import { InstigatorRow } from "./InstigatorRow";
import { seededRandom } from "@/lib/rng";
import type { Handle } from "@/lib/types";

export function InstigatorLeaderboard({ handles }: { handles: Handle[] }) {
  const [view, setView] = useState<"all-time" | "weekly">("all-time");

  const weeklyOrder = useMemo(() => {
    return [...handles]
      .map((h) => {
        const rand = seededRandom(`weekly-clout-${h.handle}`);
        return { handle: h, weeklyClout: Math.round(h.clout * (0.02 + rand() * 0.1)) };
      })
      .sort((a, b) => b.weeklyClout - a.weeklyClout);
  }, [handles]);

  return (
    <div>
      <div className="mb-8 flex gap-2">
        <Tab label="All-Time" active={view === "all-time"} onClick={() => setView("all-time")} />
        <Tab label="This Week" active={view === "weekly"} onClick={() => setView("weekly")} />
      </div>
      <div className="border-t border-void-line">
        {view === "all-time"
          ? handles.map((h, i) => <InstigatorRow key={h.handle} handle={h} rank={i + 1} />)
          : weeklyOrder.map((entry, i) => <InstigatorRow key={entry.handle.handle} handle={entry.handle} rank={i + 1} />)}
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label border-b-2 px-1 pb-2 text-xs tracking-label ${
        active ? "border-hazard text-hazard" : "border-transparent text-paper-muted hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}
