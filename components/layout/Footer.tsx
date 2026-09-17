import Link from "next/link";
import { Share2, MessageCircle, Rss, Mail } from "lucide-react";
import { BlastMark } from "@/components/icons";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { href: "/burn-list", label: "Burn List" },
      { href: "/flashpoints", label: "Flashpoints" },
      { href: "/halls-of-flame", label: "Halls of Flame" },
      { href: "/aftermath", label: "Aftermath" },
      { href: "/the-drop", label: "The Drop" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/instigators", label: "Top Instigators" },
      { href: "/squads", label: "Squads" },
      { href: "/blowup-of-the-year", label: "Blowup of the Year" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About / Manifesto" },
      { href: "/press", label: "Press Kit" },
      { href: "/help", label: "Help / FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/posting-policy", label: "Posting Policy" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/requests", label: "Legal Removal Requests" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-void-line bg-void">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label mb-4 text-[10px] text-paper-faint">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-paper-muted hover:text-hazard">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-void-line pt-8">
          <div className="flex items-center gap-4">
            <BlastMark size={22} intensity={0.08} seed="footer" showGuide={false} className="opacity-70" />
            <span className="label text-[10px] text-paper-faint">
              &copy; {new Date().getFullYear()} BLOWUP. Turn Frustration Into Fear.
            </span>
          </div>
          <div className="flex items-center gap-4 text-paper-faint" aria-hidden="true">
            <Share2 size={16} strokeWidth={1.5} />
            <MessageCircle size={16} strokeWidth={1.5} />
            <Rss size={16} strokeWidth={1.5} />
            <Mail size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </footer>
  );
}
