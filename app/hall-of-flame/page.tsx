import type { Metadata } from "next";
import Link from "next/link";
import { HazardFlower } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { hallOfFlameCompanies } from "@/lib/data";
import { formatHeat, formatDateLong } from "@/lib/format";

export const metadata: Metadata = { title: "Hall of Flame" };

export default function HallOfFlameIndexPage() {
  const inducted = hallOfFlameCompanies();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="Permanent Record"
        title="Hall of Flame"
        description="Every company that has ever crossed into Nuclear. Induction is permanent — nothing here was ever taken down because a company complained."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inducted.map((c) => (
          <Link
            key={c.slug}
            href={`/company/${c.slug}`}
            className="laser-hover flex flex-col items-center gap-4 border border-blowtorch/40 bg-void-surface px-6 py-10 text-center hover:border-blowtorch"
          >
            <HazardFlower size={52} className="text-blowtorch" />
            <span className="font-display text-2xl tracking-wide text-paper">{c.name}</span>
            <span className="label text-[10px] text-paper-faint">
              Inducted {c.nuclearAt ? formatDateLong(c.nuclearAt) : "—"}
            </span>
            <span className="data-num text-lg text-blowtorch">{formatHeat(c.burnRatio)} Heat</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
