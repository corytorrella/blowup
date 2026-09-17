import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SquadBanner } from "@/components/squad/SquadBanner";
import { squads } from "@/lib/data";

export const metadata: Metadata = { title: "Squads" };

export default function SquadsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="Standing Groups"
        title="Squads"
        description="Handles who pile on together and share a Clout total. Public squads take requests; invite-only squads don't."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {squads.map((s) => (
          <SquadBanner key={s.slug} squad={s} />
        ))}
      </div>
    </div>
  );
}
