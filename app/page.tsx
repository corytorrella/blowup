import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlastMark, GrenadeStopwatch, HazardFlower } from "@/components/icons";
import { HeatCounter } from "@/components/blowup/HeatCounter";
import { LeaderboardRow } from "@/components/company/LeaderboardRow";
import { FlashpointCard } from "@/components/flashpoint/FlashpointCard";
import { CategoryIcon } from "@/components/company/CategoryIcon";
import { TickerMarquee } from "@/components/ticker/TickerMarquee";
import { TierBadge } from "@/components/blowup/TierBadge";
import { Countdown } from "@/components/ui/Countdown";
import { ButtonLink } from "@/components/ui/Button";
import {
  topCompanies,
  flashpoints,
  categoryHalls,
  companies,
  hallOfFlameCompanies,
  heatIndex24h,
  heatIndexTotal,
  totalHandles,
  totalActiveBurnSites,
  totalFlashpoints,
  totalPledges,
  getNextDropTimestamp,
  blowupOfTheYear,
} from "@/lib/data";
import { formatHeat, formatDate } from "@/lib/format";
import { HEAT_TIER_LABEL } from "@/lib/tiers";

export default function HomePage() {
  const burnList = topCompanies(8);
  const spotlightFlashpoints = flashpoints.slice(0, 4);
  const inductions = hallOfFlameCompanies().slice(0, 4);
  const headline = blowupOfTheYear();

  const tickerItems = topCompanies(14).map((c) => ({
    text: `${c.name.toUpperCase()} — ${formatHeat(c.burnRatio)} HEAT — ${HEAT_TIER_LABEL[c.tier].toUpperCase()}`,
    href: `/company/${c.slug}`,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-void-line px-4 py-24 text-center md:py-36">
        <BlastMark
          size={220}
          intensity={0.1}
          seed="hero"
          showGuide
          className="pointer-events-none absolute -right-10 -top-10 text-paper-faint opacity-40 md:right-10 md:top-10"
        />
        <p className="label mb-6 text-xs text-paper-faint">The live leaderboard of consumer rage</p>
        <HeatCounter value={heatIndex24h} size="xl" simulateLive label="Heat Index, last 24 hours" className="justify-center text-hazard" />
        <p className="label mt-3 text-[11px] text-paper-faint">Heat Index &middot; last 24 hours</p>

        <h1 className="font-display mt-10 text-5xl uppercase leading-[0.95] tracking-wide text-paper md:text-7xl">
          Turn Frustration
          <br />
          Into Fear
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-paper-muted md:text-lg">
          One complaint is a whisper. A million is a threat.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/post" size="lg">
            Start a Blowup
          </ButtonLink>
        </div>
      </section>

      {/* Live Ticker */}
      <TickerMarquee items={tickerItems} />

      {/* Burn List preview */}
      <section className="mx-auto max-w-5xl px-4 py-20 md:px-8">
        <SectionHeader eyebrow="Live Leaderboard" title="Burn List" href="/burn-list" linkLabel="See Full Leaderboard" />
        <div className="border-t border-void-line">
          {burnList.map((c) => (
            <LeaderboardRow key={c.slug} company={c} />
          ))}
        </div>
      </section>

      {/* Flashpoints spotlight */}
      <section className="border-t border-void-line bg-void-surface/40 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Cross-Company Patterns" title="Flashpoints" href="/flashpoints" linkLabel="See All Flashpoints" />
          <div className="grid gap-5 sm:grid-cols-2">
            {spotlightFlashpoints.map((f) => (
              <FlashpointCard key={f.slug} flashpoint={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Halls of Flame quick links */}
      <section className="mx-auto max-w-5xl px-4 py-20 md:px-8">
        <SectionHeader eyebrow="By Industry" title="Halls of Flame" href="/halls-of-flame" linkLabel="Browse All Halls" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categoryHalls.map((cat) => {
            const worst = companies
              .filter((c) => c.categorySlug === cat.slug)
              .sort((a, b) => b.burnRatio - a.burnRatio)[0];
            return (
              <Link
                key={cat.slug}
                href={`/halls-of-flame/${cat.slug}`}
                className="laser-hover flex flex-col gap-3 border border-void-line p-5 hover:border-hazard"
              >
                <CategoryIcon slug={cat.slug} size={22} className="text-hazard" />
                <span className="font-display text-lg tracking-wide text-paper">{cat.name}</span>
                <span className="label text-[10px] text-paper-faint">Worst: {worst?.name ?? "—"}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Inductions */}
      <section className="border-t border-void-line px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeader eyebrow="Hall of Flame" title="Recent Inductions" href="/hall-of-flame" linkLabel="View Hall of Flame" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inductions.map((c) => (
              <Link
                key={c.slug}
                href={`/company/${c.slug}`}
                className="laser-hover flex flex-col items-center gap-3 border border-blowtorch/40 bg-void-surface px-4 py-8 text-center hover:border-blowtorch"
              >
                <HazardFlower size={40} className="text-blowtorch" />
                <span className="font-display text-xl tracking-wide text-paper">{c.name}</span>
                <span className="label text-[10px] text-paper-faint">
                  Inducted {c.nuclearAt ? formatDate(c.nuclearAt) : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Momentum block */}
      <section className="border-t border-void-line bg-void-surface/40 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="label mb-10 text-xs text-paper-faint">Platform Momentum</p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <Stat label="Heat Generated" value={heatIndexTotal} />
            <Stat label="Active Handles" value={totalHandles} />
            <Stat label="Live Burn Sites" value={totalActiveBurnSites} />
            <Stat label="Live Flashpoints" value={totalFlashpoints} />
            <Stat label="Boycott Pledges" value={totalPledges} />
          </div>

          <div className="mt-14 border border-void-line px-6 py-8 md:px-10">
            <p className="label mb-4 text-[10px] text-paper-faint">Headline of the Year</p>
            <p className="font-display text-2xl leading-snug tracking-wide text-paper md:text-3xl">
              &ldquo;{headline.title}&rdquo;
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <TierBadge tier={headline.tier} />
              <span className="data-num text-lg text-blowtorch">{formatHeat(headline.heat)} Heat</span>
              <Link
                href={`/company/${headline.companySlug}/blowup/${headline.id}`}
                className="label text-xs text-paper-muted underline decoration-void-line hover:text-hazard"
              >
                Read the Blowup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="border-t border-void-line px-4 py-24 text-center md:py-28">
        <GrenadeStopwatch size={72} className="mx-auto mb-8 text-hazard" />
        <h2 className="font-display text-3xl uppercase tracking-wide text-paper md:text-5xl">
          The Clock&rsquo;s Already Running.
          <br />
          Fifteen Seconds And It&rsquo;s Live.
        </h2>
        <div className="mt-8 flex flex-col items-center gap-6">
          <Countdown target={getNextDropTimestamp()} />
          <p className="label text-[10px] text-paper-faint">Next Drop</p>
          <ButtonLink href="/post" size="lg">
            Start a Blowup
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="label text-[10px] text-paper-faint">{eyebrow}</p>
        <h2 className="font-display text-3xl tracking-wide text-paper md:text-4xl">{title}</h2>
      </div>
      <Link href={href} className="label laser-hover flex items-center gap-1.5 whitespace-nowrap text-xs text-hazard tracking-label">
        {linkLabel}
        <ArrowRight size={14} strokeWidth={1.8} />
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="data-num text-2xl text-paper md:text-3xl">{formatHeat(value)}</p>
      <p className="label mt-1 text-[10px] text-paper-faint">{label}</p>
    </div>
  );
}
