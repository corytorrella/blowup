import { Flame } from "lucide-react";

export function RageStreak({ days, size = "md" }: { days: number; size?: "sm" | "md" }) {
  const iconSize = size === "sm" ? 14 : 18;
  return (
    <span className="inline-flex items-center gap-1.5 text-riot" title={`${days}-day Rage Streak`}>
      <Flame size={iconSize} strokeWidth={1.6} aria-hidden="true" />
      <span className={`data-num ${size === "sm" ? "text-sm" : "text-base"}`}>{days}</span>
      <span className="sr-only">day rage streak</span>
    </span>
  );
}
