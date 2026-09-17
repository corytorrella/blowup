import type { Metadata } from "next";
import Link from "next/link";
import { blowupOfTheYear, getCompany, getCommentsForBlowup } from "@/lib/data";
import { TierBadge } from "@/components/blowup/TierBadge";
import { HeatCounter } from "@/components/blowup/HeatCounter";
import { BlastMark } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { formatHeat, formatDateLong } from "@/lib/format";

export const metadata: Metadata = { title: "Blowup of the Year" };

export default function BlowupOfTheYearPage() {
  const boty = blowupOfTheYear();
  const company = getCompany(boty.companySlug);
  const comments = getCommentsForBlowup(boty.id);
  const year = new Date(boty.createdAt).getFullYear();

  return (
    <div className="relative overflow-hidden">
      <BlastMark
        size={320}
        intensity={0.85}
        seed="boty"
        className="pointer-events-none absolute -right-24 -top-24 text-paper-faint opacity-30"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <span className="font-stencil text-2xl uppercase tracking-wide text-hazard md:text-3xl">
          Blowup of the Year
        </span>
        <p className="label mt-3 text-[10px] text-paper-faint">
          Crowned annually. Ranked purely on Heat &mdash; never a vote.
        </p>

        <h1 className="font-display mt-8 text-4xl leading-tight tracking-wide text-paper md:text-6xl">{boty.title}</h1>
        <Link href={`/company/${boty.companySlug}`} className="mt-4 inline-block text-lg text-paper-muted hover:text-hazard">
          {company?.name}
        </Link>

        <div className="mt-10 flex flex-col items-center gap-4">
          <HeatCounter value={boty.heat} size="xl" className="text-blowtorch" />
          <TierBadge tier={boty.tier} />
        </div>

        <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-y border-void-line py-8">
          <Stat label="Heat" value={formatHeat(boty.heat)} />
          <Stat label="Comments" value={formatHeat(boty.commentCount)} />
          <Stat label="Posted" value={formatDateLong(boty.createdAt).split(",")[0] + `, ${year}`} small />
        </div>

        <p className="label mt-6 text-[10px] text-paper-faint">{comments.length} replies shown on the Blowup itself</p>

        <div className="mt-10 flex justify-center gap-4">
          <ButtonLink href={`/company/${boty.companySlug}/blowup/${boty.id}`} size="lg">
            Read the Blowup
          </ButtonLink>
          <ButtonLink href="/aftermath" variant="outline" size="lg">
            Browse Aftermath
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <p className={`data-num text-paper ${small ? "text-sm" : "text-xl"}`}>{value}</p>
      <p className="label mt-1 text-[9px] text-paper-faint">{label}</p>
    </div>
  );
}
