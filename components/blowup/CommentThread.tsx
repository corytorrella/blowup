import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatRelativeTime } from "@/lib/format";
import type { BlowupComment } from "@/lib/types";

export function CommentThread({ comments, emptyMessage = "No comments yet." }: { comments: BlowupComment[]; emptyMessage?: string }) {
  if (comments.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <ul className="space-y-5">
      {comments.map((c) => (
        <li key={c.id} className="flex gap-3">
          <Avatar handle={c.authorHandle} size={32} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm font-semibold ${c.isCompany ? "text-blowtorch" : "text-paper"}`}>
                {c.isCompany ? c.authorHandle : `@${c.authorHandle}`}
              </span>
              {c.isCompany && (
                <span className="label border border-blowtorch/50 px-1.5 py-0.5 text-[9px] text-blowtorch">
                  Company Account
                </span>
              )}
              <span className="text-xs text-paper-faint">{formatRelativeTime(c.createdAt)}</span>
            </div>
            <p className="mt-1 text-sm text-paper-muted">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
