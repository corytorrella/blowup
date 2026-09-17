import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BurnList } from "@/components/company/BurnList";
import { companies, categoryHalls } from "@/lib/data";

export const metadata: Metadata = { title: "Burn List" };

export default function BurnListPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="The Flagship Leaderboard"
        title="Burn List"
        description="Every company, ranked live by Burn Ratio. Nothing here was negotiated — it was earned, one Pile On at a time."
      />
      <BurnList companies={companies} categories={categoryHalls} />
    </div>
  );
}
