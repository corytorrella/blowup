import type { IconProps } from "./types";

/**
 * The Bow-Tied Molotov — a slim bottle wrapped in one satin ribbon,
 * unmistakably a cocktail bomb in outline. The Boycott Pledge icon.
 */
export function BowTiedMolotov({ size = 48, className, strokeWidth = 1.6, title, accent = false }: IconProps & { accent?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* wick */}
      <path d="M50 6 L46 16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* neck */}
      <path d="M44 16 H56 V34 H44 Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      {/* bottle body */}
      <path
        d="M44 34 C 30 42, 26 52, 26 66 C 26 82, 36 92, 50 92 C 64 92, 74 82, 74 66 C 74 52, 70 42, 56 34 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* liquid line */}
      <path d="M30 64 H70" stroke="currentColor" strokeWidth={strokeWidth * 0.6} opacity={0.45} />
      {/* satin bow at the neck */}
      <path
        d="M44 24 L30 16 L30 32 Z M56 24 L70 16 L70 32 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill={accent ? "currentColor" : "none"}
      />
      <circle cx="50" cy="24" r="4.5" stroke="currentColor" strokeWidth={strokeWidth} fill={accent ? "currentColor" : "none"} />
      {/* ribbon tails */}
      <path d="M46 27 L38 46 M54 27 L62 46" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    </svg>
  );
}
