import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-void-line pb-8">
      <div>
        {eyebrow && <p className="label mb-2 text-[10px] text-paper-faint">{eyebrow}</p>}
        <h1 className="font-display text-4xl tracking-wide text-paper md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-xl text-sm text-paper-muted md:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}
