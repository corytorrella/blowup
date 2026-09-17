import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { InstigatorLeaderboard } from "@/components/gamification/InstigatorLeaderboard";
import { topInstigators } from "@/lib/data";

export const metadata: Metadata = { title: "Top Instigators" };

export default function InstigatorsPage() {
  const ranked = topInstigators(54);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="Ranked by Clout"
        title="Top Instigators"
        description="Starting a Blowup that climbs is worth more than piling on late. Being #4 on something that goes Nuclear beats being #4,000."
      />
      <InstigatorLeaderboard handles={ranked} />
    </div>
  );
}
