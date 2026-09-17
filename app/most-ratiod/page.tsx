import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { MostRatiodList } from "@/components/company/MostRatiodList";
import { companies, categoryHalls } from "@/lib/data";

export const metadata: Metadata = { title: "Most Ratio'd" };

export default function MostRatiodPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="The Flagship Leaderboard"
        title="Most Ratio'd"
        description="Every company, ranked live by Burn Ratio. Nothing here was negotiated — it was earned, one Pile On at a time."
      />
      <MostRatiodList companies={companies} categories={categoryHalls} />
    </div>
  );
}
