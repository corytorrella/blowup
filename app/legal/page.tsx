import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Legal" };

const LINKS = [
  { href: "/legal/terms", label: "Terms of Service", description: "The agreement covering use of the platform." },
  { href: "/legal/posting-policy", label: "Posting Policy", description: "What's eligible, what stays up, and why." },
  { href: "/legal/privacy", label: "Privacy Policy", description: "What we collect and how it's handled." },
  { href: "/legal/requests", label: "Legal Removal Requests", description: "The narrow process for unlawful content." },
];

export default function LegalHubPage() {
  return (
    <div className="font-body mx-auto max-w-2xl px-6 py-24">
      <p className="mb-3 text-xs text-paper-faint">Legal</p>
      <h1 className="text-3xl font-semibold text-paper">Legal</h1>
      <ul className="mt-10 divide-y divide-void-line border-y border-void-line">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block py-5 hover:opacity-80">
              <span className="text-base text-paper">{l.label}</span>
              <span className="mt-1 block text-sm text-paper-faint">{l.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
