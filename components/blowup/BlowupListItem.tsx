import Link from "next/link";
import { Video, Camera, Mic, Type, MessageSquare } from "lucide-react";
import { TierBadge } from "./TierBadge";
import { getCompany } from "@/lib/data";
import { formatHeat, formatRelativeTime } from "@/lib/format";
import type { Blowup } from "@/lib/types";

const FORMAT_ICON = {
  video: Video,
  receipts: Camera,
  voice: Mic,
  "quick-take": Type,
};

export function BlowupListItem({ blowup, showCompany = true }: { blowup: Blowup; showCompany?: boolean }) {
  const company = getCompany(blowup.companySlug);
  return (
    <Link
      href={`/company/${blowup.companySlug}/blowup/${blowup.id}`}
      className="laser-hover flex flex-col gap-3 border-b border-void-line px-1 py-5 hover:bg-void-surface sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          {showCompany && company && (
            <span className="label text-[10px] text-paper-faint">{company.name}</span>
          )}
          <span className="flex items-center gap-1.5 text-paper-faint">
            {blowup.formats.map((f) => {
              const Icon = FORMAT_ICON[f];
              return <Icon key={f} size={12} strokeWidth={1.6} aria-hidden="true" />;
            })}
          </span>
          <span className="label text-[10px] text-paper-faint">{formatRelativeTime(blowup.createdAt)}</span>
        </div>
        <p className="truncate text-base text-paper">{blowup.title}</p>
        <div className="mt-1.5 flex items-center gap-1.5 text-paper-faint">
          <MessageSquare size={12} strokeWidth={1.6} aria-hidden="true" />
          <span className="text-xs">{blowup.commentCount}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
        <TierBadge tier={blowup.tier} size="sm" />
        <span className="data-num text-lg text-paper">{formatHeat(blowup.heat)}</span>
      </div>
    </Link>
  );
}
