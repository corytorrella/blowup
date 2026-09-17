"use client";

import { useEffect, useState } from "react";

function split(msLeft: number) {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

export function Countdown({ target, className = "" }: { target: number; className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = split(target - (now ?? target));
  const label = now === null ? "--:--:--:--" : `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return (
    <div className={`data-num flex items-baseline gap-2 text-paper ${className}`} aria-live="off">
      <Unit value={days} name="d" />
      <span className="text-paper-faint">:</span>
      <Unit value={hours} name="h" />
      <span className="text-paper-faint">:</span>
      <Unit value={minutes} name="m" />
      <span className="text-paper-faint">:</span>
      <Unit value={seconds} name="s" />
      <span className="sr-only">Next Drop in {label}</span>
    </div>
  );
}

function Unit({ value, name }: { value: number; name: string }) {
  return (
    <span aria-hidden="true" className="flex items-baseline gap-1">
      <span className="text-2xl md:text-4xl">{String(value).padStart(2, "0")}</span>
      <span className="text-xs text-paper-faint">{name}</span>
    </span>
  );
}
