import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlastRadiusFeed } from "@/components/feed/BlastRadiusFeed";
import { recentBlowups, flashpoints } from "@/lib/data";

export const metadata: Metadata = { title: "The Blast Radius" };

export default function FeedPage() {
  const items = recentBlowups(80);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <PageHeader eyebrow="Personalized" title="The Blast Radius" description="Everyone you follow, plus what's trending around them." />
      <BlastRadiusFeed blowups={items} flashpoints={flashpoints} />
    </div>
  );
}
