import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FlashpointCard } from "@/components/flashpoint/FlashpointCard";
import { flashpoints } from "@/lib/data";

export const metadata: Metadata = { title: "Flashpoints" };

export default function FlashpointsHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="Every Live Cross-Company Pattern"
        title="Flashpoints"
        description="Ranked by combined Heat. A pattern doesn't need one company's cooperation to become a story — it just needs a second company caught doing the same thing."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {flashpoints.map((f) => (
          <FlashpointCard key={f.slug} flashpoint={f} />
        ))}
      </div>
    </div>
  );
}
