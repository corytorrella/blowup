import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlastMark, HazardFlower } from "@/components/icons";
import { TierBadge } from "@/components/blowup/TierBadge";
import { HeatCounter } from "@/components/blowup/HeatCounter";
import { HeatHistoryChart } from "@/components/company/HeatHistoryChart";
import { CategoryIcon } from "@/components/company/CategoryIcon";
import { FearPageTabs } from "@/components/company/FearPageTabs";
import { CommentThread } from "@/components/blowup/CommentThread";
import { InductionMoment } from "@/components/company/InductionMoment";
import { companies, getCompany, getBlowupsForCompany, getCategory, getCommentsForBlowup, flashpoints } from "@/lib/data";
import { heatIntensity } from "@/lib/tiers";
import { formatDateLong } from "@/lib/format";
import type { BlowupComment } from "@/lib/types";

export function generateStaticParams() {
  return companies.map((c) => ({ company: c.slug }));
}

export function generateMetadata({ params }: { params: { company: string } }): Metadata {
  const company = getCompany(params.company);
  return { title: company ? company.name : "Fear Page" };
}

export default function FearPage({ params }: { params: { company: string } }) {
  const company = getCompany(params.company);
  if (!company) notFound();

  const blowups = getBlowupsForCompany(company.slug);
  const category = getCategory(company.categorySlug);
  const companyFlashpoints = flashpoints
    .map((f) => {
      const entry = f.companies.find((c) => c.companySlug === company.slug);
      return entry ? { slug: f.slug, name: f.name, heat: entry.heat } : null;
    })
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .sort((a, b) => b.heat - a.heat);

  const allComments: BlowupComment[] = blowups
    .flatMap((b) => getCommentsForBlowup(b.id))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 20);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      {company.hallOfShame && <InductionMoment companySlug={company.slug} companyName={company.name} />}
      <div className="relative border-b border-void-line pb-10">
        <BlastMark
          size={140}
          intensity={heatIntensity(company.fearScore)}
          seed={company.slug}
          className="pointer-events-none absolute right-0 top-0 text-paper-faint opacity-70"
        />
        <div className="flex items-center gap-2">
          {category && (
            <span className="label flex items-center gap-1.5 text-[10px] text-paper-faint">
              <CategoryIcon slug={category.slug} size={13} />
              {category.name}
            </span>
          )}
          {company.hallOfShame && <HazardFlower size={20} className="text-blowtorch" title="Hall of Shame" />}
        </div>
        <h1 className="font-display mt-2 max-w-lg text-5xl uppercase leading-[0.95] tracking-wide text-paper md:text-6xl">
          {company.name}
        </h1>

        <div className="mt-6 flex flex-wrap items-end gap-6">
          <HeatCounter value={company.fearScore} size="lg" simulateLive label="Fear Score" className="text-blowtorch" />
          <TierBadge tier={company.tier} />
        </div>

        <p className="label mt-6 text-[10px] text-paper-faint">
          Fear Page live since {formatDateLong(company.firstBlowupAt)}
        </p>
      </div>

      <section className="border-b border-void-line py-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Heat Over Time</h2>
        <HeatHistoryChart history={company.heatHistory} />
      </section>

      <section className="border-b border-void-line py-10">
        <FearPageTabs blowups={blowups} flashpoints={companyFlashpoints} pledgeCount={company.pledgeCount} />
      </section>

      <section className="py-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Open Thread</h2>
        <CommentThread comments={allComments} emptyMessage="Nobody's said anything yet. Be the spark." />
      </section>
    </div>
  );
}
