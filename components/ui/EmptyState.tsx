import type { ReactNode } from "react";

export function EmptyState({
  icon,
  message,
  sub,
}: {
  icon?: ReactNode;
  message: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 border border-dashed border-void-line px-6 py-16 text-center">
      {icon && <div className="text-paper-faint">{icon}</div>}
      <p className="font-display text-xl tracking-wide text-paper md:text-2xl">{message}</p>
      {sub && <p className="max-w-sm text-sm text-paper-muted">{sub}</p>}
    </div>
  );
}
