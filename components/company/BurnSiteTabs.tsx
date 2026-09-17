"use client";

import { useState } from "react";
import Link from "next/link";
import { BlowupListItem } from "@/components/blowup/BlowupListItem";
import { BoycottPledge } from "@/components/blowup/BoycottPledge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatHeat } from "@/lib/format";
import type { Blowup } from "@/lib/types";

interface FlashpointRef {
  slug: string;
  name: string;
  heat: number;
}

type Tab = "blowups" | "flashpoints" | "pledge";

export function BurnSiteTabs({
  blowups,
  flashpoints,
  pledgeCount,
}: {
  blowups: Blowup[];
  flashpoints: FlashpointRef[];
  pledgeCount: number;
}) {
  const [tab, setTab] = useState<Tab>("blowups");

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-void-line">
        <TabButton label={`All Blowups (${blowups.length})`} active={tab === "blowups"} onClick={() => setTab("blowups")} />
        <TabButton
          label={`Active Flashpoints (${flashpoints.length})`}
          active={tab === "flashpoints"}
          onClick={() => setTab("flashpoints")}
        />
        <TabButton label="Boycott Pledge" active={tab === "pledge"} onClick={() => setTab("pledge")} />
      </div>

      {tab === "blowups" &&
        (blowups.length === 0 ? (
          <EmptyState message="Nobody's piled on yet. Be the spark." />
        ) : (
          <div className="border-t border-void-line">
            {blowups.map((b) => (
              <BlowupListItem key={b.id} blowup={b} showCompany={false} />
            ))}
          </div>
        ))}

      {tab === "flashpoints" &&
        (flashpoints.length === 0 ? (
          <EmptyState message="Not caught in a pattern yet." />
        ) : (
          <ul className="border-t border-void-line">
            {flashpoints.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/flashpoints/${f.slug}`}
                  className="laser-hover flex items-center justify-between border-b border-void-line px-1 py-4 hover:bg-void-surface"
                >
                  <span className="text-paper">{f.name}</span>
                  <span className="data-num text-blowtorch">{formatHeat(f.heat)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}

      {tab === "pledge" && (
        <div className="max-w-md">
          <BoycottPledge initialCount={pledgeCount} />
        </div>
      )}
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label border-b-2 px-1 pb-3 text-xs tracking-label ${
        active ? "border-hazard text-hazard" : "border-transparent text-paper-muted hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}
