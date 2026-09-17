"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";

const NAV_LINKS = [
  { href: "/most-ratiod", label: "Most Ratio'd" },
  { href: "/flashpoints", label: "Flashpoints" },
  { href: "/halls-of-flame", label: "Halls of Flame" },
  { href: "/aftermath", label: "Aftermath" },
];

export function Header() {
  const { isLoggedIn, handle, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-void-line bg-void/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 md:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label laser-hover px-1 py-1 text-xs text-paper-muted tracking-label hover:text-hazard"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              href="/feed"
              className="label laser-hover px-1 py-1 text-xs text-paper-muted tracking-label hover:text-hazard"
            >
              Blast Radius
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/aftermath" aria-label="Search" className="text-paper-muted hover:text-hazard">
            <Search size={18} strokeWidth={1.6} />
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/settings" aria-label="Notifications" className="hidden text-paper-muted hover:text-hazard sm:block">
                <Bell size={18} strokeWidth={1.6} />
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  aria-label={`Account menu for @${handle}`}
                  className="flex items-center gap-1.5 text-paper hover:text-hazard"
                >
                  <Avatar handle={handle} size={30} />
                  <ChevronDown size={14} strokeWidth={1.8} className="hidden sm:block" />
                </button>
                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-52 border border-void-line bg-void-surface py-2 shadow-xl"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <Link href="/me" role="menuitem" className="block px-4 py-2.5 text-sm text-paper hover:bg-void-raised hover:text-hazard" onClick={() => setMenuOpen(false)}>
                      My Instigator Profile
                    </Link>
                    <Link href="/squads" role="menuitem" className="block px-4 py-2.5 text-sm text-paper hover:bg-void-raised hover:text-hazard" onClick={() => setMenuOpen(false)}>
                      My Squad
                    </Link>
                    <Link href="/settings" role="menuitem" className="block px-4 py-2.5 text-sm text-paper hover:bg-void-raised hover:text-hazard" onClick={() => setMenuOpen(false)}>
                      Settings
                    </Link>
                    <Link href="/help" role="menuitem" className="block px-4 py-2.5 text-sm text-paper hover:bg-void-raised hover:text-hazard" onClick={() => setMenuOpen(false)}>
                      Help
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        logOut();
                        setMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2.5 text-left text-sm text-paper-muted hover:bg-void-raised hover:text-blowtorch"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <LogInButton />
          )}

          <ButtonLink href="/post" size="sm">
            Start a Blowup
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function LogInButton() {
  const { logIn } = useAuth();
  return (
    <button type="button" onClick={logIn} className="label text-xs text-paper-muted tracking-label hover:text-hazard">
      Log In
    </button>
  );
}
