import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { InstigatorTierBadge } from "./InstigatorTierBadge";
import { RageStreak } from "./RageStreak";
import { formatHeat } from "@/lib/format";
import type { Handle } from "@/lib/types";

export function InstigatorRow({ handle, rank }: { handle: Handle; rank: number }) {
  return (
    <Link
      href={`/@${handle.handle}`}
      className="laser-hover grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-void-line px-3 py-4 hover:bg-void-surface sm:grid-cols-[3rem_auto_1fr_auto_auto]"
    >
      <span className="data-num text-lg text-paper-muted">{String(rank).padStart(2, "0")}</span>
      <Avatar handle={handle.handle} size={36} />
      <span className="min-w-0 truncate font-display text-lg tracking-wide text-paper md:text-xl">
        @{handle.handle}
      </span>
      <span className="hidden sm:block">
        <InstigatorTierBadge tier={handle.tier} size="sm" />
      </span>
      <span className="flex items-center gap-4 justify-self-end">
        <span className="hidden md:block">
          <RageStreak days={handle.streak} size="sm" />
        </span>
        <span className="data-num text-base text-riot md:text-lg">{formatHeat(handle.clout)}</span>
      </span>
    </Link>
  );
}
