"use client";

import { useState } from "react";
import { Play, Pause, CaptionsIcon } from "lucide-react";
import { seededRandom, range } from "@/lib/rng";
import { formatDuration } from "@/lib/format";
import type { Blowup } from "@/lib/types";

function Waveform({ seed, bars = 48 }: { seed: string; bars?: number }) {
  const rand = seededRandom(seed);
  const heights = Array.from({ length: bars }, () => range(rand, 15, 100));
  return (
    <div className="flex h-16 flex-1 items-center gap-[3px]">
      {heights.map((h, i) => (
        <span key={i} className="w-full rounded-full bg-paper-muted" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function MediaPlayer({ blowup }: { blowup: Blowup }) {
  const [playing, setPlaying] = useState(false);
  const primaryFormat = blowup.formats.find((f) => f !== "receipts") ?? "quick-take";

  if (primaryFormat === "video") {
    return (
      <div className="mx-auto flex aspect-[9/16] w-full max-w-[280px] flex-col justify-between border border-void-line bg-void-surface p-4">
        <div className="flex items-center justify-between">
          <span className="label border border-void-line px-2 py-1 text-[9px] text-paper-faint">Video Rant</span>
          <span className="flex items-center gap-1 text-paper-faint" title="Auto-captioned">
            <CaptionsIcon size={14} strokeWidth={1.6} />
          </span>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-16 w-16 items-center justify-center self-center rounded-full border border-hazard text-hazard transition-transform hover:scale-105"
          aria-pressed={playing}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={26} strokeWidth={1.6} /> : <Play size={26} strokeWidth={1.6} className="translate-x-0.5" />}
        </button>
        <div>
          <div className="h-0.5 w-full bg-void-line">
            <div className={`h-0.5 bg-hazard ${playing ? "w-full transition-all duration-[8000ms] ease-linear" : "w-0"}`} />
          </div>
          <p className="data-num mt-2 text-xs text-paper-faint">{formatDuration(blowup.durationSeconds)}</p>
        </div>
      </div>
    );
  }

  if (primaryFormat === "voice") {
    return (
      <div className="flex items-center gap-4 border border-void-line bg-void-surface p-5">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hazard text-hazard"
          aria-pressed={playing}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={18} strokeWidth={1.6} /> : <Play size={18} strokeWidth={1.6} className="translate-x-0.5" />}
        </button>
        <Waveform seed={blowup.id} />
        <span className="data-num shrink-0 text-xs text-paper-faint">{formatDuration(blowup.durationSeconds)}</span>
      </div>
    );
  }

  return (
    <div className="border border-void-line bg-void-surface px-8 py-10">
      <p className="font-display text-3xl leading-snug tracking-wide text-paper md:text-4xl">&ldquo;{blowup.body}&rdquo;</p>
      <p className="label mt-4 text-[10px] text-paper-faint">Quick Take</p>
    </div>
  );
}
