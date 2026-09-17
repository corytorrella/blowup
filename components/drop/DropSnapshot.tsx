import Link from "next/link";
import { getCompany, getFlashpoint } from "@/lib/data";
import { formatHeat } from "@/lib/format";
import type { DropEntry } from "@/lib/types";

export function DropSnapshot({ drop }: { drop: DropEntry }) {
  const mover = getCompany(drop.biggestMover.companySlug);
  const flashpoint = getFlashpoint(drop.flashpointOfWeek);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-riot/40 bg-void-surface p-6">
          <p className="label text-[10px] text-paper-faint">Biggest Mover of the Week</p>
          <p className="font-display mt-2 text-2xl tracking-wide text-paper">{mover?.name ?? "—"}</p>
          <p className="data-num mt-1 text-riot">+{drop.biggestMover.delta} ranks</p>
        </div>
        <div className="border border-blowtorch/40 bg-void-surface p-6">
          <p className="label text-[10px] text-paper-faint">Flashpoint of the Week</p>
          <p className="font-display mt-2 text-2xl tracking-wide text-paper">{flashpoint?.name ?? "—"}</p>
          {flashpoint && (
            <Link href={`/flashpoints/${flashpoint.slug}`} className="label mt-1 inline-block text-[10px] text-blowtorch hover:underline">
              View Flashpoint
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-void-line">
        {drop.mostFeared.map((slug, i) => {
          const company = getCompany(slug);
          if (!company) return null;
          return (
            <Link
              key={slug}
              href={`/company/${slug}`}
              className="laser-hover flex items-center gap-4 border-b border-void-line px-2 py-3.5 hover:bg-void-surface"
            >
              <span className="data-num w-8 text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-paper">{company.name}</span>
              <span className="data-num text-paper-muted">{formatHeat(company.fearScore)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
