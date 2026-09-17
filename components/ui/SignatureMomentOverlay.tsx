"use client";

import { useEffect } from "react";
import { HazardFlower, BlastMark, GrenadeStopwatch, BowTiedMolotov } from "@/components/icons";

type Motif = "flower" | "blast" | "stopwatch" | "molotov";

const MOTIF: Record<Motif, (props: { size: number; className: string }) => JSX.Element> = {
  flower: (p) => <HazardFlower {...p} accent />,
  blast: (p) => <BlastMark size={p.size} intensity={1} seed="takeover" className={p.className} showGuide={false} />,
  stopwatch: (p) => <GrenadeStopwatch {...p} />,
  molotov: (p) => <BowTiedMolotov {...p} accent />,
};

export function SignatureMomentOverlay({
  open,
  onClose,
  motif,
  headline,
  sub,
  autoCloseMs = 2600,
}: {
  open: boolean;
  onClose: () => void;
  motif: Motif;
  headline: string;
  sub?: string;
  autoCloseMs?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, autoCloseMs);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, autoCloseMs]);

  if (!open) return null;
  const Motif = MOTIF[motif];

  return (
    <div
      role="alertdialog"
      aria-label={headline}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex animate-stencil-flash cursor-pointer flex-col items-center justify-center gap-6 bg-void/95 px-6 text-center"
    >
      <Motif size={120} className="text-blowtorch" />
      <h2 className="font-stencil text-4xl uppercase tracking-wide text-paper md:text-6xl">{headline}</h2>
      {sub && <p className="label max-w-md text-xs text-paper-muted md:text-sm">{sub}</p>}
      <p className="label text-[10px] text-paper-faint">Tap anywhere to dismiss</p>
    </div>
  );
}
