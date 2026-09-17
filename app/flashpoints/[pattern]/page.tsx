import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFlashpoint, getCompany, blowups, flashpoints } from "@/lib/data";
import { formatHeat, formatDate } from "@/lib/format";
import { tierForBlowupHeat } from "@/lib/tiers";
import { TierBadge } from "@/components/blowup/TierBadge";
import { BlowupListItem } from "@/components/blowup/BlowupListItem";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function generateStaticParams() {
  return flashpoints.map((f) => ({ pattern: f.slug }));
}

export function generateMetadata({ params }: { params: { pattern: string } }): Metadata {
  const flashpoint = getFlashpoint(params.pattern);
  return { title: flashpoint ? flashpoint.name : "Flashpoint" };
}

export default function FlashpointPage({ params }: { params: { pattern: string } }) {
  const flashpoint = getFlashpoint(params.pattern);
  if (!flashpoint) notFound();

  const taggedBlowups = blowups
    .filter((b) => b.flashpointSlugs.includes(flashpoint.slug))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <p className="label mb-3 text-[10px] text-paper-faint">
        Flashpoint &middot; Live since {formatDate(flashpoint.createdAt)}
      </p>
      <h1 className="font-display text-5xl uppercase tracking-wide text-paper md:text-6xl">{flashpoint.name}</h1>
      <p className="mt-4 max-w-2xl text-base text-paper-muted">{flashpoint.description}</p>

      <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-void-line py-6">
        <div>
          <p className="label text-[10px] text-paper-faint">Combined Heat</p>
          <p className="data-num text-4xl text-blowtorch md:text-5xl">{formatHeat(flashpoint.totalHeat)}</p>
        </div>
        <div>
          <p className="label text-[10px] text-paper-faint">Companies Caught</p>
          <p className="data-num text-4xl text-paper md:text-5xl">{flashpoint.companies.length}</p>
        </div>
        <ButtonLink href={`/post?flashpoint=${flashpoint.slug}`} className="ml-auto" size="sm">
          Tag This Pattern
        </ButtonLink>
      </div>

      <section className="mt-14">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Ranked by Company</h2>
        <div className="border-t border-void-line">
          {flashpoint.companies.map((entry, i) => {
            const company = getCompany(entry.companySlug);
            if (!company) return null;
            const tier = tierForBlowupHeat(entry.heat, false);
            return (
              <Link
                key={entry.companySlug}
                href={`/company/${company.slug}`}
                className="laser-hover grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-void-line px-3 py-4 hover:bg-void-surface"
              >
                <span className="data-num text-lg text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg tracking-wide text-paper md:text-xl">{company.name}</span>
                <span className="flex items-center gap-3 justify-self-end">
                  <TierBadge tier={tier} size="sm" />
                  <span className="data-num text-base text-paper md:text-lg">{formatHeat(entry.heat)}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Blowups Tagged Here</h2>
        {taggedBlowups.length === 0 ? (
          <EmptyState message="Nobody's tagged this pattern yet. Be the spark." />
        ) : (
          <div className="border-t border-void-line">
            {taggedBlowups.map((b) => (
              <BlowupListItem key={b.id} blowup={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
