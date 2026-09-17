import type { IconProps } from "./types";

/**
 * The Grenade Stopwatch — a stenciled stopwatch face in the exact silhouette
 * of a grenade. Powers The Drop's countdown and the Heat Ladder progress marker.
 */
export function GrenadeStopwatch({ size = 48, className, strokeWidth = 1.6, title }: IconProps) {
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
      {/* pull-pin ring */}
      <circle cx="68" cy="12" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* fuse / crown lever */}
      <path
        d="M40 8 H58 V19 H40 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path d="M61 13 L63 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* body / face */}
      <circle cx="50" cy="58" r="35" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="50" cy="58" r="28.5" stroke="currentColor" strokeWidth={strokeWidth * 0.6} opacity={0.55} />
      {/* grenade body texture — crosshatch, kept sparse and precise */}
      <path
        d="M22 58 H78 M50 30 V86 M29.5 37.5 L70.5 78.5 M70.5 37.5 L29.5 78.5"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.45}
        opacity={0.3}
      />
      {/* tick marks at 12/3/6/9 */}
      <path
        d="M50 26 V32 M50 84 V90 M18 58 H24 M76 58 H82"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* hands — ticking down */}
      <path d="M50 58 L50 38" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M50 58 L66 66" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="50" cy="58" r="2.6" fill="currentColor" />
    </svg>
  );
}
