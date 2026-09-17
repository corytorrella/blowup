"use client";

import { useState } from "react";

export function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((o) => !o)}
      className={`relative h-6 w-11 shrink-0 border transition-colors ${on ? "border-hazard bg-hazard/20" : "border-void-line bg-void-surface"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 transition-transform ${on ? "translate-x-5 bg-hazard" : "translate-x-0.5 bg-paper-faint"}`}
      />
    </button>
  );
}
