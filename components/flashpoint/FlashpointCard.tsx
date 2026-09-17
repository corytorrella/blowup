import Link from "next/link";
import { Receipt, Ban, Clock, Bot, TrendingUp, RefreshCw, Flame } from "lucide-react";
import { formatHeat } from "@/lib/format";
import { getCompany } from "@/lib/data";
import type { Flashpoint } from "@/lib/types";

const FLASHPOINT_ICON: Record<string, typeof Receipt> = {
  "junk-fees": Receipt,
  "hidden-cancellation-fees": Ban,
  "wait-times": Clock,
  "chatbot-loop": Bot,
  "rate-hikes": TrendingUp,
  "refund-runaround": RefreshCw,
};

export function FlashpointCard({ flashpoint }: { flashpoint: Flashpoint }) {
  const Icon = FLASHPOINT_ICON[flashpoint.slug] ?? Flame;
  const worst = flashpoint.companies[0];
  const worstCompany = worst ? getCompany(worst.companySlug) : undefined;

  return (
    <Link
      href={`/flashpoints/${flashpoint.slug}`}
      className="laser-hover group flex flex-col gap-4 border border-blowtorch/40 bg-void-surface p-5 transition-colors hover:border-blowtorch"
    >
      <Icon size={22} strokeWidth={1.5} className="text-blowtorch" aria-hidden="true" />
      <div>
        <h3 className="font-display text-xl tracking-wide text-paper group-hover:text-blowtorch">
          {flashpoint.name}
        </h3>
        <p className="mt-1 text-sm text-paper-muted">{flashpoint.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-void-line pt-3">
        <div>
          <p className="label text-[10px] text-paper-faint">Worst offender</p>
          <p className="text-sm text-paper">{worstCompany?.name ?? "—"}</p>
        </div>
        <p className="data-num text-lg text-blowtorch">{formatHeat(flashpoint.totalHeat)}</p>
      </div>
    </Link>
  );
}
