import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { AftermathExplorer } from "@/components/aftermath/AftermathExplorer";
import { TierBadge } from "@/components/blowup/TierBadge";
import { allTimeAftermath, companies, categoryHalls, blowupOfTheYear, getCompany } from "@/lib/data";
import { formatHeat } from "@/lib/format";

export const metadata: Metadata = { title: "Aftermath" };

export default function AftermathPage() {
  const archive = allTimeAftermath();
  const boty = blowupOfTheYear();
  const botyCompany = getCompany(boty.companySlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="The Permanent Record"
        title="Aftermath"
        description={`Every Blowup ever posted, in order, forever. ${archive.length.toLocaleString()} and counting.`}
      />

      <Link
        href={`/company/${boty.companySlug}/blowup/${boty.id}`}
        className="laser-hover mb-12 flex flex-col gap-3 border-2 border-hazard bg-void-surface p-6 hover:bg-void-raised"
      >
        <span className="label text-[10px] text-hazard">Pinned &middot; Blowup of the Year</span>
        <p className="font-display text-2xl tracking-wide text-paper md:text-3xl">{boty.title}</p>
        <div className="flex items-center gap-4">
          <TierBadge tier={boty.tier} size="sm" />
          <span className="text-sm text-paper-muted">{botyCompany?.name}</span>
          <span className="data-num ml-auto text-blowtorch">{formatHeat(boty.heat)}</span>
        </div>
      </Link>

      <AftermathExplorer blowups={archive} companies={companies} categories={categoryHalls} />
    </div>
  );
}
