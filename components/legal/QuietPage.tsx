import Link from "next/link";
import type { ReactNode } from "react";

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/posting-policy", label: "Posting Policy" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/requests", label: "Legal Removal Requests" },
];

export function QuietPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="font-body mx-auto max-w-2xl px-6 py-24">
      <p className="mb-3 text-xs text-paper-faint">Legal</p>
      <h1 className="text-3xl font-semibold text-paper">{title}</h1>
      {updated && <p className="mt-2 text-sm text-paper-faint">Last updated {updated}</p>}
      <div className="prose-legal mt-10 space-y-5 text-[15px] leading-relaxed text-paper-muted">{children}</div>

      <nav className="mt-20 border-t border-void-line pt-8">
        <p className="mb-3 text-xs text-paper-faint">Also in Legal</p>
        <ul className="space-y-2">
          {LEGAL_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-paper-muted underline decoration-void-line hover:text-paper">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-lg font-semibold text-paper">{children}</h2>;
}
