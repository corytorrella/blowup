import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { InstigatorTierBadge } from "@/components/gamification/InstigatorTierBadge";
import { RageStreak } from "@/components/gamification/RageStreak";
import { TorchMedallion } from "@/components/gamification/TorchMedallion";
import { SquadBanner } from "@/components/squad/SquadBanner";
import { BlowupListItem } from "@/components/blowup/BlowupListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { HeatCounter } from "@/components/blowup/HeatCounter";
import { ButtonLink } from "@/components/ui/Button";
import { getBlowup, getSquad, torches } from "@/lib/data";
import { formatDateLong } from "@/lib/format";
import type { Blowup, Handle } from "@/lib/types";

export function InstigatorProfile({ handle, isOwnProfile = false }: { handle: Handle; isOwnProfile?: boolean }) {
  const myBlowups = handle.blowupIds
    .map((id) => getBlowup(id))
    .filter((b): b is Blowup => Boolean(b))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const squad = handle.squadSlug ? getSquad(handle.squadSlug) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-void-line pb-10">
        <div className="flex items-center gap-5">
          <Avatar handle={handle.handle} size={72} />
          <div>
            <h1 className="font-display text-4xl tracking-wide text-paper md:text-5xl">@{handle.handle}</h1>
            <p className="mt-2 text-sm text-paper-muted">{handle.bio}</p>
            <p className="label mt-2 text-[10px] text-paper-faint">Instigator since {formatDateLong(handle.joinedAt)}</p>
          </div>
        </div>
        {isOwnProfile && (
          <ButtonLink href="/settings" variant="outline" size="sm">
            Edit Settings
          </ButtonLink>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-8 border-b border-void-line py-8">
        <div>
          <p className="label mb-1 text-[10px] text-paper-faint">Clout</p>
          <HeatCounter value={handle.clout} size="lg" className="text-riot" />
        </div>
        <InstigatorTierBadge tier={handle.tier} />
        <RageStreak days={handle.streak} />
      </div>

      <section className="border-b border-void-line py-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Torch Case</h2>
        <div className="flex flex-wrap gap-6">
          {torches.map((t) => (
            <TorchMedallion key={t.id} torch={t} earned={handle.torchIds.includes(t.id)} />
          ))}
        </div>
      </section>

      <section className="border-b border-void-line py-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">Squad</h2>
        {squad ? (
          <div className="max-w-sm">
            <SquadBanner squad={squad} />
          </div>
        ) : (
          <EmptyState message="Not in a Squad." sub="Squads pile on together and share a Clout total." />
        )}
      </section>

      <section className="py-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">
          {isOwnProfile ? "My Blowups" : "Blowups"} <span className="text-paper-faint">({myBlowups.length})</span>
        </h2>
        {myBlowups.length === 0 ? (
          <EmptyState message="Nobody's piled on yet. Be the spark." />
        ) : (
          <div className="border-t border-void-line">
            {myBlowups.map((b) => (
              <BlowupListItem key={b.id} blowup={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function InstigatorNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-28 text-center">
      <Link href="/instigators" className="text-hazard hover:underline">
        Browse Top Instigators
      </Link>
    </div>
  );
}
