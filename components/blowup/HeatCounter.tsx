"use client";

import { useEffect, useRef, useState } from "react";
import { formatHeat } from "@/lib/format";

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_CLASS: Record<Size, string> = {
  sm: "text-lg md:text-xl",
  md: "text-2xl md:text-3xl",
  lg: "text-4xl md:text-6xl",
  xl: "text-6xl md:text-8xl",
};

export function HeatCounter({
  value,
  size = "md",
  simulateLive = false,
  className = "",
  label = "Heat",
}: {
  value: number;
  size?: Size;
  simulateLive?: boolean;
  className?: string;
  label?: string;
}) {
  const [display, setDisplay] = useState(value);
  const prevChars = useRef<string[]>(formatHeat(value).split(""));
  const chars = formatHeat(display).split("");
  const changed = chars.map((c, i) => c !== prevChars.current[i]);

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  useEffect(() => {
    prevChars.current = chars;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  useEffect(() => {
    if (!simulateLive) return;
    let cancelled = false;
    function tick() {
      if (cancelled) return;
      setDisplay((d) => d + Math.max(1, Math.round(d * 0.00004 + Math.random() * 2)));
      setTimeout(tick, 2400 + Math.random() * 2600);
    }
    const t = setTimeout(tick, 2400 + Math.random() * 2600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [simulateLive]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span aria-hidden="true" className={`data-num flex font-bold ${SIZE_CLASS[size]}`}>
        {chars.map((c, i) => (
          <span key={i} className={`flip-digit ${changed[i] ? "is-flipping" : ""}`}>
            <span className="flip-digit__inner">{c}</span>
          </span>
        ))}
      </span>
      <span className="sr-only-live" aria-live="polite">
        {label}: {formatHeat(display)}
      </span>
    </span>
  );
}
