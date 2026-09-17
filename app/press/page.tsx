import type { Metadata } from "next";
import { BlastMark } from "@/components/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { fearIndexTotal, totalHandles, totalActiveFearPages, totalFlashpoints, totalPledges } from "@/lib/data";
import { formatHeat } from "@/lib/format";

export const metadata: Metadata = { title: "Press Kit" };

const COLORS = [
  { name: "Void Black", hex: "#0A0A0B", note: "Default background, everywhere." },
  { name: "Hazard Yellow", hex: "#F5C400", note: "Primary accent. Used sparingly." },
  { name: "Blowtorch Orange", hex: "#FF5A1F", note: "Heat counters, tier-ups, Flashpoints." },
  { name: "Riot Magenta", hex: "#F53091", note: "Gamification layer only — Clout, Torches, Streaks, Squads." },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <PageHeader eyebrow="For Journalists & Researchers" title="Press Kit" />

      <section className="border-b border-void-line pb-14">
        <h2 className="font-display mb-4 text-2xl tracking-wide text-paper">Boilerplate</h2>
        <p className="max-w-2xl text-base leading-relaxed text-paper-muted">
          BLOWUP is a live leaderboard of consumer rage. Complaints against companies &mdash; called Blowups &mdash;
          accumulate public &ldquo;Heat&rdquo; as people pile on, climbing a six-tier ladder from Spark to Nuclear.
          Cross-company patterns surface automatically as Flashpoints, and the platform&rsquo;s weekly Drop reveals
          the new order of its flagship Most Feared leaderboard every Monday at noon.
        </p>
      </section>

      <section className="border-b border-void-line py-14">
        <h2 className="font-display mb-4 text-2xl tracking-wide text-paper">By the Numbers</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          <Stat label="Heat Generated" value={formatHeat(fearIndexTotal)} />
          <Stat label="Active Handles" value={formatHeat(totalHandles)} />
          <Stat label="Live Fear Pages" value={formatHeat(totalActiveFearPages)} />
          <Stat label="Live Flashpoints" value={formatHeat(totalFlashpoints)} />
          <Stat label="Boycott Pledges" value={formatHeat(totalPledges)} />
        </div>
      </section>

      <section className="border-b border-void-line py-14">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Brand Marks</h2>
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <BlastMark size={100} intensity={0.6} seed="press-mark" />
            <span className="label text-[10px] text-paper-faint">The Blast Mark</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="label text-2xl text-hazard tracking-wordmark">BLOWUP</span>
            <span className="label text-[10px] text-paper-faint">Wordmark</span>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-sm text-paper-faint">
          &ldquo;BLOWUP&rdquo; and the Blast Mark are in active trademark clearance and should be treated as
          provisional brand assets, not permanently locked marks.
        </p>
      </section>

      <section className="py-14">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Color System</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COLORS.map((c) => (
            <div key={c.hex} className="flex items-center gap-4 border border-void-line p-4">
              <span className="h-12 w-12 shrink-0 border border-void-line" style={{ backgroundColor: c.hex }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-paper">{c.name}</p>
                <p className="data-num text-xs text-paper-faint">{c.hex}</p>
                <p className="mt-0.5 text-xs text-paper-muted">{c.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-void-line py-14">
        <h2 className="font-display mb-3 text-2xl tracking-wide text-paper">Media Contact</h2>
        <p className="text-sm text-paper-muted">press@blowup.example</p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="data-num text-2xl text-paper">{value}</p>
      <p className="label mt-1 text-[10px] text-paper-faint">{label}</p>
    </div>
  );
}
