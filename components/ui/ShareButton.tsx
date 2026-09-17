"use client";

import { Share2 } from "lucide-react";
import { useToast } from "./Toast";

export function ShareButton({ path, size = "md" }: { path: string; size?: "sm" | "md" }) {
  const { show } = useToast();

  async function handleShare() {
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // clipboard may be unavailable; the toast still confirms intent below
    }
    show("Link copied.");
  }

  const pad = size === "sm" ? "px-3 py-2 text-[10px]" : "px-4 py-2.5 text-xs";

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`label laser-hover inline-flex items-center gap-2 border border-void-line text-paper-muted tracking-label hover:border-hazard hover:text-hazard ${pad}`}
    >
      <Share2 size={14} strokeWidth={1.6} />
      Share
    </button>
  );
}
