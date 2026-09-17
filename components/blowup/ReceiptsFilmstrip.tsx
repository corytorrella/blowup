import { FileImage, FileText } from "lucide-react";
import type { Receipt } from "@/lib/types";

export function ReceiptsFilmstrip({ receipts }: { receipts: Receipt[] }) {
  if (receipts.length === 0) return null;
  return (
    <div>
      <p className="label mb-2 text-[10px] text-paper-faint">Receipts</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {receipts.map((r, i) => (
          <div
            key={i}
            className="flex h-24 w-32 shrink-0 flex-col items-center justify-center gap-2 border border-void-line bg-void-surface px-2"
          >
            {r.kind === "doc" ? (
              <FileText size={20} strokeWidth={1.4} className="text-paper-faint" aria-hidden="true" />
            ) : (
              <FileImage size={20} strokeWidth={1.4} className="text-paper-faint" aria-hidden="true" />
            )}
            <span className="data-num text-center text-[9px] leading-tight text-paper-muted break-all">
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
