import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSquad, squads, torches } from "@/lib/data";
import { formatHeat } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { TorchMedallion } from "@/components/gamification/TorchMedallion";
import { JoinButton } from "@/components/squad/JoinButton";

export function generateStaticParams() {
  return squads.map((s) => ({ squad: s.slug }));
}

export function generateMetadata({ params }: { params: { squad: string } }): Metadata {
  const squad = getSquad(params.squad);
  return { title: squad ? squad.name : "Squad" };
}

export default function SquadPage({ params }: { params: { squad: string } }) {
  const squad = getSquad(params.squad);
  if (!squad) notFound();

  return (
    <div>
      <div className="border-b border-void-line bg-void-surface px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="label mb-2 text-[10px] text-paper-faint">
            Rank #{squad.rank} &middot; {squad.isPublic ? "Public" : "Invite-only"}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-5xl tracking-wide text-paper md:text-6xl">{squad.name}</h1>
            <JoinButton isPublic={squad.isPublic} />
          </div>
          <p className="label mt-6 text-[10px] text-paper-faint">Squad Clout</p>
          <p className="data-num text-4xl text-riot md:text-5xl">{formatHeat(squad.clout)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <section className="border-b border-void-line pb-10">
          <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Squad Torches</h2>
          <div className="flex flex-wrap gap-6">
            {torches.map((t) => (
              <TorchMedallion key={t.id} torch={t} earned={squad.torchIds.includes(t.id)} />
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">
            Members <span className="text-paper-faint">({squad.memberHandles.length})</span>
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {squad.memberHandles.map((h) => (
              <li key={h}>
                <Link href={`/@${h}`} className="laser-hover flex items-center gap-3 border border-void-line px-4 py-3 hover:bg-void-surface">
                  <Avatar handle={h} size={32} />
                  <span className="text-sm text-paper">@{h}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
