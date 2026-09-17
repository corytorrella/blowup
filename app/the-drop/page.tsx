import type { Metadata } from "next";
import Link from "next/link";
import { GrenadeStopwatch } from "@/components/icons";
import { Countdown } from "@/components/ui/Countdown";
import { DropSnapshot } from "@/components/drop/DropSnapshot";
import { drops, getNextDropTimestamp } from "@/lib/data";
import { formatDateLong, dropDateSlug } from "@/lib/format";

export const metadata: Metadata = { title: "The Drop" };

export default function TheDropPage() {
  const [latest, ...archive] = drops;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <div className="flex flex-col items-center border-b border-void-line pb-14 text-center">
        <GrenadeStopwatch size={64} className="mb-6 text-hazard" />
        <p className="label text-[10px] text-paper-faint">Next Drop In</p>
        <Countdown target={getNextDropTimestamp()} className="mt-3 justify-center" />
        <h1 className="font-display mt-8 text-4xl tracking-wide text-paper md:text-5xl">The Drop</h1>
        <p className="mt-3 max-w-md text-sm text-paper-muted">
          Every Monday at noon, the Burn List locks and reveals its new order &mdash; alongside Biggest Mover and
          Flashpoint of the Week.
        </p>
      </div>

      <div className="py-14">
        <p className="label mb-6 text-[10px] text-paper-faint">Latest Drop &middot; {formatDateLong(latest.date)}</p>
        <DropSnapshot drop={latest} />
      </div>

      <section className="border-t border-void-line py-14">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Drop Archive</h2>
        <ul className="divide-y divide-void-line border-t border-void-line">
          {archive.map((d) => (
            <li key={d.date}>
              <Link
                href={`/the-drop/archive/${dropDateSlug(d.date)}`}
                className="laser-hover flex items-center justify-between px-2 py-4 hover:bg-void-surface"
              >
                <span className="text-paper">{formatDateLong(d.date)}</span>
                <span className="label text-[10px] text-paper-faint">View Snapshot</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
