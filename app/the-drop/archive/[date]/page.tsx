import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DropSnapshot } from "@/components/drop/DropSnapshot";
import { drops } from "@/lib/data";
import { formatDateLong, dropDateSlug } from "@/lib/format";

export function generateStaticParams() {
  return drops.map((d) => ({ date: dropDateSlug(d.date) }));
}

export function generateMetadata({ params }: { params: { date: string } }): Metadata {
  const drop = drops.find((d) => dropDateSlug(d.date) === params.date);
  return { title: drop ? `The Drop — ${formatDateLong(drop.date)}` : "The Drop Archive" };
}

export default function DropArchivePage({ params }: { params: { date: string } }) {
  const drop = drops.find((d) => dropDateSlug(d.date) === params.date);
  if (!drop) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <Link href="/the-drop" className="label text-[10px] text-paper-faint hover:text-hazard">
        &larr; The Drop
      </Link>
      <h1 className="font-display mb-10 mt-3 text-4xl tracking-wide text-paper md:text-5xl">{formatDateLong(drop.date)}</h1>
      <DropSnapshot drop={drop} />
    </div>
  );
}
