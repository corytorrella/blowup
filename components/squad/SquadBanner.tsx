import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { formatHeat } from "@/lib/format";
import type { Squad } from "@/lib/types";

export function SquadBanner({ squad, linked = true }: { squad: Squad; linked?: boolean }) {
  const content = (
    <div className="laser-hover group border border-void-line bg-void-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label text-[10px] text-paper-faint">Rank #{squad.rank} · {squad.isPublic ? "Public" : "Invite-only"}</p>
          <h3 className="font-display text-2xl tracking-wide text-paper group-hover:text-riot">{squad.name}</h3>
        </div>
        <div className="text-right">
          <p className="label text-[10px] text-paper-faint">Squad Clout</p>
          <p className="data-num text-xl text-riot">{formatHeat(squad.clout)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex -space-x-2">
          {squad.memberHandles.slice(0, 6).map((h) => (
            <Avatar key={h} handle={h} size={28} className="ring-2 ring-void-surface" />
          ))}
        </div>
        {squad.memberHandles.length > 6 && (
          <span className="label text-[10px] text-paper-faint">+{squad.memberHandles.length - 6} more</span>
        )}
      </div>
    </div>
  );

  if (!linked) return content;
  return <Link href={`/squads/${squad.slug}`}>{content}</Link>;
}
