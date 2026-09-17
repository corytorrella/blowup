import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getCompany, categoryHalls } from "@/lib/data";
import { CategoryIcon } from "@/components/company/CategoryIcon";
import { LeaderboardRow } from "@/components/company/LeaderboardRow";

export function generateStaticParams() {
  return categoryHalls.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategory(params.category);
  return { title: cat ? cat.name : "Hall of Shame" };
}

export default function CategoryHallPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const companiesInCategory = category.companySlugs
    .map((slug) => getCompany(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .sort((a, b) => b.fearScore - a.fearScore);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <div className="mb-10 flex items-center gap-4 border-b border-void-line pb-8">
        <CategoryIcon slug={category.slug} size={32} className="text-hazard" />
        <div>
          <p className="label text-[10px] text-paper-faint">Hall of Shame</p>
          <h1 className="font-display text-4xl tracking-wide text-paper md:text-5xl">{category.name}</h1>
          <p className="mt-2 text-sm text-paper-muted md:text-base">{category.description}</p>
        </div>
      </div>
      <div className="border-t border-void-line">
        {companiesInCategory.map((c) => (
          <LeaderboardRow key={c.slug} company={c} />
        ))}
      </div>
    </div>
  );
}
