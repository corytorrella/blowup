import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { MostFearedList } from "@/components/company/MostFearedList";
import { companies, categoryHalls } from "@/lib/data";

export const metadata: Metadata = { title: "Most Feared" };

export default function MostFearedPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="The Flagship Leaderboard"
        title="Most Feared"
        description="Every company, ranked live by Fear Score. Nothing here was negotiated — it was earned, one Pile On at a time."
      />
      <MostFearedList companies={companies} categories={categoryHalls} />
    </div>
  );
}
