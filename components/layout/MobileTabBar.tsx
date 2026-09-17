"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Flame, Search, CircleUserRound, Plus } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export function MobileTabBar() {
  const pathname = usePathname();
  const { isLoggedIn, handle } = useAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const tabs = [
    { href: isLoggedIn ? "/feed" : "/", label: "Feed", icon: Rss },
    { href: "/flashpoints", label: "Flashpoints", icon: Flame },
  ];
  const tabsRight = [
    { href: "/aftermath", label: "Aftermath", icon: Search },
    { href: isLoggedIn ? "/me" : `/@${handle}`, label: "Profile", icon: CircleUserRound },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-void-line bg-void/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      {tabs.map((t) => (
        <TabLink key={t.href} {...t} active={isActive(t.href)} />
      ))}

      <Link
        href="/post"
        aria-label="Start a Blowup"
        className="flex flex-1 items-center justify-center py-2"
      >
        <span className="flex h-11 w-11 -translate-y-3 items-center justify-center rounded-full border border-void bg-hazard text-void shadow-lg">
          <Plus size={22} strokeWidth={2} />
        </span>
      </Link>

      {tabsRight.map((t) => (
        <TabLink key={t.href} {...t} active={isActive(t.href)} />
      ))}
    </nav>
  );
}

function TabLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Rss;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] ${
        active ? "text-hazard" : "text-paper-muted"
      }`}
    >
      <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
      <span className="label tracking-label">{label}</span>
    </Link>
  );
}
