import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryIcon } from "@/components/company/CategoryIcon";
import { categoryHalls, companies } from "@/lib/data";
import { formatHeat } from "@/lib/format";

export const metadata: Metadata = { title: "Halls of Shame" };

export default function HallsOfShamePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <PageHeader
        eyebrow="By Industry"
        title="Halls of Shame"
        description="Every industry keeps its own scoreboard. Pick one."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {categoryHalls.map((cat) => {
          const ranked = companies
            .filter((c) => c.categorySlug === cat.slug)
            .sort((a, b) => b.fearScore - a.fearScore);
          return (
            <Link
              key={cat.slug}
              href={`/halls-of-shame/${cat.slug}`}
              className="laser-hover flex flex-col gap-4 border border-void-line bg-void-surface p-6 hover:border-hazard"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon slug={cat.slug} size={22} className="text-hazard" />
                <h2 className="font-display text-2xl tracking-wide text-paper">{cat.name}</h2>
              </div>
              <p className="text-sm text-paper-muted">{cat.description}</p>
              <ul className="mt-2 space-y-1.5 border-t border-void-line pt-4">
                {ranked.slice(0, 3).map((c, i) => (
                  <li key={c.slug} className="flex items-center justify-between text-sm">
                    <span className="text-paper-muted">
                      {i + 1}. {c.name}
                    </span>
                    <span className="data-num text-paper-faint">{formatHeat(c.fearScore)}</span>
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
