import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlowup, getCompany, getFlashpoint, getCommentsForBlowup, blowups } from "@/lib/data";
import { formatRelativeTime } from "@/lib/format";
import { MediaPlayer } from "@/components/blowup/MediaPlayer";
import { ReceiptsFilmstrip } from "@/components/blowup/ReceiptsFilmstrip";
import { BlowupHeatPanel } from "@/components/blowup/BlowupHeatPanel";
import { CommentThread } from "@/components/blowup/CommentThread";
import { ShareButton } from "@/components/ui/ShareButton";
import { Avatar } from "@/components/ui/Avatar";

export function generateStaticParams() {
  return blowups.map((b) => ({ company: b.companySlug, id: b.id }));
}

export function generateMetadata({ params }: { params: { company: string; id: string } }): Metadata {
  const blowup = getBlowup(params.id);
  return { title: blowup ? blowup.title : "Blowup" };
}

export default function BlowupPage({ params }: { params: { company: string; id: string } }) {
  const blowup = getBlowup(params.id);
  if (!blowup || blowup.companySlug !== params.company) notFound();
  const company = getCompany(blowup.companySlug);
  if (!company) notFound();

  const comments = getCommentsForBlowup(blowup.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <div className="mb-6 flex items-center gap-3">
        <Avatar handle={blowup.authorHandle} size={32} />
        <div>
          <Link href={`/@${blowup.authorHandle}`} className="text-sm font-semibold text-paper hover:text-hazard">
            @{blowup.authorHandle}
          </Link>
          <p className="text-xs text-paper-faint">
            {formatRelativeTime(blowup.createdAt)} &middot;{" "}
            <Link href={`/company/${company.slug}`} className="hover:text-hazard">
              {company.name}
            </Link>
          </p>
        </div>
      </div>

      <h1 className="font-display mb-6 text-3xl leading-tight tracking-wide text-paper md:text-4xl">{blowup.title}</h1>

      <MediaPlayer blowup={blowup} />

      {blowup.body && blowup.formats[0] !== "quick-take" && (
        <p className="mt-6 text-base leading-relaxed text-paper-muted">{blowup.body}</p>
      )}

      {blowup.flashpointSlugs.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {blowup.flashpointSlugs.map((slug) => {
            const fp = getFlashpoint(slug);
            if (!fp) return null;
            return (
              <Link
                key={slug}
                href={`/flashpoints/${slug}`}
                className="label border border-blowtorch/50 px-2.5 py-1 text-[10px] text-blowtorch tracking-label hover:bg-blowtorch hover:text-void"
              >
                {fp.name}
              </Link>
            );
          })}
        </div>
      )}

      {blowup.receipts.length > 0 && (
        <div className="mt-8">
          <ReceiptsFilmstrip receipts={blowup.receipts} />
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-y border-void-line py-8">
        <BlowupHeatPanel blowupId={blowup.id} initialHeat={blowup.heat} isNuclearRecord={blowup.isNuclearRecord} />
        <ShareButton path={`/company/${company.slug}/blowup/${blowup.id}`} />
      </div>

      <section className="mt-10">
        <h2 className="font-display mb-6 text-2xl tracking-wide text-paper">
          Comments <span className="text-paper-faint">({comments.length})</span>
        </h2>
        <CommentThread comments={comments} emptyMessage="Nobody's said anything yet. Be the spark." />
      </section>
    </div>
  );
}
